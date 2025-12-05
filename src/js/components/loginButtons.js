// Login buttons component
import { redirectUtils } from '../utils/redirect.js';

export function initLoginButtons() {
  const loginButtons = document.querySelectorAll('.login-btn');
  
  loginButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const loginOption = this.closest('.login-option');
      const optionLabel = loginOption?.querySelector('.font-bold')?.textContent || 'User';
      
      // Using DaisyUI modal for login
      const modal = document.getElementById('login-modal');
      if (modal) {
        // Set the login type in modal title
        const modalTitle = modal.querySelector('h3');
        if (modalTitle) {
          modalTitle.textContent = `Login Internet Banking - ${optionLabel}`;
        }
        modal.showModal();
      } else {
        alert(`Login functionality is not implemented in this mockup.\n\nLogin untuk: ${optionLabel}`);
      }
    });
  });
  
  // Handle login form submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const userId = formData.get('userid') || loginForm.querySelector('input[type="text"]').value;
      const password = formData.get('password') || loginForm.querySelector('input[type="password"]').value;
      
      if (userId && password) {
        // VULNERABLE: Open Redirect - redirects to URL from query parameter without validation
        // Example exploit: index.html?redirect=https://evil.com/phishing
        // After login, user will be redirected to the URL specified in ?redirect= parameter
        const modal = document.getElementById('login-modal');
        if (modal) {
          modal.close();
        }
        
        // Simulate successful login, then redirect
        setTimeout(() => {
          redirectUtils.redirectAfterLogin('dashboard.html');
        }, 500);
      }
    });
  }
}

