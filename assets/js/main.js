const defaultLang = localStorage.getItem("lang") || "en_lang";

// --- Base URL: works for both file:// and http(s) (e.g. /about or index.html in folder)
function getBase() {
  const href = window.location.href;
  const lastSlash = href.lastIndexOf("/");
  return lastSlash === -1 ? href : href.substring(0, lastSlash + 1);
}

// --- Components Loading ---
const loadNavbar = () => fetch(getBase() + "components/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    const navParams = document.getElementById("navbar");
    if (navParams) navParams.innerHTML = data;
  });

const loadFooter = () => fetch(getBase() + "components/footer.html")
  .then((res) => res.text())
  .then((data) => {
    const footerParams = document.getElementById("footer");
    if (footerParams) footerParams.innerHTML = data;
  });

// --- Language Loading ---
function loadLanguage(lang) {
  fetch(getBase() + "data/" + lang + ".json")
    .then((res) => res.json())
    .then((data) => {
      document.querySelectorAll("[data-key]").forEach((el) => {
        const key = el.getAttribute("data-key");
        if (data[key] != null) el.textContent = data[key];
      });
      localStorage.setItem("lang", lang);
    })
    .catch((err) => {
      console.error("Error loading language file:", err);
    });
}

function setLanguage(lang) {
  loadLanguage(lang);
}

// --- Initialization ---
const initApp = () => {
    Promise.all([loadNavbar(), loadFooter()]).then(() => {
        loadLanguage(localStorage.getItem("lang") || "en_lang");
        setupRouterLinks();
    });
};

// --- Router Logic ---
const route = (event) => {
    event = event || window.event;
    // Walk up to find anchor
    const link = event.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href) return;
    // Never follow # (e.g. language switcher, in-page anchors)
    if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    // Intercept navigation for local HTML files or root
    if (href.endsWith('.html') || href === './' || href === '/' || !href.includes('.')) {
        event.preventDefault();
        
        let path = href;
        if (path === './' || path === '/') path = 'index.html';
        if (!path.endsWith('.html')) path += '.html'; // Handling /about case if links are already clean
        
        // Clean URL for history (remove .html and index)
        let cleanUrl = path;
        if (cleanUrl.endsWith('index.html')) cleanUrl = './';
        else cleanUrl = cleanUrl.replace('.html', '');
        
        window.history.pushState({}, "", cleanUrl);
        handleLocation(path);
    }
};

// Load a script by src and run in order (fixes partners/blood/volunteers not rendering on SPA navigation)
function loadScript(src) {
  const base = getBase();
  const fullUrl = src.startsWith("http") ? src : base + src.replace(/^\//, "");
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load script: " + fullUrl));
    script.src = fullUrl;
    document.body.appendChild(script);
  });
}

const handleLocation = async (filePath) => {
    if (!filePath) return;
    const base = getBase();
    const url = base + filePath.replace(/^\//, "");
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        document.title = doc.title;
        document.body.innerHTML = doc.body.innerHTML;
        
        // Collect page scripts in order; load them sequentially so data runs before slider (avoids missing partners/blood/volunteers)
        const scriptTags = document.body.querySelectorAll('script');
        const toLoad = [];
        scriptTags.forEach((tag) => {
            const src = tag.getAttribute('src');
            if (src && !src.includes('main.js') && !src.includes('bootstrap')) toLoad.push(src);
            tag.remove();
        });
        for (const src of toLoad) {
            try { await loadScript(src); } catch (e) { console.error("Script load error:", e); }
        }

        initApp();
        
    } catch (error) {
        console.error("Router error:", error);
        window.location.href = filePath; 
    }
};

const setupRouterLinks = () => {
    document.querySelectorAll('a').forEach(link => {
        // We can attach a global listener to document instead of individual links
        // But for safety let's rely on event delegation or setup
    });
};

// Language switcher: handle click on [data-set-lang] before any other handler (capture phase)
document.addEventListener('click', (e) => {
    const langLink = e.target.closest('[data-set-lang]');
    if (langLink) {
        e.preventDefault();
        e.stopPropagation();
        setLanguage(langLink.getAttribute('data-set-lang'));
        return;
    }
    if (e.target.closest('a')) {
        route(e);
    }
}, true);

// Handle Back/Forward
window.onpopstate = () => {
    // Basic handling: reload to ensure correct state from server/file
    window.location.reload(); 
};

initApp();

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

