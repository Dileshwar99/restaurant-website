# Zaika Mahal — Royal Indian Fine Dining & Tandoor

> A modern, fully responsive luxury restaurant website showcasing authentic Awadhi Dum Pukht cuisine, charcoal tandoor delicacies, and a multi-channel online table reservation pipeline.

---

## 📌 Table of Contents

- [About The Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Local Run](#installation--local-run)
- [Form & Webhook Configuration](#-form--webhook-configuration)
  - [1. Web3Forms Email Notifications](#1-web3forms-email-notifications)
  - [2. Google Sheets Webhook Backup](#2-google-sheets-webhook-backup)
- [Responsive Breakpoints](#-responsive-breakpoints)
- [Contact & Location](#-contact--location)

---

## 👑 About The Project

**Zaika Mahal** is an authentic Indian fine dining restaurant situated in Connaught Place, New Delhi. The website provides guests with an immersive digital experience reflecting the grandeur of Mughal and Awadhi royal courts, featuring:

- A curated selection of heirloom recipes (Biryanis, Kebabs, Thalis, and Desserts).
- Executive chef and master *khansama* profiles.
- Upcoming cultural and culinary event showcases.
- Real-time online table reservations with instant email alerts, cloud spreadsheet logging, and WhatsApp booking.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic, accessible page architecture and Schema.org JSON-LD structured data |
| **CSS3** | Custom design tokens, responsive CSS Grid / Flexbox, animations, and dark theme |
| **JavaScript (ES6+)** | Dynamic slider, parallax scrolling, client-side validation, and asynchronous form dispatching |
| **Ionicons** | Vector icons for navigation, contact items, and UI elements |
| **Google Fonts** | Typography pairing featuring *Forum* (display serif) and *DM Sans* (body sans-serif) |
| **Web3Forms API** | Serverless form endpoint for instant HTML email delivery to the restaurant inbox |
| **Google Apps Script** | Cloud webhook integration to append reservation data into Google Sheets |

---

## ✨ Key Features

- **Royal Menu Presentation**: Interactive menu highlighting bestselling specialties (*Dum Awadhi Nalli Nihari*, *Galouti Kebab*, *Murgh Makhani*, *Dal Bukhara*, *Awadhi Biryani*, and *Shahi Tukda*) with authentic Indian currency (`₹`) pricing.
- **Reliable Booking Pipeline**:
  - **Email Alerts**: Dispatches formatted HTML notifications to `reservations@zaikamahal.com`.
  - **Google Sheets Backup**: Appends every booking row to a shared spreadsheet.
  - **WhatsApp Direct Booking**: One-tap pre-filled WhatsApp reservation link (`wa.me/917808854340`).
  - **Validation & Duplicate Protection**: Past date blocking, phone number validation, double-click prevention with loading spinners, and offline `localStorage` audit logging.
- **Master Khansamas Showcase**: Dedicated profiles and curated portrait photography of executive chefs.
- **Cultural Events Calendar**: Announcements for Ghazal & Sufi musical evenings, festive royal feasts, and masterclasses.
- **Performance & SEO Optimized**: Preloaded fonts, non-blocking deferred scripts, lazy-loaded images, Open Graph cards, and Google Rich Snippet support.

---

## 📂 Project Structure

```text
restaurant-website/
├── assets/
│   ├── css/
│   │   └── style.css            # Core stylesheet with design tokens & responsive media queries
│   ├── js/
│   │   └── script.js            # Interactive behaviors, slider, validation, & form handlers
│   └── images/                  # Optimized logos, hero slides, menu items, & chef portraits
│       ├── logo.svg             # Golden royal emblem & typography
│       ├── hero-slider-*.jpg    # Hero banner slides
│       ├── menu-*.png           # Royal dish photography
│       ├── event-*.jpg          # Cultural event banners
│       └── ...                  # Decorative ornaments, icons, and textures
├── google_apps_script.js        # Ready-to-deploy Google Apps Script webhook code
├── index.html                   # Main single-page application markup
├── style-guide.md               # Design token specifications (colors, fonts, spacing)
├── .gitignore                   # Git exclusion rules
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

To view or deploy this project, you only need a modern web browser and [Git](https://git-scm.com/).

### Installation & Local Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dileshwar99/restaurant-website.git
   cd restaurant-website
   ```

2. **Open the site**:
   - Double-click `index.html` to open it directly in your browser.
   - *Or* run a lightweight local static server:

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (npx serve)
   npx serve .
   ```

3. **Visit the local URL**:
   Open `http://localhost:8000` in your web browser.

---

## ⚙️ Form & Webhook Configuration

### 1. Web3Forms Email Notifications
The reservation and newsletter forms use [Web3Forms](https://web3forms.com) for serverless email delivery.

1. Generate a free access key at [Web3Forms](https://web3forms.com).
2. In `index.html`, replace `YOUR_ACCESS_KEY_HERE` on:
   - **Line 950**: Online Reservation Form (`#reservation-form`)
   - **Line 1296**: Newsletter Subscription Form (`#newsletter-form`)

### 2. Google Sheets Webhook Backup
To record bookings automatically in a Google Sheet:

1. Create a new Google Sheet at [sheets.new](https://sheets.new).
2. Open **Extensions** → **Apps Script**.
3. Replace any starter code with the contents of [`google_apps_script.js`](./google_apps_script.js).
4. Click **Deploy** → **New deployment**:
   - **Type**: *Web app*
   - **Execute as**: *Me*
   - **Who has access**: *Anyone*
5. Copy the deployed Web App URL and paste it into `assets/js/script.js` under:
   ```javascript
   const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
   ```

---

## 📱 Responsive Breakpoints

The design is engineered to deliver a seamless layout across all device viewports:

| Viewport Width | Device Category | Layout Behavior |
|---|---|---|
| **375px – 480px** | Mobile Devices | Full-width single-column stacked forms, unclipped logo, minimum 44px touch targets |
| **575px – 767px** | Large Mobile & Small Tablets | 2-column input wrappers, wrapped reservation controls |
| **768px – 1023px** | Tablets (Portrait / Landscape) | 3-column chef cards, 3-column reservation dropdowns, side-by-side grids |
| **1024px – 1399px** | Small Laptops / Desktops | Multi-column menu layout, sticky topbar with business details |
| **1400px+** | Wide Desktop Monitors | Centered fixed max-width containers with ornamental border flourishes |

---

## 📍 Contact & Location

- **Restaurant**: Zaika Mahal — Royal Indian Fine Dining
- **Address**: 12/4, Heritage Boulevard, Connaught Place, New Delhi 110001, India
- **Phone**: [+91 78088 54340](tel:+917808854340)
- **Email**: [reservations@zaikamahal.com](mailto:reservations@zaikamahal.com)
- **Dining Hours**: Monday to Sunday
  - **Lunch**: 12:00 PM – 3:30 PM
  - **Dinner**: 7:00 PM – 11:30 PM
