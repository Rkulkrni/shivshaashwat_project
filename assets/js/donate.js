document
  .getElementById("donationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = document.getElementById("donationAmount").value;

    const upiUrl = `upi://pay?pa=shivshaswatfoundation@upi&pn=Shivshaswat%20Foundation&am=${amount}&cu=INR`;

    document.getElementById("upiPayBtn").setAttribute("href", upiUrl);

    document.getElementById("upiSection").classList.remove("d-none");
    document
      .getElementById("upiSection")
      .scrollIntoView({ behavior: "smooth" });
  });

function markPending() {
  // Show Bootstrap modal
  var pendingModal = new bootstrap.Modal(
    document.getElementById("pendingModal"),
  );
  pendingModal.show();
  setTimeout(() => pendingModal.hide(), 5000);
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.phone,
    data.pan,
    data.amount,
    "UPI",
    "Pending",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ result: "success" }),
  ).setMimeType(ContentService.MimeType.JSON);
}

const form = document.getElementById("donationForm");
const upiSection = document.getElementById("upiSection");
const upiPayBtn = document.getElementById("upiPayBtn");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop page reload

  // Collect user data
  const donorData = {
    name: document.getElementById("donorName").value,
    email: document.getElementById("donorEmail").value,
    pan: document.getElementById("donorPan").value,
    phone: document.getElementById("donorPhone").value,
    amount: document.getElementById("donationAmount").value,
  };

  // Send data to Google Apps Script
  fetch(
    "https://script.google.com/macros/s/AKfycbzD57D72J4DrKROTGB6hz3f0Md4-KQvBjOsSSmcxq67l15xwwi14ez4g9HugAjRpgo/exec",
    {
      method: "POST",
      body: JSON.stringify(donorData),
    },
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("Saved:", data);

      // Generate UPI link dynamically
      const upiUrl = `upi://pay?pa=shivshaswatfoundation@upi&pn=Shivshaswat Foundation&am=${donorData.amount}&cu=INR`;
      upiPayBtn.href = upiUrl;

      // Show UPI section
      upiSection.classList.remove("d-none");

      // Disable form after submission
      form.reset();
      form.querySelector("button").disabled = true;
    })
    .catch((err) => {
      alert("Something went wrong. Please try again.");
      console.error(err);
    });
});
