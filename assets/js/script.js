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
      const sedanCount = parseInt(document.getElementById("sedanCount").value) || 0;
      const truckCount = parseInt(document.getElementById("truckCount").value) || 0;

      if (isNaN(distance) || distance <= 0) {
        result.textContent = "⚠️ Please enter a valid distance.";
        return;
      }

      if (sedanCount === 0 && truckCount === 0) {
        result.textContent = "⚠️ Please enter at least one vehicle.";
        return;
      }

      const sedanRate = 1.0;
      const truckRate = 1.5;

      const totalPrice = (sedanCount * distance * sedanRate) +
                         (truckCount * distance * truckRate);

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
function toggleTooltip(wrapper) {
  const tooltip = wrapper.querySelector(".custom-tooltip");
  const isVisible = tooltip.style.display === "block";

  // ascunde toate tooltip-urile
  document.querySelectorAll(".custom-tooltip").forEach(el => el.style.display = "none");

  // afișează doar pe cel click-uit
  if (!isVisible) {
    tooltip.style.display = "block";
  }
}

// ascunde tooltip dacă faci click pe altundeva
document.addEventListener("click", function(event) {
  if (!event.target.closest(".team-img-wrapper")) {
    document.querySelectorAll(".custom-tooltip").forEach(el => el.style.display = "none");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("h1 span, h2 span, h3 span, h4 span, h5 span, h6 span").forEach(span => {
    let letters = span.textContent.split(/( )/); // păstrează și spațiile
    span.innerHTML = letters.map((l, i) => {
      if (l === " ") {
        return " "; // lasă spațiu simplu
      }
      return `<span class="wave-letter" style="animation-delay:${i * 0.1}s">${l}</span>`;
    }).join("");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const spans = document.querySelectorAll("h2 span");

  function createBurst(span) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("span");
      particle.classList.add("particle");

      // direcție random
      const angle = Math.random() * 2 * Math.PI;
      const distance = 40 + Math.random() * 40;
      particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

      span.appendChild(particle);

      particle.addEventListener("animationend", () => {
        particle.remove();
      });
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const span = entry.target;

      if (entry.isIntersecting) {
        // pornește burst loop cât timp e vizibil
        span.burstInterval = setInterval(() => {
          createBurst(span);
        }, 1000); // la fiecare 1s se reface burst-ul
      } else {
        // oprește loop-ul când nu mai e pe ecran
        clearInterval(span.burstInterval);
      }
    });
  }, { threshold: 0.6 });

  spans.forEach(span => observer.observe(span));
});
// Previne introducerea cifrelor în câmpul Name
  const nameInput = document.getElementById('name');
  nameInput.addEventListener('input', () => {
    nameInput.value = nameInput.value.replace(/[0-9]/g, '');
  });

  // Previne introducerea literelor în câmpul Phone
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
  });

  // Optional: custom validare email suplimentară
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      e.preventDefault();
    }
  });
document.addEventListener('DOMContentLoaded', () => {

    const cookieConsentModal = document.getElementById('cookieConsent');
    const acceptAllBtn = document.getElementById('acceptAll');
    const rejectAllBtn = document.getElementById('rejectAll');
    const confirmChoicesBtn = document.getElementById('confirmChoices');
    const cookieFloatingBtn = document.getElementById('cookieFloatingBtn');

    // Funcție care ascunde fereastra mare și arată butonul mic
    const handleConsent = () => {
        cookieConsentModal.style.opacity = '0';
        cookieConsentModal.style.visibility = 'hidden';

        // Aici facem butonul vizibil
        cookieFloatingBtn.style.display = 'flex';

        // Salvăm în memoria browserului că utilizatorul a făcut o alegere
        localStorage.setItem('cookie_consent_given', 'true');
    };

    // Când se dă click pe butonul mic, se redeschide fereastra mare
    cookieFloatingBtn.addEventListener('click', () => {
        cookieConsentModal.style.opacity = '1';
        cookieConsentModal.style.visibility = 'visible';
    });

    // Adăugăm funcționalitate butoanelor din fereastra mare
    acceptAllBtn.addEventListener('click', handleConsent);
    rejectAllBtn.addEventListener('click', handleConsent);
    confirmChoicesBtn.addEventListener('click', handleConsent);

    // Verificăm dacă utilizatorul a mai fost pe site și a făcut deja o alegere
    if (!localStorage.getItem('cookie_consent_given')) {
        // Dacă NU a făcut o alegere, arătăm fereastra mare după 1.5 secunde
        setTimeout(() => {
            cookieConsentModal.style.opacity = '1';
            cookieConsentModal.style.visibility = 'visible';
        }, 1500);
    } else {
        // Dacă DA, arătăm direct butonul mic
        cookieFloatingBtn.style.display = 'flex';
    }
});
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("servicesBtn");
  const text = document.getElementById("servicesText");

  btn.addEventListener("click", () => {
    if (text.style.display === "none" || text.style.display === "") {
      text.style.display = "block";
      btn.textContent = "Read Less";
    } else {
      text.style.display = "none";
      btn.textContent = "Read More";
    }
  });
});
