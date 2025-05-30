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
    if (diff > 0) {
      // Swipe left → próxima página
      if (typeof currentPageIndex !== 'undefined' && typeof updatePage === 'function' && currentPageIndex < pages.length - 1) {
        currentPageIndex++;
        updatePage();
      }
    } else {
      // Swipe right → página anterior
      if (typeof currentPageIndex !== 'undefined' && typeof updatePage === 'function' && currentPageIndex > 0) {
        currentPageIndex--;
        updatePage();
      }
    }
  }
}
