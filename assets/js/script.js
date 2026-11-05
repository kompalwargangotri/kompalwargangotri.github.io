const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Resume dropdown toggle for click / touch support
const resumeTrigger = document.querySelector('.resume-dropdown-trigger');
const resumeMenu = document.querySelector('.resume-dropdown-menu');

if (resumeTrigger && resumeMenu) {
  resumeTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = resumeMenu.classList.toggle('open');
    resumeTrigger.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!resumeTrigger.contains(e.target) && !resumeMenu.contains(e.target)) {
      resumeMenu.classList.remove('open');
      resumeTrigger.setAttribute('aria-expanded', 'false');
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
