// Theme toggle functionality
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  const themeIcon = document.querySelector(".theme-toggle i");
  themeIcon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const themeIcon = document.querySelector(".theme-toggle i");
  themeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Scroll animations
function handleScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");

  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

// Navbar background on scroll
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "rgba(15, 23, 42, 0.98)"
        : "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.background =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "rgba(15, 23, 42, 0.95)"
        : "rgba(255, 255, 255, 0.95)";
  }
}

// Typing animation for hero text
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation
function initTypingAnimation() {
  const heroTitle = document.querySelector(".hero-text h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText);
    }, 500);
  }
}

// Initialize scroll listeners
function initScrollListeners() {
  window.addEventListener("scroll", () => {
    handleScrollAnimations();
    handleNavbarScroll();
  });
}

// Profile picture fallback handling
function initProfilePictureFallback() {
  const heroImage = document.querySelector(".hero-image");
  const profileImg = document.querySelector(".profile-pic");

  if (profileImg && profileImg.tagName === "IMG") {
    // Create loading container
    const loadingContainer = document.createElement("div");
    loadingContainer.className = "profile-pic profile-pic-loading";

    // Replace the image temporarily with loading container
    profileImg.style.display = "none";
    heroImage.insertBefore(loadingContainer, profileImg);

    // Handle successful image load
    profileImg.addEventListener("load", function () {
      // Check if image actually loaded properly
      if (this.naturalWidth > 0 && this.naturalHeight > 0) {
        // Remove loading container and show image
        loadingContainer.remove();
        this.style.display = "block";
        this.classList.add("profile-pic-loaded");
      } else {
        // Image didn't load properly, show fallback
        loadingContainer.remove();
        showProfilePictureFallback(this);
      }
    });

    // Handle image load error
    profileImg.addEventListener("error", function () {
      loadingContainer.remove();
      showProfilePictureFallback(this);
    });

    // Set timeout for loading
    const timeoutDuration = 3000;

    setTimeout(() => {
      if (loadingContainer.parentNode) {
        // Still loading after timeout, show fallback
        loadingContainer.remove();
        showProfilePictureFallback(profileImg);
      }
    }, timeoutDuration);
  }
}

// Show fallback when image fails to load
function showProfilePictureFallback(imgElement) {
  // Get the user's initials from the page
  const userName =
    document.querySelector(".hero-text h1")?.textContent || "User";
  const initials = userName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2);

  // Create fallback div
  const fallbackDiv = document.createElement("div");
  fallbackDiv.className = "profile-pic profile-pic-fallback";

  // Show initials if available, otherwise show icon
  if (initials && initials.length > 0) {
    fallbackDiv.setAttribute("data-initials", initials);
    fallbackDiv.innerHTML = `<i class="fas fa-user"></i>`;
  } else {
    fallbackDiv.innerHTML = `<i class="fas fa-user"></i>`;
  }

  // Hide the broken image
  imgElement.style.display = "none";

  // Add fallback with smooth animation
  fallbackDiv.style.opacity = "0";
  fallbackDiv.style.transform = "scale(0.8)";

  // Insert the fallback
  imgElement.parentNode.insertBefore(fallbackDiv, imgElement);

  // Animate in
  setTimeout(() => {
    fallbackDiv.style.transition = "all 0.3s ease";
    fallbackDiv.style.opacity = "1";
    fallbackDiv.style.transform = "scale(1)";
  }, 50);
}

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initSmoothScrolling();
  handleScrollAnimations();
  initScrollListeners();
  initProfilePictureFallback();
});

// Initialize typing animation on page load
window.addEventListener("load", () => {
  initTypingAnimation();
});
