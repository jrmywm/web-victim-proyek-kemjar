// Main application entry point
import { initHeader } from './components/header.js';
import { initExchangeRates } from './components/exchangeRates.js';
import { initLoginButtons } from './components/loginButtons.js';
import { initWebsiteButton } from './components/websiteButton.js';
import { initFooterLinks } from './components/footerLinks.js';
import { utils } from './utils/dateTime.js';
import { Analytics } from "@vercel/analytics/next"

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Bank Nusantara - Internet Banking initialized');
  
  // Initialize components
  initHeader();
  initExchangeRates();
  initLoginButtons();
  initWebsiteButton();
  initFooterLinks();
  
  // Update exchange rate date/time
  utils.updateExchangeDateTime();
});

