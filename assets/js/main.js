// Load Navbar & Footer
const defaultLang = localStorage.getItem("lang") || "en";

// Determine base path for fetching components
const getBasePath = () => {
  const path = window.location.pathname;
  if (path.includes('/about/') || path.includes('/contact/') || path.includes('/donate/') || path.includes('/work/')) {
    return '../';
  }
  return './';
};

const basePath = getBasePath();

fetch(`${basePath}components/navbar.html`)
  .then((res) => res.text())
  .then((data) => {
    // dynamically adjust paths
    const adjustedData = data
        .replace(/(src|href)=["'](?!http|#|\/)([^"']+)["']/g, (match, attr, path) => {
            // If path doesn't start with http, #, or /, prepend basePath
            // and assume the path in file is relative to root (e.g. "assets/...")
            // We want to skip paths that are already relative like "../" if we assume inputs are "pure" relative?
            // Actually, best to standardise inputs to be "assets/..."
            return `${attr}="${basePath}${path}"`;
        });
    document.getElementById("navbar").innerHTML = adjustedData;
  });

fetch(`${basePath}components/footer.html`)
  .then((res) => res.text())
  .then((data) => {
     const adjustedData = data
        .replace(/(src|href)=["'](?!http|#|\/)([^"']+)["']/g, (match, attr, path) => {
             return `${attr}="${basePath}${path}"`;
        });
    document.getElementById("footer").innerHTML = adjustedData;
  });

function loadLanguage(lang) {
  fetch(`${basePath}data/${lang}.json`)
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
document
  .getElementById("contactForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    const whatsappNumber = "9923013366"; // NGO WhatsApp number

    const whatsappMessage = `Hello Shivshaashwat Foundation,
    Name: ${name}
    Message: ${message}`;
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

