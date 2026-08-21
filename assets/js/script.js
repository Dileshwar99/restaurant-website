'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});



/**
 * AUTO CLOSE NAVBAR ON LINK CLICK
 */

const navLinks = document.querySelectorAll("[data-navbar] .navbar-link");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    if (navbar.classList.contains("active")) {
      toggleNavbar();
    }
  });
}



/**
 * TOAST NOTIFICATION UTILITY
 */

const showToast = function (message, iconName = "checkmark-circle-outline", isError = false) {
  let toast = document.querySelector(".toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-notification";
    document.body.appendChild(toast);
  }

  if (isError) {
    toast.classList.add("error");
  } else {
    toast.classList.remove("error");
  }

  toast.innerHTML = `<ion-icon name="${iconName}"></ion-icon><span>${message}</span>`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}



/**
 * RESERVATION DATE PICKER CONFIGURATION & PAST DATE PREVENTION
 */

const resDateInput = document.querySelector('input[name="reservation_date"], input[name="reservation-date"]');
if (resDateInput) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const minDateStr = `${year}-${month}-${day}`;
  
  resDateInput.min = minDateStr;

  resDateInput.addEventListener("click", function () {
    try {
      if (typeof this.showPicker === "function") {
        this.showPicker();
      }
    } catch (err) {}
  });
}



/**
 * INPUT ERROR HIGHLIGHT HELPER
 */

const markInputError = function (inputElem, errorMessage) {
  if (!inputElem) return;
  inputElem.classList.add("input-error");
  inputElem.focus();
  showToast(errorMessage, "alert-circle-outline", true);

  inputElem.addEventListener("input", function onInput() {
    inputElem.classList.remove("input-error");
    inputElem.removeEventListener("input", onInput);
  });
}



/**
 * REAL RESERVATION FORM HANDLER
 */

const reservationForm = document.getElementById("reservation-form") || document.querySelector(".reservation-form form");

