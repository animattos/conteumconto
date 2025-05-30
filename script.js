// Array defining the pages. Each object has an image path and an audio asset name.
const pages = [
    { image: 'capa.png', audio: '' },
    { image: 'a.png', audio: '01.mp3' },
    { image: 'b.png', audio: '02.mp3' },
    { image: 'c.png', audio: '03.mp3' },
    { image: 'd.png', audio: '00.mp3' },
];

const watermarkImageUrl = 'marca.png';
const backgroundMusicUrl = '04.mp3'; // URL for the background music

let currentPageIndex = 0;
let audioContext = null;

// Audio state variables for PAGE audio
let audioBuffer = null;
let currentSource = null;
let audioState = 'stopped'; // 'stopped', 'playing', 'paused' - Note: Page audio doesn't explicitly support pause/resume from UI yet, but state is useful.
let playbackTime = 0;
let startTime = 0;
let audioStartTimeoutId = null; // Variable to store the timeout ID for delayed audio start

// Audio state variables for BACKGROUND music
let bgMusicBuffer = null;
let bgMusicSource = null;
let bgMusicState = 'stopped'; // 'stopped', 'playing', 'paused'
let bgMusicPlaybackTime = 0;
let bgMusicStartTime = 0;

let currentDownloadBlobUrl = null;

const pageImage = document.getElementById('pageImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const downloadBtn = document.getElementById('downloadBtn');
const downloadLink = document.getElementById('downloadLink');
const audioBtn = document.getElementById('audioBtn');
const musicBtn = document.getElementById('musicBtn'); // Get music button element
const pauseIcon = document.getElementById('pauseIcon');
const playIcon = document.getElementById('playIcon');

// Function to initialize or resume AudioContext on first user interaction
const initializeAudioContext = async () => {
    if (!audioContext) {
        console.log("Creating AudioContext on user interaction.");
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log("AudioContext created.");
        } catch (e) {
            console.error("Failed to create AudioContext:", e);
            audioBtn.disabled = true;
            return;
        }
    }
    if (audioContext.state === 'suspended') {
        console.log("Attempting to resume AudioContext on user interaction...");
        try {
            await audioContext.resume();
            console.log("AudioContext resumed on user interaction.");
        } catch (e) {
            console.error("Failed to resume AudioContext on user interaction:", e);
            if (audioContext.state !== 'running') {
                audioBtn.disabled = true;
            }
        }
    }
    if (audioContext && audioContext.state === 'running') {
        document.removeEventListener('click', initializeAudioContext);
        document.removeEventListener('touchstart', initializeAudioContext);
    }
};

document.addEventListener('click', initializeAudioContext, { once: true, capture: true });
document.addEventListener('touchstart', initializeAudioContext, { once: true, capture: true, passive: true });

function updateAudioButtonIcon() {
    if (audioState === 'playing') {
        audioBtn.classList.add('playing');
        audioBtn.classList.remove('stopped');
    } else {
        audioBtn.classList.add('stopped');
        audioBtn.classList.remove('playing');
    }
}

function updateBackgroundMusicButtonIcon() {
    if (bgMusicState === 'playing') {
        musicBtn.classList.add('playing');
        musicBtn.classList.remove('stopped');
    } else {
        musicBtn.classList.add('stopped');
        musicBtn.classList.remove('playing');
    }
}

function stopAudioSource() {
    if (currentSource) {
        try {
            if (audioContext && audioContext.state === 'running' && startTime > 0) {
                const elapsedSinceStart = audioContext.currentTime - startTime;
                if (audioState === 'playing') {
                    playbackTime += elapsedSinceStart;
                    console.log(`Page audio segment played for ${elapsedSinceStart.toFixed(2)}s. New total playbackTime: ${playbackTime.toFixed(1)}s`);
                }
            } else {
                playbackTime = 0;
                console.log("Stopping page audio, context not running or start time invalid, resetting playback time.");
            }
            currentSource.stop();
            currentSource.disconnect();
            console.log("Page audio source stopped.");
        } catch (e) {
            console.warn("Error stopping previous page audio source:", e);
            playbackTime = 0;
        } finally {
            currentSource = null;
            startTime = 0;
        }
    } else {
        playbackTime = 0;
        startTime = 0;
    }
}

