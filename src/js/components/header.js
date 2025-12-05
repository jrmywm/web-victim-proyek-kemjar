// Header component functionality
export function initHeader() {
  // Add any header-specific interactions here
  const header = document.querySelector('header');
  if (header) {
    // Example: Add scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('shadow-lg');
      } else {
        header.classList.remove('shadow-lg');
      }
    });
  }
}

