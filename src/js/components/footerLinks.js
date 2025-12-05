// Footer links component - Open Redirect Vulnerability
import { redirectUtils } from '../utils/redirect.js';

export function initFooterLinks() {
  // VULNERABLE: Footer link with open redirect
  const lpsLink = document.getElementById('lps-link');
  if (lpsLink) {
    lpsLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      // VULNERABLE: Get redirect URL from parameter without validation
      // Example exploit: index.html?lps_url=https://evil.com
      const urlParams = new URLSearchParams(window.location.search);
      const lpsUrl = urlParams.get('lps_url') || urlParams.get('lps-url');
      
      if (lpsUrl) {
        // VULNERABLE: No validation, redirects to any URL
        redirectUtils.redirect(lpsUrl);
      } else {
        // Default behavior - could also be vulnerable if not handled properly
        alert('Informasi LPS akan segera tersedia.');
      }
    });
  }
}

