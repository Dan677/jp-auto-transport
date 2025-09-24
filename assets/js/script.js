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

const navLinksMobile = document.querySelectorAll('.navbar-nav .nav-link');
navLinksMobile.forEach(link => {
  link.addEventListener('click', () => {
    new bootstrap.Collapse(navbarCollapse).hide();
  });
});

if (navbarToggler) {
  navbarToggler.addEventListener('click', () => {
    navbarToggler.classList.toggle('collapsed');
  });
}

/*========================
  SWIPER CAROUSEL
========================*/
const initSwiper = (selector) => {
  const container = document.querySelector(selector);
  if (!container) return;

  const slidesCount = container.querySelectorAll('.swiper-slide').length;

  const swiper = new Swiper(selector, {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: selector + " .swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        let slidesPerView = 3;
        const breakpoints = this.params.breakpoints;
        const width = window.innerWidth;

        if (breakpoints) {
          const keys = Object.keys(breakpoints).map(k => parseInt(k)).sort((a, b) => a - b);
          for (let i = 0; i < keys.length; i++) {
            if (width >= keys[i]) slidesPerView = breakpoints[keys[i]].slidesPerView;
          }
        }

        const bulletsCount = Math.max(slidesCount - (slidesPerView - 1), 1);
        if (index < bulletsCount) return `<span class="${className}"></span>`;
        return '';
      }
    },
    navigation: {
      nextEl: selector + " .swiper-button-next",
      prevEl: selector + " .swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  return swiper;
};

/*========================
  ABOUT IMAGE THEME SWITCH
========================*/
const aboutImg = document.getElementById('aboutImg');

function updateImageForTheme() {
  if (!aboutImg) return;
  if (document.body.classList.contains('light-mode')) {
    aboutImg.src = 'assets/images/About_us_light.png';
  } else {
    aboutImg.src = 'assets/images/About_us.png';
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

  // Testimonials - configurat separat cu autoHeight
  new Swiper('#testimonials .mySwiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoHeight: true, // ✅ important pentru mobil
    navigation: {
      nextEl: '.testimonials-button-next',
      prevEl: '.testimonials-button-prev',
    },
    pagination: {
      el: '#testimonials .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
});
 document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleBlogsBtn");
    const extraBlogs = document.querySelectorAll(".extra-blog");

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
  });