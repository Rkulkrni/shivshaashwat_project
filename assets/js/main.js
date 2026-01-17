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