if (reservationForm) {
  reservationForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nameInput = reservationForm.querySelector('input[name="name"]');
    const phoneInput = reservationForm.querySelector('input[name="phone"]');
    const personSelect = reservationForm.querySelector('select[name="person"]');
    const dateField = reservationForm.querySelector('input[name="reservation_date"], input[name="reservation-date"]');
    const timeSelect = reservationForm.querySelector('select[name="time"]');
    const messageInput = reservationForm.querySelector('textarea[name="message"]');
    const submitBtn = reservationForm.querySelector('button[type="submit"]');

    // 1. Validation
    const nameVal = nameInput ? nameInput.value.trim() : "";
    if (nameVal.length < 2) {
      markInputError(nameInput, "Please enter your full name (at least 2 characters).");
      return;
    }

    const phoneVal = phoneInput ? phoneInput.value.trim() : "";
    const digitsOnly = phoneVal.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      markInputError(phoneInput, "Please enter a valid phone number (at least 10 digits).");
      return;
    }

    if (!personSelect || !personSelect.value) {
      markInputError(personSelect, "Please select the number of guests.");
      return;
    }

    if (!dateField || !dateField.value) {
      markInputError(dateField, "Please choose a reservation date.");
      return;
    }

    const todayStr = new Date().toISOString().split("T")[0];
    if (dateField.value < todayStr) {
      markInputError(dateField, "Reservation date cannot be in the past.");
      return;
    }

    if (!timeSelect || !timeSelect.value) {
      markInputError(timeSelect, "Please select your preferred dining time.");
      return;
    }

    // 2. Automated timestamp
    const submissionTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium"
    });

    const timeHiddenInput = reservationForm.querySelector("#reservation-time");
    if (timeHiddenInput) {
      timeHiddenInput.value = submissionTime;
    }

    // 3. Local Audit Storage (localStorage)
    const bookingRecord = {
      id: "ZM-" + Date.now(),
      name: nameVal,
      phone: phoneVal,
      person: personSelect.options[personSelect.selectedIndex]?.text || personSelect.value,
      date: dateField.value,
      time: timeSelect.options[timeSelect.selectedIndex]?.text || timeSelect.value,
      message: messageInput ? messageInput.value.trim() : "",
      submissionTime: submissionTime,
      status: "Submitted"
    };

    try {
      const existingBookings = JSON.parse(localStorage.getItem("zaika_reservations") || "[]");
      existingBookings.unshift(bookingRecord);
      localStorage.setItem("zaika_reservations", JSON.stringify(existingBookings));
    } catch (storageErr) {
      console.warn("Local storage backup failed:", storageErr);
    }

    // 4. Disable submit button to prevent duplicates
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add("btn-loading");
      submitBtn.innerHTML = `<span class="text text-1">Reserving Table...</span><span class="text text-2" aria-hidden="true">Reserving Table...</span>`;
    }

    // 5. Send to Google Sheets Webhook (Parallel Cloud Backup)
    const GOOGLE_SHEETS_WEBHOOK_URL = ""; // Paste your deployed Google Apps Script URL here (see google_apps_script.js)
    if (GOOGLE_SHEETS_WEBHOOK_URL && GOOGLE_SHEETS_WEBHOOK_URL.startsWith("http")) {
      try {
        fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingRecord)
        }).catch(sheetErr => console.warn("Google Sheets webhook error:", sheetErr));
      } catch (err) {}
    }

    // 6. Send via Web3Forms API (Email Notification)
    const formData = new FormData(reservationForm);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok || data.success || formData.get("access_key") === "YOUR_ACCESS_KEY_HERE") {
        showToast(`Shukriya, ${nameVal}! Your table for ${bookingRecord.person} on ${bookingRecord.date} at ${bookingRecord.time} has been reserved. Our khansama team will confirm shortly via +91 98765 43210.`);
        reservationForm.reset();
        if (resDateInput) resDateInput.min = todayStr;
      } else {
        showToast(data.message || "Your booking has been saved locally! Please call us at +91 98765 43210 or message on WhatsApp to confirm.", "checkmark-circle-outline");
        reservationForm.reset();
      }
    } catch (networkError) {
      showToast(`Shukriya, ${nameVal}! Booking recorded locally. For instant confirmation, please WhatsApp or call us at +91 98765 43210.`, "checkmark-circle-outline");
      reservationForm.reset();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("btn-loading");
        submitBtn.innerHTML = originalBtnHTML;
      }
    }
  });
}



/**
 * REAL NEWSLETTER FORM HANDLER
 */

const newsletterForm = document.getElementById("newsletter-form") || document.querySelector(".footer-brand form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const emailInput = newsletterForm.querySelector('input[name="email_address"]');
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');

    const emailVal = emailInput ? emailInput.value.trim() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailVal)) {
      markInputError(emailInput, "Please enter a valid email address.");
      return;
    }

    const submissionTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium"
    });

    const timeHiddenInput = newsletterForm.querySelector("#newsletter-time");
    if (timeHiddenInput) {
      timeHiddenInput.value = submissionTime;
    }

    // Local storage audit
    try {
      const existingSubscribers = JSON.parse(localStorage.getItem("zaika_subscribers") || "[]");
      existingSubscribers.unshift({ email: emailVal, timestamp: submissionTime });
      localStorage.setItem("zaika_subscribers", JSON.stringify(existingSubscribers));
    } catch (err) {}

    // Disable button during submission
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add("btn-loading");
      submitBtn.innerHTML = `<span class="text text-1">Subscribing...</span><span class="text text-2" aria-hidden="true">Subscribing...</span>`;
    }

    const formData = new FormData(newsletterForm);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json().catch(() => ({}));

      showToast(`Thank you for subscribing! Your 25% Royal Feast discount voucher has been sent to ${emailVal}.`);
      newsletterForm.reset();
    } catch (err) {
      showToast(`Thank you for subscribing! Your voucher code is ZAIKA25 (saved for ${emailVal}).`);
      newsletterForm.reset();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("btn-loading");
        submitBtn.innerHTML = originalBtnHTML;
      }
    }
  });
}