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
  });

  // Ajout d'un gestionnaire pour l'orientation
  window.addEventListener("orientationchange", function () {
    // Forcer le rafraîchissement de la mise en page après changement d'orientation
    setTimeout(function () {
      window.scrollBy(0, 1);
      window.scrollBy(0, -1);
    }, 300);
  });
});

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
  });
});

// Animation des cartes de projet
document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Effet d'inclinaison subtil
      this.style.transform = `translateY(-10px)`;
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

// Formulaire de contact
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Récupération des valeurs du formulaire
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Affichage d'un message de chargement
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Envoi en cours...";
      submitButton.disabled = true;

      // Envoi du formulaire à FormSubmit
      fetch("https://formsubmit.co/ajax/mansourd197@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Merci pour votre message ! Je vous contacterai bientôt.");
            contactForm.reset();
          } else {
            alert("Une erreur s'est produite. Veuillez réessayer.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Une erreur s'est produite. Veuillez réessayer.");
        })
        .finally(() => {
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        });
    });
  }
});

// Révélation des éléments au défilement (alternative à AOS si nécessaire)
function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal");

  for (let i = 0; i < elements.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = elements[i].getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      elements[i].classList.add("active");
    }
  }
}

// Utiliser cette fonction si vous n'utilisez pas AOS
// window.addEventListener('scroll', revealOnScroll);
