// Fonction pour le menu hamburger mobile
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Initialisation des animations au défilement (AOS)
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000, // Durée des animations en millisecondes
    once: true, // Les animations ne se jouent qu'une fois
    mirror: false, // Ne pas rejouer les animations en remontant
    disable: function () {
      // Désactiver sur les petits appareils pour des performances optimales
      return window.innerWidth < 768;
    },
  });

  // Ajout d'un gestionnaire pour l'orientation
  window.addEventListener("orientationchange", function () {
    // Forcer le rafraîchissement de la mise en page après changement d'orientation
    setTimeout(function () {
      AOS.refresh();
      window.scrollBy(0, 1);
      window.scrollBy(0, -1);
    }, 300);
  });

  // Gestion du redimensionnement de fenêtre
  window.addEventListener("resize", handleResize);

  // Vérification initiale de la taille d'écran
  handleResize();
});

// Gestion de la taille d'écran
function handleResize() {
  // Ajuster la hauteur pour les appareils mobiles (éviter les problèmes avec la barre d'adresse)
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Navigation active lors du défilement
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Animation de texte dynamique (effet machine à écrire)
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialisation de l'animation d'écriture
document.addEventListener("DOMContentLoaded", function () {
  const txtElement = document.querySelector(".dynamic-text");
  if (txtElement) {
    const words = JSON.parse(txtElement.getAttribute("data-type"));
    const wait = txtElement.getAttribute("data-period");
    new TypeWriter(txtElement, words, wait);
  }
});

// Gestion du mode sombre/clair
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("modeToggle");
  const themeIcons = document.querySelectorAll(".icon");
  const currentTheme = localStorage.getItem("theme");

  // Fonction pour initialiser le thème
  function initializeTheme() {
    if (currentTheme === "dark") {
      setDarkMode();
    } else {
      setLightMode(); // Mode par défaut est clair
    }
  }

  // Initialiser le thème au chargement
  initializeTheme();

  // Gérer le clic sur le bouton de thème
  if (btn) {
    btn.addEventListener("click", function () {
      setTheme();
    });
  }

  // Fonction pour basculer entre les thèmes
  function setTheme() {
    let currentTheme = document.body.getAttribute("theme");
    if (currentTheme === "dark") {
      setLightMode();
    } else {
      setDarkMode();
    }
  }

  // Fonction pour activer le mode sombre
  function setDarkMode() {
    document.body.setAttribute("theme", "dark");
    localStorage.setItem("theme", "dark");

    themeIcons.forEach((icon) => {
      if (icon.hasAttribute("src-dark")) {
        icon.src = icon.getAttribute("src-dark");
      }
    });
  }

  // Fonction pour activer le mode clair
  function setLightMode() {
    document.body.removeAttribute("theme");
    localStorage.setItem("theme", "light");

    themeIcons.forEach((icon) => {
      if (icon.hasAttribute("src-light")) {
        icon.src = icon.getAttribute("src-light");
      }
    });
  }
});

// Défilement fluide pour les ancres
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute("href"));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }

    // Fermer le menu hamburger si ouvert lors d'un clic sur un lien
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    if (menu && menu.classList.contains("open")) {
      menu.classList.remove("open");
      icon.classList.remove("open");
    }
  });
});

// Animation des cartes de projet
document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // N'appliquer l'effet que sur desktop (pas sur tactile)
      if (window.innerWidth > 1024) {
        // Effet d'inclinaison subtil
        this.style.transform = `translateY(-10px)`;
      }
    });

    card.addEventListener("mouseleave", function () {
      // Réinitialiser la transformation
      this.style.transform = "";
    });

    // Animation des tags techniques au survol
    const techTags = card.querySelectorAll(".tech-tag");
    techTags.forEach((tag, index) => {
      tag.style.transitionDelay = `${index * 50}ms`;
    });
  });
});

// Modern contact form validation and feedback
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    // Validation simple côté client
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    let valid = true;
    let errorMsg = "";
    if (!name) {
      valid = false;
      errorMsg = "Veuillez entrer votre nom.";
    } else if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      valid = false;
      errorMsg = "Veuillez entrer un email valide.";
    } else if (!subject) {
      valid = false;
      errorMsg = "Veuillez entrer un sujet.";
    } else if (!message) {
      valid = false;
      errorMsg = "Veuillez entrer un message.";
    }
    if (!valid) {
      e.preventDefault();
      formStatus.textContent = errorMsg;
      formStatus.style.color = "#e74c3c";
      return false;
    } else {
      formStatus.textContent = "Envoi en cours...";
      formStatus.style.color = "#4f8cff";
    }
  });
}

// Affichage du message de succès si redirigé après envoi
if (window.location.hash === "#contact-success") {
  setTimeout(() => {
    const formStatus = document.getElementById("form-status");
    if (formStatus) {
      formStatus.textContent = "Merci, votre message a bien été envoyé !";
      formStatus.style.color = "#27ae60";
    }
    // Scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 300);
}

// Amélioration pour dispositifs mobiles - gestion de la taille réelle de l'écran
function revealOnScroll() {
  const elements = document.querySelectorAll(
    ".project-card, .contact-card, .timeline-item"
  );
  const windowHeight = window.innerHeight;

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      if (!element.classList.contains("active")) {
        element.classList.add("active");
      }
    }
  });
}

// Exécuter lors du défilement pour dispositifs où AOS est désactivé
window.addEventListener("scroll", function () {
  if (window.innerWidth < 768) {
    revealOnScroll();
  }
});

// Initialisation pour les appareils mobiles
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 768) {
    revealOnScroll();
  }

  // Fixer les problèmes d'images brisées
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      // Remplacer par une image par défaut ou cacher
      this.style.display = "none";
    });
  });
});
