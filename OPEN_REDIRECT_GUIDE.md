# Open Redirect Vulnerability - Exploitation Guide
## ⚠️ FOR EDUCATIONAL PURPOSES ONLY

Dokumen ini menjelaskan lokasi dan cara melakukan eksploitasi Open Redirect vulnerability yang sengaja dibangun ke dalam aplikasi untuk tujuan edukasi keamanan jaringan.

---

## 📍 Lokasi Vulnerability

### 1. **Login Redirect** (Primary Vulnerability)
**File**: `src/js/components/loginButtons.js`  
**Function**: `redirectAfterLogin()`

**Cara Eksploitasi**:
```
http://localhost/index.html?redirect=https://evil.com/phishing
```
1. Buka URL di atas
2. Klik tombol Login (INDIVIDU atau BISNIS)
3. Masukkan kredensial apa saja (User ID dan Password)
4. Setelah login, user akan di-redirect ke `https://evil.com/phishing`

**Parameter yang didukung**:
- `?redirect=URL`
- `?return=URL`
- `?next=URL`
- `?url=URL`
- `?goto=URL`

**Contoh Exploit**:
- `index.html?redirect=https://www.google.com`
- `index.html?redirect=https://evil.com/phishing`
- `index.html?redirect=javascript:alert('XSS')` (jika browser mengizinkan)
- `index.html?redirect=//evil.com` (protocol-relative)

---

### 2. **Website Button Redirect**
**File**: `src/js/components/websiteButton.js`

**Cara Eksploitasi**:
```
http://localhost/index.html?website=https://evil.com
```
1. Buka URL di atas
2. Klik tombol "Temukan solusi perbankan Anda pada website Bank Nusantara"
3. User akan di-redirect ke URL yang ditentukan

**Contoh Exploit**:
- `index.html?website=https://www.google.com`
- `index.html?website=https://evil.com/fake-bank`

---

### 3. **Footer Link Redirect**
**File**: `src/js/components/footerLinks.js`

**Cara Eksploitasi**:
```
http://localhost/index.html?lps_url=https://evil.com
```
atau
```
http://localhost/index.html?lps-url=https://evil.com
```
1. Buka URL di atas
2. Scroll ke footer
3. Klik link "klik di sini" di bagian "Untuk cek Tingkat Bunga Penjaminan LPS"
4. User akan di-redirect ke URL yang ditentukan

**Contoh Exploit**:
- `index.html?lps_url=https://www.google.com`
- `index.html?lps-url=https://evil.com/fake-lps`

---

## 🔍 Kode Vulnerable

### File: `src/js/utils/redirect.js`

```javascript
// VULNERABLE: No validation on redirect URL
redirect(url) {
  if (url) {
    // VULNERABLE: Direct redirect without whitelist validation
    window.location.href = url;
  }
}

// VULNERABLE: Get redirect from URL parameter without validation
getRedirectFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('redirect') || 
         urlParams.get('return') || 
         urlParams.get('next') || 
         urlParams.get('url') ||
         urlParams.get('goto');
}

// VULNERABLE: Redirect after login without validation
redirectAfterLogin(defaultUrl = '/dashboard.html') {
  const redirectUrl = this.getRedirectFromURL();
  if (redirectUrl) {
    // VULNERABLE: No whitelist check, accepts any URL
    this.redirect(redirectUrl);
  } else {
    this.redirect(defaultUrl);
  }
}
```

**Masalah**:
- ❌ Tidak ada validasi domain
- ❌ Tidak ada whitelist
- ❌ Menerima URL external
- ❌ Tidak memeriksa protocol (bisa javascript:, data:, dll)

---

## 🎯 Attack Scenarios

### Scenario 1: Phishing Attack
1. Attacker membuat website phishing yang mirip dengan bank: `https://evil.com/bank-login`
2. Attacker mengirim email/link: `http://bank.com/index.html?redirect=https://evil.com/bank-login`
3. User mengklik link dan login di website asli
4. Setelah login berhasil, user di-redirect ke website phishing
5. User mengira masih di website bank dan memasukkan data sensitif

### Scenario 2: Social Engineering
1. Attacker membuat link: `http://bank.com/index.html?redirect=https://evil.com/win-prize`
2. Attacker menyebarkan link dengan pesan "Klik untuk menang hadiah!"
3. User mengklik dan login
4. Setelah login, user di-redirect ke website berbahaya

### Scenario 3: XSS via JavaScript Protocol
1. Attacker membuat link: `http://bank.com/index.html?redirect=javascript:alert(document.cookie)`
2. Jika browser tidak memblokir, bisa menyebabkan XSS

---

## 🛡️ Mitigasi (Secure Implementation)

### 1. Whitelist Domain
```javascript
const ALLOWED_DOMAINS = ['banknusantara.co.id', 'www.banknusantara.co.id'];

function secureRedirect(url) {
  try {
    const urlObj = new URL(url, window.location.origin);
    if (ALLOWED_DOMAINS.includes(urlObj.hostname)) {
      window.location.href = url;
    } else {
      console.error('Redirect blocked: Domain not in whitelist');
    }
  } catch (e) {
    console.error('Invalid URL');
  }
}
```

### 2. Relative URL Only
```javascript
function secureRedirect(url) {
  // Only allow relative URLs
  if (url.startsWith('/') || url.startsWith('./')) {
    window.location.href = url;
  } else {
    console.error('Only relative URLs allowed');
  }
}
```

### 3. Token-based Redirect
```javascript
// Generate token on server
const redirectToken = generateSecureToken();
// Store in session
sessionStorage.setItem('redirect_token', redirectToken);

// Validate token before redirect
function secureRedirect(url, token) {
  const storedToken = sessionStorage.getItem('redirect_token');
  if (token === storedToken) {
    window.location.href = url;
  }
}
```

---

## 📝 Testing Checklist

- [ ] Test redirect ke external domain
- [ ] Test redirect dengan protocol javascript:
- [ ] Test redirect dengan protocol data:
- [ ] Test redirect dengan protocol-relative URL (//evil.com)
- [ ] Test redirect setelah login
- [ ] Test redirect dari footer link
- [ ] Test redirect dari website button
- [ ] Test dengan berbagai parameter (redirect, return, next, url, goto)
- [ ] Test dengan URL encoding
- [ ] Test dengan double encoding

---

## ⚠️ Disclaimer

**PENTING**: 
- Vulnerability ini sengaja dibangun untuk tujuan edukasi
- Jangan gunakan teknik ini pada website yang bukan milik Anda
- Eksploitasi tanpa izin adalah ilegal
- Gunakan hanya di environment testing/lab yang terkontrol
- Penulis tidak bertanggung jawab atas penyalahgunaan informasi ini

---

## 📚 References

- [OWASP - Unvalidated Redirects and Forwards](https://owasp.org/www-community/vulnerabilities/Unvalidated_Redirects_and_Forwards)
- [CWE-601: URL Redirection to Untrusted Site](https://cwe.mitre.org/data/definitions/601.html)
- [PortSwigger - Open Redirection](https://portswigger.net/web-security/ssrf/open-redirection)

