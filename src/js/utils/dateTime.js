// Date and time utilities
export const utils = {
  updateExchangeDateTime() {
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const dateStr = `${day}-${month}-${year} / ${hours}:${minutes} WIB`;
    const dateElement = document.getElementById('exchangeDate');
    if (dateElement) {
      dateElement.textContent = dateStr;
    }
  },
  
  formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
};

