
// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// SCROLL PROGRESS BAR
const progressBar = document.getElementById("progressBar");

function updateProgress() {
  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;

  const percentage = scrollable > 0
    ? (window.scrollY / scrollable) * 100
    : 0;

  progressBar.style.width = `${percentage}%`;
}

window.addEventListener("scroll", updateProgress, {
  passive: true
});

updateProgress();

// SCROLL REVEAL ANIMATION
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(item => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach(item => {
    item.classList.add("visible");
  });
}

// ANIMATED STATISTICS
const counters = document.querySelectorAll("[data-count]");

function animateCounter(element) {
  const target = Number(element.dataset.count);
  const duration = 1400;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min(
      (now - startTime) / duration,
      1
    );

    const eased = 1 - Math.pow(1 - progress, 3);

    element.textContent = Math.round(
      target * eased
    ).toLocaleString("en-IN");

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
} else {
  counters.forEach(counter => {
    counter.textContent = counter.dataset.count;
  });
}

// HIGHLIGHT ACTIVE NAVIGATION SECTION
const sections = document.querySelectorAll(
  "#about, #programs, #trainers, #membership, #contact"
);

const navLinks = nav.querySelectorAll('a[href^="#"]');

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
                `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

// MEMBERSHIP BUTTONS
document.querySelectorAll(".plan-btn").forEach(button => {
  button.addEventListener("click", () => {
    const interest = document.getElementById("interest");

    if (interest) {
      interest.value = `${button.dataset.plan} membership`;
    }
  });
});

// CONTACT FORM
// Demo only: this form does not send data to a server.
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const name = document.getElementById("name").value.trim();

  formMessage.textContent =
    `Thank you, ${name}! The demo form is working.`;

  contactForm.reset();
});

// CURRENT YEAR
document.getElementById("year").textContent =
  new Date().getFullYear();
