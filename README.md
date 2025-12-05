# KlikBank - Internet Banking Frontend

Frontend aplikasi internet banking untuk Bank Nusantara menggunakan Tailwind CSS dan DaisyUI.

## 🚀 Teknologi

- **HTML5** - Struktur halaman
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library untuk Tailwind CSS
- **JavaScript (ES6 Modules)** - Interaktivitas dan logika aplikasi
- **Vite** - Build tool dan development server (opsional)

## 📁 Struktur Folder

```
klikbank-frontend/
├── index.html              # Halaman utama
├── package.json            # Dependencies dan scripts
├── tailwind.config.js      # Konfigurasi Tailwind CSS
├── postcss.config.js       # Konfigurasi PostCSS
├── .gitignore             # Git ignore file
├── README.md              # Dokumentasi
└── src/
    ├── styles/
    │   └── main.css       # Main stylesheet dengan Tailwind directives
    ├── js/
    │   ├── main.js        # Entry point aplikasi
    │   ├── components/    # Komponen JavaScript
    │   │   ├── header.js
    │   │   ├── exchangeRates.js
    │   │   ├── loginButtons.js
    │   │   └── websiteButton.js
    │   └── utils/         # Utility functions
    │       └── dateTime.js
    └── components/        # HTML components (reference)
        ├── Header.html
        ├── ExchangeRates.html
        └── LoginBox.html
```

## 🛠️ Instalasi

### Menggunakan CDN (Tanpa Build)

Buka `index.html` langsung di browser. File sudah dikonfigurasi untuk menggunakan Tailwind CSS dan DaisyUI via CDN.

### Menggunakan NPM (Dengan Build)

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Build untuk production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🎨 Fitur

- ✅ Design modern dengan Tailwind CSS dan DaisyUI
- ✅ Responsive layout untuk mobile dan desktop
- ✅ Komponen modular dan reusable
- ✅ Modal untuk login dan informasi
- ✅ Update waktu kurs secara real-time
- ✅ Smooth animations dan transitions
- ✅ Theme customization dengan DaisyUI

## 📝 Komponen

### Header
Komponen header dengan logo dan navigasi.

### Exchange Rates
Tabel kurs mata uang dengan update waktu otomatis.

### Login Box
Form login untuk individu dan bisnis dengan modal DaisyUI.

### Footer
Footer dengan informasi regulasi dan kontak.

## 🔧 Konfigurasi

### Tailwind CSS
Konfigurasi dapat diubah di `tailwind.config.js`.

### DaisyUI Theme
Theme dapat diubah di `tailwind.config.js` pada bagian `daisyui.themes`.

## 📄 Lisensi

MIT

