export const redirectUtils = {
  _sanitizeRedirect(target) {
    if (!target || typeof target !== 'string') return null;
    const t = target.trim();
    // Disallow protocol-relative URLs (//example.com) and explicit schemes.
    if (t.startsWith('//')) return null;
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t) && !t.startsWith('/')) return null;

    try {
      const resolved = new URL(t, window.location.origin);
      // Only allow same-origin destinations.
      if (resolved.origin !== window.location.origin) return null;


      // Return a normalized path + search + hash so we don't leak origin.
      return resolved.pathname + resolved.search + resolved.hash;
    } catch (e) {
      return null;
    }
  },

  // Perform a safe redirect
  redirect(url) {
    const safe = this._sanitizeRedirect(url);
    if (safe) {
      window.location.replace(safe);
      return true;
    }
    return false;
  },

  // Read common redirect query parameters but do NOT trust them until they are sanitized by _sanitizeRedirect.
  getRedirectFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return (
      urlParams.get('redirect') ||
      urlParams.get('return') ||
      urlParams.get('next') ||
      urlParams.get('url') ||
      urlParams.get('goto') ||
      null
    );
  },


  redirectAfterLogin(defaultUrl = '/dashboard.html') {
    const redirectUrl = this.getRedirectFromURL();
    if (redirectUrl && this.redirect(redirectUrl)) {
      return;
    }
    window.location.replace(defaultUrl);
  },


  redirectFromLink(url) {
    if (url && this.redirect(url)) return;
  }
};
