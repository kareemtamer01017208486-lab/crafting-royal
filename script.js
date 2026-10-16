// استبدل الرقم برقم واتسابكم مع مفتاح الدولة، من دون + أو مسافات.
const WHATSAPP_NUMBER = "201000000000";

const makeWhatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// روابط واتساب في الموقع
document.getElementById("contactWhatsApp").href =
  makeWhatsAppLink("مرحبًا، أود حجز استشارة مع Majestic Aura.");

document.getElementById("footerWhatsApp").href =
  makeWhatsAppLink("مرحبًا، أود الاستفسار عن خدمات Majestic Aura.");

// قائمة الموبايل
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// تصفية معرض الأعمال
const filterButtons = document.querySelectorAll(".filter-button");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    portfolioItems.forEach((item) => {
      const categories = item.dataset.category.split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);
      item.classList.toggle("hidden", !shouldShow);
    });
  });
});

// تكبير صورة المشروع عند الضغط عليها
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxClose = document.getElementById("lightboxClose");

portfolioItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.dataset.image;
    const title = item.dataset.title;

    lightboxImage.src = image;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

// حاسبة تقدير مبدئي ترسل تفاصيل الاختيارات إلى واتساب
document.getElementById("estimateForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const eventType = document.getElementById("eventType").value;
  const guestCount = document.getElementById("guestCount").value;
  const serviceLevel = document.getElementById("serviceLevel").value;

  const eventNames = {
    outdoor: "حفل خارجي",
    ballroom: "قاعة",
  };

  const guestNames = {
    100: "حتى 100 ضيف",
    200: "101 إلى 200 ضيف",
    300: "201 إلى 300 ضيف",
    400: "أكثر من 300 ضيف",
  };

  const serviceNames = {
    design: "تصميم وتنسيق",
    production: "تصميم وإنتاج",
    full: "تنفيذ وإدارة متكاملة",
  };

  const message = [
    "مرحبًا، أود الحصول على تقدير مبدئي من Majestic Aura.",
    `نوع الاحتفال: ${eventNames[eventType]}`,
    `عدد الضيوف: ${guestNames[guestCount]}`,
    `الخدمات المطلوبة: ${serviceNames[serviceLevel]}`,
  ].join("\n");

  window.open(makeWhatsAppLink(message), "_blank", "noopener");
});
