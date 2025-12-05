// Exchange Rates component
import { utils } from '../utils/dateTime.js';

export function initExchangeRates() {
  const ratesBtn = document.querySelector('.rates-btn');
  
  if (ratesBtn) {
    ratesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Using DaisyUI modal
      const modal = document.getElementById('rates-modal');
      if (modal) {
        modal.showModal();
      } else {
        alert('Fitur kurs lainnya tidak tersedia dalam mockup ini.');
      }
    });
  }
  
  // Update exchange rate date/time every minute
  setInterval(() => {
    utils.updateExchangeDateTime();
  }, 60000);
}

