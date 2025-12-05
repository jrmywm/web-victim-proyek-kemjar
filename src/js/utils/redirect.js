export const redirectUtils = {
  redirect(url) {
    if (url) {
      window.location.href = url;
    }
  },

  // Direct redirect without whitelist validation
  // This allows redirecting to any external URL
  // VULNERABLE: Get redirect from URL parameter without validation
  getRedirectFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('redirect') || 
           urlParams.get('return') || 
           urlParams.get('next') || 
           urlParams.get('url') ||
           urlParams.get('goto');
  },

  redirectAfterLogin(defaultUrl = '/dashboard.html') {
    const redirectUrl = this.getRedirectFromURL();
    if (redirectUrl) {
      this.redirect(redirectUrl);
    } else {
      this.redirect(defaultUrl);
    }
  },

  redirectFromLink(url) {
    if (url) {
      this.redirect(url);
    }
  }
};

