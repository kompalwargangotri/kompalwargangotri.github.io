const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.nav-links a:not(.resume-dropdown-menu a)').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Universal Resume Dropdown support for all dropdowns on the page
document.querySelectorAll('.resume-dropdown-group').forEach((group) => {
  const trigger = group.querySelector('.resume-dropdown-trigger');
  const menu = group.querySelector('.resume-dropdown-menu');
  if (trigger && menu) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close other open menus
      document.querySelectorAll('.resume-dropdown-menu.open').forEach((other) => {
        if (other !== menu) other.classList.remove('open');
      });
      document.querySelectorAll('.resume-dropdown-trigger[aria-expanded="true"]').forEach((other) => {
        if (other !== trigger) other.setAttribute('aria-expanded', 'false');
      });
      const isOpen = menu.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((item) => {
      item.addEventListener('click', () => {
        menu.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        if (navLinks) navLinks.classList.remove('open');
        if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

// Close open dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.resume-dropdown-group')) {
    document.querySelectorAll('.resume-dropdown-menu.open').forEach((menu) => {
      menu.classList.remove('open');
    });
    document.querySelectorAll('.resume-dropdown-trigger[aria-expanded="true"]').forEach((trigger) => {
      trigger.setAttribute('aria-expanded', 'false');
    });
  }
});

// Universal Resume Modal support
const resumeModal = document.getElementById('resume-modal');
if (resumeModal) {
  const openModal = () => {
    resumeModal.classList.add('active');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    resumeModal.classList.remove('active');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.resume-modal-trigger').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  const closeBtn = resumeModal.querySelector('.resume-modal-close');
  const backdrop = resumeModal.querySelector('.resume-modal-backdrop');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  resumeModal.querySelectorAll('.resume-modal-option').forEach((opt) => {
    opt.addEventListener('click', () => {
      closeModal();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeModal();
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
