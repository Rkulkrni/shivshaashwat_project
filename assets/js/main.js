// Load Navbar & Footer
const defaultLang = localStorage.getItem("lang") || "en";

fetch("components/navbar.html")
  .then((res) => res.text())
  .then((data) => (document.getElementById("navbar").innerHTML = data));

fetch("components/footer.html")
  .then((res) => res.text())
  .then((data) => (document.getElementById("footer").innerHTML = data));

function loadLanguage(lang) {
  fetch(`data/${lang}.json`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelectorAll("[data-key]").forEach((el) => {
        const key = el.getAttribute("data-key");
        el.textContent = data[key];
      });
      localStorage.setItem("lang", lang);
    });
}

function setLanguage(lang) {
  loadLanguage(lang);
}

loadLanguage(defaultLang);

// contact page js.
document.getElementById("contactForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    const whatsappNumber = "9511847484"; // NGO WhatsApp number

    const whatsappMessage = `
Hello Shivshaashwat Foundation,

Name: ${name}
Email: ${email}

Message:
${message}
    `;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, "_blank");
});

// Disable right click only in protected section
document.querySelector(".protect-section")?.addEventListener("contextmenu", e => {
  e.preventDefault();
});

// Screenshot / app switch blur
document.addEventListener("visibilitychange", () => {
  const section = document.querySelector(".protect-section");
  if (!section) return;

  if (document.hidden) {
    section.style.filter = "blur(14px)";
  } else {
    section.style.filter = "blur(0)";
  }
});

