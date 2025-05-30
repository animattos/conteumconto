let pages = [
  { image: 'a.png', audio: '01.mp3' },
  { image: 'b.png', audio: '02.mp3' },
  { image: 'c.png', audio: '03.mp3' }
];
let currentPageIndex = 0;

const pageImage = document.getElementById('pageImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updatePage() {
  const page = pages[currentPageIndex];
  pageImage.src = page.image;
  pageImage.classList.add('visible');
  prevBtn.disabled = currentPageIndex === 0;
  nextBtn.disabled = currentPageIndex === pages.length - 1;
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

window.addEventListener('load', () => {
  updatePage();
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
}, false);

function handleSwipeGesture() {
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0 && currentPageIndex < pages.length - 1) {
      currentPageIndex++;
      updatePage();
    } else if (diff < 0 && currentPageIndex > 0) {
      currentPageIndex--;
      updatePage();
    }
  }
}
