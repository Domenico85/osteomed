/* -----------------------------------------
   OSTEOMED - script.js
----------------------------------------- */

/* -- LOADER -- */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  // Minimum display time for the animation (ms)
  setTimeout(() => {
    loader.classList.add("hidden");
    // Remove from DOM after transition
    loader.addEventListener("transitionend", () => loader.remove(), {
      once: true,
    });
  }, 1800);
});

/* -- NAVBAR scroll style -- */
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  },
  { passive: true },
);

/* -- BURGER / MOBILE MENU -- */
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobile-menu");

burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

// Close mobile menu on link click
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("open");
    mobileMenu.classList.remove("open");
  });
});

/* -- REVEAL ON SCROLL (IntersectionObserver) -- */
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.12 },
);

revealEls.forEach((el) => revealObserver.observe(el));

/* -- FAQ ACCORDION -- */
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.contains("open");

    // Close all
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));

    // Toggle clicked
    if (!isOpen) item.classList.add("open");
  });
});

/* -- CONTACT FORM -- */
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = "✓ Richiesta inviata!";
    btn.style.background = "#3a6469";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = "";
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}

/* -----------------------------------------
   CAL.COM EMBED
   Sostituisci CAL_USERNAME con il tuo username Cal.com
   es. "dott-pannuti" se il tuo link e' cal.com/dott-pannuti
----------------------------------------- */
const CAL_USERNAME = "prova_sito"; // <-- MODIFICA QUI

// Mappa tab -> slug evento Cal.com (crea questi Event Types sul tuo account)
const CAL_EVENTS = {
  "prima-visita": "prima-visita",
  "visita-controllo": "visita-controllo",
  consulenza: "consulenza-gratuita",
};

let currentEvent = "prima-visita";

function loadCalEmbed(eventSlug) {
  const container = document.getElementById("cal-embed-container");
  const notice = document.querySelector(".cal-notice");
  if (!container) return;

  // Se username non e' ancora configurato, mostra solo il placeholder
  if (CAL_USERNAME === "IL_TUO_USERNAME") return;

  // Nascondi placeholder, mostra embed
  if (notice) notice.style.display = "none";

  // Rimuovi iframe precedente
  container.innerHTML = "";

  const iframe = document.createElement("iframe");
  iframe.src = `https://cal.com/${CAL_USERNAME}/${eventSlug}?embed=true&theme=light&primaryColor=4F868E&hideEventTypeDetails=false`;
  iframe.title = "Prenota un appuntamento";
  iframe.allow = "payment";
  iframe.setAttribute("loading", "lazy");
  container.appendChild(iframe);
}

// Tabs
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentEvent = btn.dataset.cal;
    loadCalEmbed(CAL_EVENTS[currentEvent]);
  });
});

// Carica al primo render
loadCalEmbed(CAL_EVENTS[currentEvent]);

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener(
  "scroll",
  () => {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.id;
    });

    navLinks.forEach((link) => {
      link.style.color = "";
      if (link.getAttribute("href") === `#${current}`) {
        if (!link.classList.contains("nav-cta")) {
          link.style.color = "var(--primary)";
        }
      }
    });
  },
  { passive: true },
);
