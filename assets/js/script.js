/*========================
  SCROLL TO TOP
========================*/
const topBtn = document.getElementById("topBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

topBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/*========================
  READ MORE TOGGLE
========================*/
document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.nextElementSibling;
    text.classList.toggle('active');
    btn.textContent = text.classList.contains('active') ? 'Read Less' : 'Read More';
  });
});

/*========================
  NAVBAR LINK ACTIVE
========================*/
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

/*========================
  NAVBAR SCROLLED
========================*/
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});

/*========================
  DARK / LIGHT MODE
========================*/
const body = document.body;
const themeToggles = [
  document.getElementById("themeToggle"),
  document.getElementById("themeToggleMobile")
];
const themeIcons = [
  document.getElementById("themeIcon"),
  document.getElementById("themeIconMobile")
];

function toggleTheme() {
  body.classList.toggle("light-mode");
  themeIcons.forEach(icon => {
    if (body.classList.contains("light-mode")) {
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    } else {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    }
  });
}

themeToggles.forEach(btn => {
  if (btn) btn.addEventListener("click", toggleTheme);
});

/*========================
  MOBILE MENU
========================*/
const navbarCollapse = document.getElementById('navbarNav');
const closeMenuBtn = document.getElementById('closeMenu');
const navbarToggler = document.querySelector('.navbar-toggler');

if (closeMenuBtn) {
  closeMenuBtn.addEventListener('click', () => {
    new bootstrap.Collapse(navbarCollapse).hide();
  });
}

const navLinksMobile = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
navLinksMobile.forEach(link => {
  link.addEventListener('click', () => {
    new bootstrap.Collapse(navbarCollapse).hide();
  });
});

// Linkurile din dropdown Others
const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');
dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    new bootstrap.Collapse(navbarCollapse).hide();
  });
});

/*========================
  SWIPER CAROUSEL (generic)
========================*/
const initSwiper = (selector) => {
  const container = document.querySelector(selector);
  if (!container) return;

  const swiper = new Swiper(selector, {
    loop: true,
    spaceBetween: 30,
    navigation: {
      nextEl: selector + " .swiper-button-next",
      prevEl: selector + " .swiper-button-prev",
    },
    pagination: {
      el: selector + " .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1.2, centeredSlides: true },   // 📱 mobil
      768: { slidesPerView: 2, centeredSlides: false },  // tabletă
      1024: { slidesPerView: 3, centeredSlides: false }  // 💻 desktop
    },
  });

  return swiper;
};

/*========================
  ABOUT & FOOTER LOGO THEME SWITCH
========================*/
const aboutImg = document.getElementById('aboutImg');
const footerLogo = document.getElementById('footerLogo');

function updateImageForTheme() {
  if (aboutImg) {
    if (document.body.classList.contains('light-mode')) {
      aboutImg.src = 'assets/images/About_us_light.png';
    } else {
      aboutImg.src = 'assets/images/About_us.png';
    }
  }

  if (footerLogo) {
    if (document.body.classList.contains('light-mode')) {
      footerLogo.src = 'assets/images/logo_light.png';
    } else {
      footerLogo.src = 'assets/images/logo_dark.png';
    }
  }
}

updateImageForTheme();

const observer = new MutationObserver(updateImageForTheme);
observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

/*========================
  INIT CAROUSELS ON DOM CONTENT LOADED
========================*/
document.addEventListener('DOMContentLoaded', function () {
  // Home & Services folosesc funcția generică
  initSwiper('#home .mySwiper');
  initSwiper('#services .mySwiper');

  // Testimonials
  new Swiper('#testimonials .mySwiper', {
    loop: true,
    spaceBetween: 30,
    autoHeight: true,
    navigation: {
      nextEl: '#testimonials .swiper-button-next',
      prevEl: '#testimonials .swiper-button-prev',
    },
    pagination: {
      el: '#testimonials .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1.2, centeredSlides: true },
      768: { slidesPerView: 2, centeredSlides: false },
      1024: { slidesPerView: 3, centeredSlides: false }
    },
  });

  // States/Zones
  new Swiper('.states-swiper', {
    loop: true,
    spaceBetween: 30,
    navigation: {
      nextEl: '.states-swiper .swiper-button-next',
      prevEl: '.states-swiper .swiper-button-prev',
    },
    pagination: {
      el: '.states-swiper .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1.2, centeredSlides: true },
      768: { slidesPerView: 2, centeredSlides: false },
      1024: { slidesPerView: 3, centeredSlides: false }
    },
  });
});

/*========================
  BLOGS LOAD MORE
========================*/
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleBlogsBtn");
  const extraBlogs = document.querySelectorAll(".extra-blog");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      if (toggleBtn.textContent === "Load More") {
        extraBlogs.forEach(el => el.style.display = "block");
        toggleBtn.textContent = "Load Less";
      } else {
        extraBlogs.forEach(el => el.style.display = "none");
        toggleBtn.textContent = "Load More";
        document.getElementById("blogs").scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});

/*========================
  PRICE CALCULATOR
========================*/
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calculatorForm");
  const result = document.getElementById("priceResult");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const distance = parseFloat(document.getElementById("distance").value);
      const transportType = document.getElementById("transportType").value;

      if (isNaN(distance) || distance <= 0) {
        result.textContent = "⚠️ Please enter a valid distance.";
        return;
      }

      let ratePerMile = 0;
      if (transportType === "open-carrier") {
        ratePerMile = 1.0;
      } else if (transportType === "pickup-truck") {
        ratePerMile = 1.5;
      }

      const totalPrice = distance * ratePerMile;
      result.textContent = `Estimated Price: $${totalPrice.toFixed(2)}`;
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
    // ... (keep any existing code inside this function)

    // FAQ Toggle Button
    const toggleFaqBtn = document.getElementById('toggleFaqBtn');
    const extraFaqs = document.querySelector('.extra-faqs');

    if (toggleFaqBtn && extraFaqs) {
        toggleFaqBtn.addEventListener('click', function() {
            const isHidden = extraFaqs.style.display === 'none';
            if (isHidden) {
                extraFaqs.style.display = 'flex'; // Use 'flex' for rows
                toggleFaqBtn.textContent = 'Less Questions';
            } else {
                extraFaqs.style.display = 'none';
                toggleFaqBtn.textContent = 'More Questions';
            }
        });
    }
});