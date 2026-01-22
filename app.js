// Dark / Light Mode
const THEME_KEY = "theme";
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  if (themeToggle) themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem(THEME_KEY, theme);
}

(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    setTheme(saved);
  } else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }
})();

themeToggle?.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});

// Aktif Menü – GitHub Pages Uyumlu
document.addEventListener("DOMContentLoaded", () => {
  let current = window.location.pathname.split("/").pop() || "index.html";
  current = current.toLowerCase();

  document.querySelectorAll(".linkler a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (!href) return;

    // sadece dosya adını karşılaştır
    const target = href.split("/").pop();

    if (target === current) {
      a.classList.add("active-page");
    } else {
      a.classList.remove("active-page");
    }
  });
});

// Proje Filtreleme (calismalar.html)
(function projectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".rapor-kart");

  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.dataset.filter; // all, ai, web, unity, nlp

      cards.forEach((card) => {
        const cat = card.dataset.category;
        const show = filter === "all" || cat === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
})();

// Görsel Büyütme (Modal)
// - rapor-resim, serti gibi görselleri büyütür
// - calismalar.html'de görsele tıklayınca PDF açılmasını engeller
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  lightboxImg.src = src;
  lightboxImg.alt = alt || "Görsel";
  if (lightboxCaption) lightboxCaption.textContent = alt || "";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  if (lightboxCaption) lightboxCaption.textContent = "";
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  const zoomable = e.target.closest(".zoomable");
  if (zoomable) {
    // calismalar sayfasında img, <a> içinde olduğu için PDF'e gitmesin:
    e.preventDefault();
    openLightbox(zoomable.getAttribute("src"), zoomable.getAttribute("alt"));
    return;
  }

  if (e.target?.dataset?.close === "true") closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