function stopBackgroundMusicSource() {
    if (bgMusicSource) {
        try {
            if (audioContext && audioContext.state === 'running' && bgMusicStartTime > 0) {
                const elapsedSinceStart = audioContext.currentTime - bgMusicStartTime;
                if (bgMusicState === 'playing') {
                    bgMusicPlaybackTime += elapsedSinceStart;
                    console.log(`BG music segment played for ${elapsedSinceStart.toFixed(2)}s. New total bgMusicPlaybackTime: ${bgMusicPlaybackTime.toFixed(1)}s`);
                }
            } else {
                console.log("Stopping BG music, context not running or start time invalid.");
            }
            bgMusicSource.stop();
            bgMusicSource.disconnect();
            console.log("BG music source stopped.");
        } catch (e) {
            console.warn("Error stopping previous BG music source:", e);
        } finally {
            bgMusicSource = null;
            bgMusicStartTime = 0;
        }
    } else {
        bgMusicStartTime = 0;
    }
}

function resetAudioState() {
    stopAudioSource();
    if (audioStartTimeoutId) { 
        clearTimeout(audioStartTimeoutId);
        audioStartTimeoutId = null;
        console.log("Resetting page audio state, cleared pending auto-play timeout.");
    }
    audioBuffer = null;
    audioState = 'stopped';
    playbackTime = 0;
    startTime = 0;
    audioBtn.disabled = true; 
    updateAudioButtonIcon();
    console.log("Page audio state fully reset.");
}

