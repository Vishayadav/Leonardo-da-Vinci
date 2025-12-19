// Smooth active-link highlighting and scroll animations

const navLinks = document.querySelectorAll(".nav-link");
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-links");

// Mobile nav toggle
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

// Close nav on link click (mobile)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("open");
  });
});

// IntersectionObserver for active nav state
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => observer.observe(section));

// Scroll-triggered animations
const animated = document.querySelectorAll(
  ".fade-in-up, .float-in-right, .appear-left, .appear-right, .zoom-in, .slide-up"
);

const animObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -60px 0px",
  }
);

animated.forEach((el) => animObserver.observe(el));

// Modal logic for cards
const modal = document.querySelector("#info-modal");
const modalTitle = modal?.querySelector(".modal-title");
const modalBody = modal?.querySelector(".modal-body");
const modalCloseEls = modal?.querySelectorAll("[data-modal-close]");

function openModal(title, text) {
  if (!modal || !modalTitle || !modalBody) return;
  modalTitle.innerHTML = title;
  modalBody.textContent = text;
  modal.classList.add("open");
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
}

if (modal && modalCloseEls) {
  modalCloseEls.forEach((el) =>
    el.addEventListener("click", () => closeModal())
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

const infoCards = document.querySelectorAll(".info-card");

infoCards.forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.getAttribute("data-modal-title") || "More Information";
    const text =
      card.getAttribute("data-modal-text") ||
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer ac risus vitae justo hendrerit aliquet.";
    openModal(title, text);
  });
});

