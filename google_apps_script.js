/**
 * ==============================================================================
 * ZAIKA MAHAL - GOOGLE SHEETS RESERVATION BACKUP WEBHOOK (Google Apps Script)
 * ==============================================================================
 * 
 * STEP-BY-STEP SETUP INSTRUCTIONS (Takes ~1 minute):
 * 
 * 1. Open Google Sheets (https://sheets.new) and create a new spreadsheet named:
 *    "Zaika Mahal - Table Bookings"
 * 
 * 2. Set the header row (Row 1) in Sheet1 with the following columns:
 *    A1: Timestamp
 *    B1: Booking ID
 *    C1: Customer Name
 *    D1: Phone Number
 *    E1: Party Size
 *    F1: Reservation Date
 *    G1: Dining Time
 *    H1: Special Requests / Occasion
 *    I1: Status
 * 
 * 3. In the Google Sheet top menu, click: Extensions -> Apps Script
 * 
 * 4. Delete any code in the editor and paste this entire file content.
 * 
 * 5. Click "Deploy" (top right) -> "New deployment"
 *    - Select type: "Web app"
 *    - Description: "Zaika Mahal Reservation Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (Required so your website can send bookings)
 * 
 * 6. Click "Deploy", authorize permissions when prompted, and copy the Web App URL:
 *    (e.g., https://script.google.com/macros/s/AKfycb.../exec)
 * 
 * 7. Paste that URL into assets/js/script.js under GOOGLE_SHEETS_WEBHOOK_URL!
 * ==============================================================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data;
    
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    var timestamp = data.submission_time || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var bookingId = data.id || ("ZM-" + Date.now());
    var name = data.name || "N/A";
    var phone = data.phone || "N/A";
    var person = data.person || "N/A";
    var date = data.reservation_date || data["reservation-date"] || "N/A";
    var time = data.time || "N/A";
    var message = data.message || "None";
    var status = "Pending Confirmation";

    // Append the row to Google Sheets
    sheet.appendRow([
      timestamp,
      bookingId,
      name,
      phone,
      person,
      date,
      time,
      message,
      status
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "bookingId": bookingId,
      "message": "Reservation recorded in Google Sheets"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    "status": "active",
    "service": "Zaika Mahal Reservation Webhook"
  })).setMimeType(ContentService.MimeType.JSON);
}
