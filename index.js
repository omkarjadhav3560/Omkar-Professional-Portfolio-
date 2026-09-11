/**
 * Personal Portfolio Application Logic
 * Omkar Jadhav - Data Analyst & Technology Specialist
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initActiveNavOnScroll();
  initDynamicYear();
  initTestimonialCarousel();
});

/**
 * Mobile Drawer Menu Functionality
 */
function initMobileNavigation() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link, .nav-cta a");

  if (!navToggle || !navMenu) return;

  // Toggle drawer open/close
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    const isOpen = navMenu.classList.contains("open");
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Close menu upon clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", false);
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("open") &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", false);
      navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });
}

/**
 * Active Navigation Link State on Scroll
 */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
}

/**
 * Dynamic Current Year Injection
 */
function initDynamicYear() {
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Testimonial Carousel Mechanism
 */
function initTestimonialCarousel() {
  const slides = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".carousel-indicators .dot");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  function showSlide(index) {
    // Wrap around boundaries
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 6500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetIndex = parseInt(dot.getAttribute("data-index"), 10);
      showSlide(targetIndex);
      startAutoplay();
    });
  });

  // Pause on hover
  const carouselWrapper = document.querySelector(".testimonial-carousel-wrapper");
  if (carouselWrapper) {
    carouselWrapper.addEventListener("mouseenter", stopAutoplay);
    carouselWrapper.addEventListener("mouseleave", startAutoplay);
  }

  startAutoplay();
}

/**
 * Contact Form Direct Email Draft Action
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const name = encodeURIComponent(nameInput ? nameInput.value.trim() : "");
  const subject = encodeURIComponent(subjectInput ? subjectInput.value.trim() : "Portfolio Contact");
  const message = encodeURIComponent(
    (messageInput ? messageInput.value.trim() : "") + `\n\n— Sent by ${decodeURIComponent(name)}`
  );

  const destinationEmail = "omkarjadhav3560@gmail.com";
  const mailtoUrl = `mailto:${destinationEmail}?subject=${subject}&body=${message}`;

  window.location.href = mailtoUrl;
  return false;
}