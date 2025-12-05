// Open Redirect Vulnerability - VULNERABLE CODE (for educational purposes)
// This demonstrates an open redirect vulnerability

export const redirectUtils = {
  // VULNERABLE: No validation on redirect URL
  redirect(url) {
    if (url) {
      // VULNERABLE: Direct redirect without whitelist validation
      // This allows redirecting to any external URL
      window.location.href = url;
    }
  },

  // VULNERABLE: Get redirect from URL parameter without validation
  getRedirectFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    // Check multiple common redirect parameter names
    return urlParams.get('redirect') || 
           urlParams.get('return') || 
           urlParams.get('next') || 
           urlParams.get('url') ||
           urlParams.get('goto');
  },

  // VULNERABLE: Redirect after login without validation
  redirectAfterLogin(defaultUrl = '/dashboard.html') {
    const redirectUrl = this.getRedirectFromURL();
    if (redirectUrl) {
      // VULNERABLE: No whitelist check, accepts any URL including external domains
      // Example exploit: ?redirect=https://evil.com/phishing
      console.warn('⚠️ Open Redirect detected:', redirectUrl);
      this.redirect(redirectUrl);
    } else {
      this.redirect(defaultUrl);
    }
  },

  // VULNERABLE: Redirect from link without validation
  redirectFromLink(url) {
    // VULNERABLE: Accepts any URL parameter
    if (url) {
      this.redirect(url);
    }
  }
};

