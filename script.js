const year = document.querySelector('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const mobileNavLinks = document.querySelectorAll('.main-nav a');

const closeMobileMenu = () => {
  mobileMenuToggle?.setAttribute('aria-expanded', 'false');
  mainNav?.classList.remove('active');
  document.body.classList.remove('menu-open');
};

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', String(!isExpanded));
    mainNav.classList.toggle('active');
    document.body.classList.toggle('menu-open', !isExpanded);
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeMobileMenu();
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.site-header')) {
    closeMobileMenu();
  }
});

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const sections = [...document.querySelectorAll('main section[id], .site-header[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];

if ('IntersectionObserver' in window && navLinks.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
      });
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => navObserver.observe(section));
}
