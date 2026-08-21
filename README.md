# Zaika Mahal — Royal Indian Fine Dining & Tandoor

<div align="center">

  **An authentic, responsive luxury Indian restaurant website featuring Awadhi Dum Pukht cuisine, clay-oven tandoor specialties, automated multi-channel table reservations, and seamless mobile responsiveness.**

  <br />

  [Live Website](https://www.zaikamahal.com/) • [Book Table Online](#table-reservations) • [Setup Guide](#getting-started)

</div>

---

## 👑 About Zaika Mahal

Located in the heart of Connaught Place, New Delhi, **Zaika Mahal** preserves the imperial culinary traditions of Awadh and Mughal royal courts. Master khansamas slow-cook signature delicacies in sealed earthenware deghs with fragrant saffron, mace, cardamom, and heirloom spice blends.

---

## 🌟 Key Features

- **Royal Culinary Experience**: Authentic menu featuring *Dum Awadhi Nalli Nihari*, *Galouti Kebab*, *Murgh Makhani*, *Dal Bukhara (24-Hr Dum)*, *Awadhi Gosht Biryani*, and *Shahi Tukda*.
- **Real Multi-Channel Table Reservations**:
  - **Email Delivery**: Instant HTML booking notifications via **Web3Forms** sent directly to `reservations@zaikamahal.com`.
  - **Cloud Spreadsheet Backup**: Connects to **Google Sheets** via Google Apps Script Webhook ([`google_apps_script.js`](./google_apps_script.js)).
  - **Instant WhatsApp Booking**: Pre-formatted WhatsApp messages for quick table confirmation.
  - **Client-side Validation & Duplicate Prevention**: Dynamic past-date blocking, phone format validation, and double-click prevention.
- **Master Khansamas Showcase**: Dedicated profiles and headshots of the executive master chefs.
- **Upcoming Heritage Events**: Ghazal & Sufi musical evenings, Diwali Grand Shahi Dawat, and Dum Cooking Masterclasses.
- **Fully Responsive Architecture**: Fluid layouts tested across 375px, 414px, 768px, 1024px, 1440px, and 1920px viewports with 44px+ touch targets.
- **SEO & Accessibility**: Complete Schema.org `Restaurant` JSON-LD structured data, Open Graph tags, and descriptive image `alt` attributes.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/zaikamahal/zaikamahal-website.git
cd zaikamahal-website
```

### 2. Run Locally

Open `index.html` directly in any web browser, or use a local static server:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx serve)
npx serve .
```

Visit `http://localhost:8000` in your browser.

---

## ⚙️ Configuration

### Web3Forms Email Notifications
1. Obtain a free access key at [Web3Forms](https://web3forms.com).
2. Open `index.html` and replace `YOUR_ACCESS_KEY_HERE` with your access key in:
   - Line 950 (Online Reservation form)
   - Line 1296 (Newsletter Subscription form)

### Google Sheets Reservation Backup (Optional)
1. Open Google Sheets and create a new spreadsheet.
2. In the top menu, go to **Extensions** → **Apps Script**.
3. Paste the contents of [`google_apps_script.js`](./google_apps_script.js).
4. Click **Deploy** → **New deployment** (Type: *Web app*, Access: *Anyone*).
5. Copy the generated Web App URL and paste it into `assets/js/script.js` under `GOOGLE_SHEETS_WEBHOOK_URL`.

---

## 📞 Contact & Location

- **Address**: 12/4, Heritage Boulevard, Connaught Place, New Delhi 110001, India
- **Phone**: [+91 98765 43210](tel:+919876543210)
- **Email**: [reservations@zaikamahal.com](mailto:reservations@zaikamahal.com)
- **Hours**: Monday – Sunday | Lunch: 12:00 PM – 3:30 PM | Dinner: 7:00 PM – 11:30 PM

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE) — Copyright © 2026 Zaika Mahal.
