// Website button component
import { redirectUtils } from '../utils/redirect.js';

export function initWebsiteButton() {
  const websiteBtn = document.querySelector('.website-btn');
  
  if (websiteBtn) {
    websiteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // VULNERABLE: Open Redirect - can redirect to URL from parameter
      // Example exploit: index.html?website=https://evil.com
      const urlParams = new URLSearchParams(window.location.search);
      const websiteUrl = urlParams.get('website');
      
      if (websiteUrl) {
        // VULNERABLE: No validation, redirects to any URL
        redirectUtils.redirect(websiteUrl);
      } else {
        // Default behavior
        alert('Ini adalah mockup. Website resmi Bank Nusantara: www.banknusantara.co.id');
      }
    });
  }
}