async function fetchAndDecodeAudioForPage(audioUrl) {
    resetAudioState(); 

    if (!audioUrl) {
        console.log("No audio URL for this page.");
        return;
    }

    try {
        await initializeAudioContext(); 
        if (!audioContext || audioContext.state !== 'running') {
            console.error("AudioContext not running after initialization attempt. Cannot fetch page audio.");
            audioBtn.disabled = true;
            return;
        }
    } catch (e) {
        console.error("Failed to initialize AudioContext before fetching page audio:", e);
        audioBtn.disabled = true;
        return;
    }

    try {
        console.log("Fetching page audio:", audioUrl);
        const response = await fetch(audioUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        console.log("Decoding page audio data...");
        audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        console.log("Page audio data decoded successfully.");

        audioBtn.disabled = false;
        audioState = 'stopped';
        playbackTime = 0;
        startTime = 0;
        updateAudioButtonIcon();
    } catch (error) {
        console.error('Error fetching or decoding page audio:', audioUrl, error);
        audioBuffer = null;
        audioBtn.disabled = true;
        audioState = 'stopped';
        updateAudioButtonIcon();
    }
}

async function fetchAndDecodeBackgroundMusic(audioUrl) {
    if (bgMusicBuffer) {
        console.log("Background music already loaded.");
        updateBackgroundMusicButtonIcon();
        return;
    }
    if (!audioUrl) {
        console.log("No URL for background music.");
        musicBtn.disabled = true; 
        return;
    }

    try {
        await initializeAudioContext(); 
        if (!audioContext || audioContext.state !== 'running') {
            console.error("AudioContext not running after initialization attempt. Cannot fetch background music.");
            return;
        }
    } catch (e) {
        console.error("Failed to initialize AudioContext before fetching background music:", e);
        return;
    }

    try {
        console.log("Fetching background music:", audioUrl);
        const response = await fetch(audioUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        console.log("Decoding background music data...");
        bgMusicBuffer = await audioContext.decodeAudioData(arrayBuffer);
        console.log("Background music data decoded successfully.");

        bgMusicState = 'stopped'; 
        bgMusicPlaybackTime = 0;
        bgMusicStartTime = 0;
        updateBackgroundMusicButtonIcon();
    } catch (error) {
        console.error('Error fetching or decoding background music:', audioUrl, error);
        bgMusicBuffer = null;
        musicBtn.disabled = true; 
        bgMusicState = 'stopped';
        updateBackgroundMusicButtonIcon();
    }
}

async function playAudio() {
    if (!audioContext || audioContext.state !== 'running') {
        console.log(`Cannot play page audio. AudioContext state: ${audioContext ? audioContext.state : 'null'}. Attempting resume...`);
        try {
            await initializeAudioContext();
            if (!audioContext || audioContext.state !== 'running') {
                console.error("AudioContext still not running after attempted resume. Cannot play page audio.");
                audioState = 'stopped'; 
                updateAudioButtonIcon();
                audioBtn.disabled = true;
                return;
            }
        } catch (e) {
            console.error("Failed to initialize/resume AudioContext before page audio playback:", e);
            audioState = 'stopped'; 
            updateAudioButtonIcon();
            audioBtn.disabled = true;
            return;
        }
    }
    if (!audioBuffer) {
        console.log("No page audio buffer available to play.");
        audioState = 'stopped';
        updateAudioButtonIcon();
        audioBtn.disabled = true;
        return;
    }

    stopAudioSource(); 

    currentSource = audioContext.createBufferSource();
    currentSource.buffer = audioBuffer;
    currentSource.connect(audioContext.destination);

    const startOffset = playbackTime % audioBuffer.duration;
    console.log(`Starting page audio playback from offset: ${startOffset.toFixed(2)}s`);
    currentSource.start(0, startOffset);

    audioState = 'playing';
    startTime = audioContext.currentTime;
    updateAudioButtonIcon();

    console.log(`Page audio playback started.`);

    currentSource.onended = () => {
        console.log("Page audio playback ended.");
        stopAudioSource();
        audioState = 'stopped';
        playbackTime = 0;
        updateAudioButtonIcon();
    };
}

async function playBackgroundMusic() {
    if (!audioContext || audioContext.state !== 'running') {
        console.log(`Cannot play BG music. AudioContext state: ${audioContext ? audioContext.state : 'null'}. Attempting resume...`);
        try {
            await initializeAudioContext();
            if (!audioContext || audioContext.state !== 'running') {
                console.error("AudioContext still not running after attempted resume. Cannot play BG music.");
                bgMusicState = 'stopped'; 
                updateBackgroundMusicButtonIcon();
                return;
            }
        } catch (e) {
            console.error("Failed to initialize/resume AudioContext before BG music playback:", e);
            bgMusicState = 'stopped'; 
            updateBackgroundMusicButtonIcon();
            return;
        }
    }
    if (!bgMusicBuffer) {
        console.log("No BG music buffer available to play.");
        bgMusicState = 'stopped';
        updateBackgroundMusicButtonIcon();
        return;
    }

    stopBackgroundMusicSource(); 

    bgMusicSource = audioContext.createBufferSource();
    bgMusicSource.buffer = bgMusicBuffer;
    bgMusicSource.loop = true; 
    bgMusicSource.connect(audioContext.destination);

    const startOffset = bgMusicPlaybackTime % bgMusicBuffer.duration;
    console.log(`Starting BG music playback from offset: ${startOffset.toFixed(2)}s`);
    bgMusicSource.start(0, startOffset);

    bgMusicState = 'playing';
    bgMusicStartTime = audioContext.currentTime;
    updateBackgroundMusicButtonIcon();

    console.log(`BG music playback started.`);

    bgMusicSource.onended = () => {
        console.log("BG music playback ended (should loop).");
        if (bgMusicSource && !bgMusicSource.loop) { 
            stopBackgroundMusicSource();
            bgMusicState = 'stopped';
            bgMusicPlaybackTime = 0;
            updateBackgroundMusicButtonIcon();
        }
    };
}

function pauseBackgroundMusic() {
    if (bgMusicState === 'playing') {
        console.log("Pausing background music.");
        stopBackgroundMusicSource(); 
        bgMusicState = 'paused'; 
        updateBackgroundMusicButtonIcon();
    }
}

function toggleBackgroundMusic() {
    if (musicBtn.disabled) {
         console.log("Music button clicked but is disabled.");
         return;
    }
    if (!bgMusicBuffer) {
        console.log("Music button clicked but music buffer is not yet loaded.");
        return;
    }

    console.log(`Music button clicked. Page audio state: ${audioState}, BG music state: ${bgMusicState}`);

    if (audioState === 'playing') {
        if (bgMusicState === 'playing') {
            pauseBackgroundMusic();
        } else {
            console.log("Page audio is playing. Cannot start background music.");
        }
    } else {
        if (bgMusicState === 'playing') {
            pauseBackgroundMusic();
        } else if (bgMusicState === 'paused') {
            console.log("Resuming background music.");
            playBackgroundMusic();
        } else { 
            console.log("Starting background music.");
            playBackgroundMusic();
        }
    }
}

function getRepresentativeColor(canvas) {
    try {
        const ctx = canvas.getContext('2d');
        const x = Math.floor(canvas.width / 2);
        const y = Math.floor(canvas.height / 2);
        const pixelData = ctx.getImageData(x, y, 1, 1).data;

        const r = pixelData[0];
        const g = pixelData[1];
        const b = pixelData[2];

        return `rgb(${r}, ${g}, ${b})`;
    } catch (e) {
        console.warn("Could not get pixel data from canvas for background color:", e);
        return null;
    }
}

function drawImageOnCanvas(mainImg, watermarkImg, includeWatermark = false) {
    if (!mainImg || mainImg.naturalWidth === 0 || mainImg.naturalHeight === 0) {
        console.error("Main image is not loaded or has zero dimensions.");
        return null;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = mainImg.naturalWidth;
    canvas.height = mainImg.naturalHeight;

    ctx.drawImage(mainImg, 0, 0);

    if (includeWatermark && watermarkImg && watermarkImg.naturalWidth > 0 && watermarkImg.naturalHeight > 0) {
        console.log("Drawing watermark onto canvas.");

        const watermarkRatio = 0.15;
        let watermarkWidth = canvas.width * watermarkRatio;
        let watermarkHeight = (watermarkImg.naturalHeight / watermarkImg.naturalWidth) * watermarkWidth;

        const maxWatermarkHeight = canvas.height * 0.2;
        if (watermarkHeight > maxWatermarkHeight) {
            watermarkHeight = maxWatermarkHeight;
            watermarkWidth = (watermarkImg.naturalWidth / watermarkImg.naturalHeight) * watermarkHeight;
        }

        const minDim = Math.min(canvas.width, canvas.height);
        const minWatermarkSize = minDim * 0.08;

        if (watermarkWidth < minWatermarkSize && watermarkHeight < minWatermarkSize) {
            const scaleFactor = minWatermarkSize / Math.min(watermarkWidth, watermarkHeight);
            watermarkWidth *= scaleFactor;
            watermarkHeight *= scaleFactor;

            if (watermarkHeight > maxWatermarkHeight) {
                watermarkHeight = maxWatermarkHeight;
                watermarkWidth = (watermarkImg.naturalWidth / watermarkImg.naturalHeight) * watermarkHeight;
            }
        }

        const padding = Math.min(canvas.width, canvas.height) * 0.02;

        const watermarkX = canvas.width - watermarkWidth - padding;
        const watermarkY = canvas.height - watermarkHeight - padding;

        ctx.drawImage(watermarkImg, watermarkX, watermarkY, watermarkWidth, watermarkHeight);

    } else if (includeWatermark) {
        console.warn("Watermark image was requested but not provided or not loaded properly.");
    }

    return canvas;
}

function updatePage() {
    console.log("Updating page to index:", currentPageIndex);

    if (audioStartTimeoutId) {
        clearTimeout(audioStartTimeoutId);
        audioStartTimeoutId = null;
        console.log("Cleared pending audio start timeout.");
    }

    resetAudioState();

    if (currentPageIndex < 0 || currentPageIndex >= pages.length) {
        console.error("Page index out of bounds:", currentPageIndex);
        return;
    }

    const page = pages[currentPageIndex];
    const mainImageUrl = page.image;
    const audioAssetName = page.audio;

    fetchAndDecodeAudioForPage(audioAssetName);

    pageImage.classList.remove('visible');

    downloadBtn.disabled = true;
    if (currentDownloadBlobUrl) {
        URL.revokeObjectURL(currentDownloadBlobUrl);
        currentDownloadBlobUrl = null;
    }
    downloadLink.href = "#";
    downloadLink.download = "";

    const mainImage = new Image();
    const watermarkImage = new Image();

    const loadImage = (img, src) => {
        return new Promise((resolve, reject) => {
            if (!src) {
                console.warn("loadImage called with empty src:", src);
                resolve(); 
                return;
            }
            img.onload = () => resolve();
            img.onerror = (e) => {
                console.error(`Failed to load image ${src}:`, e);
                resolve(); 
            };
            img.src = src;
        });
    };

    Promise.all([
        loadImage(mainImage, mainImageUrl),
        loadImage(watermarkImage, watermarkImageUrl)
    ])
    .then(() => {
        console.log("Main image loaded. Watermark image load attempted.");

        const displayCanvas = drawImageOnCanvas(mainImage, null, false);
        if (!displayCanvas) {
            console.error("Failed to create canvas for display.");
            pageImage.src = '';
            pageImage.classList.remove('visible');
            downloadBtn.disabled = true;
            document.body.style.backgroundColor = '#ffe0b2';
            resetAudioState(); 
            return;
        }

        const dominantColor = getRepresentativeColor(displayCanvas);
        if (dominantColor) {
            document.body.style.backgroundColor = dominantColor;
            console.log("Setting background color to:", dominantColor);
        } else {
            document.body.style.backgroundColor = '#ffe0b2';
            console.log("Failed to extract color, setting fallback background.");
        }

        const displayDataUrl = displayCanvas.toDataURL();
        if (displayDataUrl && displayDataUrl.length > "data:,".length) {
            pageImage.onload = null;
            pageImage.onerror = null;
            pageImage.src = displayDataUrl;
            console.log("Display canvas data URL set for page image.");

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                     pageImage.classList.add('visible'); 

                     if (audioBuffer && audioContext && audioContext.state !== 'closed') {
                        audioStartTimeoutId = setTimeout(() => {
                            console.log("2-second delay finished, attempting auto-play.");
                            if (audioState === 'stopped') {
                                playAudio();
                            } else {
                                console.log(`Auto-play skipped, page audio state is ${audioState}.`);
                            }
                            audioStartTimeoutId = null; 
                        }, 2000);
                        console.log("Scheduled audio playback in 2 seconds.");
                    } else {
                        console.log("Audio buffer not ready or AudioContext not available for auto-play after image loaded.");
                        audioState = 'stopped';
                        updateAudioButtonIcon();
                        audioBtn.disabled = true; 
                    }
                });
            });


        } else {
            console.error("Failed to create valid data URL from display canvas.");
            pageImage.src = '';
            pageImage.classList.remove('visible');
            downloadBtn.disabled = true;
            document.body.style.backgroundColor = '#ffe0b2';
            resetAudioState(); 
        }
        displayCanvas.remove(); 

        const downloadCanvas = drawImageOnCanvas(mainImage, watermarkImage, true);
        if (!downloadCanvas) {
            console.warn("Failed to create canvas for download.");
            downloadBtn.disabled = true;
        } else {
            downloadCanvas.toBlob((blob) => {
                if (blob) {
                    currentDownloadBlobUrl = URL.createObjectURL(blob);
                    downloadLink.href = currentDownloadBlobUrl;
                    const filename = mainImageUrl.substring(mainImageUrl.lastIndexOf('/') + 1);
                    downloadLink.download = `page_${currentPageIndex + 1}_${filename}`;
                    downloadBtn.disabled = false;
                    console.log("Download Blob created. Button enabled.");
                } else {
                    console.error("Failed to create blob for download.");
                    downloadBtn.disabled = true;
                }
                downloadCanvas.remove(); 
            }, 'image/png');
        }

        prevBtn.disabled = currentPageIndex === 0;
        nextBtn.disabled = currentPageIndex === pages.length - 1;

        if (currentPageIndex === pages.length - 1) {
            nextBtn.classList.remove('green');
            nextBtn.classList.add('orange');
            prevBtn.classList.remove('orange');
            prevBtn.classList.add('green');
        } else if (currentPageIndex === 0) {
            nextBtn.classList.remove('orange');
            nextBtn.classList.add('green');
            prevBtn.classList.remove('green');
            prevBtn.classList.add('orange');
        } else {
            nextBtn.classList.remove('orange');
            nextBtn.classList.add('green');
            prevBtn.classList.remove('green');
            prevBtn.classList.add('orange');
        }
    })
    .catch((error) => {
        console.error("Error during image loading or canvas drawing:", error);
        pageImage.src = '';
        pageImage.classList.remove('visible');
        downloadBtn.disabled = true;
        document.body.style.backgroundColor = '#ffe0b2';
        resetAudioState(); 
    });
}

prevBtn.addEventListener('click', () => {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        updatePage();
    }
});
nextBtn.addEventListener('click', () => {
    if (currentPageIndex < pages.length - 1) {
        currentPageIndex++;
        updatePage();
    }
});

audioBtn.addEventListener('click', () => {
    if (!audioBuffer || audioBtn.disabled) {
        console.log("Audio button clicked but no audio buffer loaded or button is disabled.");
        return;
    }

    if (audioStartTimeoutId) {
        clearTimeout(audioStartTimeoutId);
        audioStartTimeoutId = null;
        console.log("User clicked play/stop, cancelled pending auto-play timeout.");
    }

    if (audioState === 'playing') {
        console.log("Audio button clicked: Stopping audio.");
        stopAudioSource();
        audioState = 'stopped';
        updateAudioButtonIcon();
    } else {
        console.log("Audio button clicked: Attempting to play audio.");
        playAudio();
    }
});

musicBtn.addEventListener('click', toggleBackgroundMusic);

fetchAndDecodeBackgroundMusic(backgroundMusicUrl);

window.addEventListener('load', () => {
    musicBtn.disabled = false;
    updateBackgroundMusicButtonIcon(); 

    updatePage();
});