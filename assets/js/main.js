const defaultLang = localStorage.getItem("lang") || "en";

// --- Components Loading ---
const loadNavbar = () => fetch("components/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    const navParams = document.getElementById("navbar");
    if(navParams) navParams.innerHTML = data;
  });

const loadFooter = () => fetch("components/footer.html")
  .then((res) => res.text())
  .then((data) => {
    const footerParams = document.getElementById("footer");
    if(footerParams) footerParams.innerHTML = data;
  });

// --- Language Loading ---
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

// --- Initialization ---
const initApp = () => {
    Promise.all([loadNavbar(), loadFooter()]).then(() => {
        loadLanguage(defaultLang);
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
    
    // Intercept navigation for local HTML files or Root
    if (href && (href.endsWith('.html') || href === './' || href === '/' || !href.includes('.'))) {
        // Skip external links, anchors, or mailto/tel
        if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

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

const handleLocation = async (filePath) => {
    if (!filePath) return;
    
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Update Title
        document.title = doc.title;
        
        // Replace Body
        document.body.innerHTML = doc.body.innerHTML;
        
        // Re-execute scripts
        const scripts = document.body.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const src = oldScript.getAttribute('src');
            // Skip main.js to prevent re-initialization error
            // Skip bootstrap to prevent duplicate event listeners
            if (src && (src.includes('main.js') || src.includes('bootstrap'))) return;

            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });

        // Re-initialize app components for the new page
        initApp();
        
    } catch (error) {
        console.error("Router error:", error);
        // Fallback: reload page if fetch fails (e.g. strict CORS or missing file)
        window.location.href = filePath; 
    }
};

const setupRouterLinks = () => {
    document.querySelectorAll('a').forEach(link => {
        // We can attach a global listener to document instead of individual links
        // But for safety let's rely on event delegation or setup
    });
};

// Global click listener for delegation (handles dynamic content too)
document.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
        route(e);
    }
});

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

