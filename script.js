// Script pour gérer la navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Script pour le formulaire de contact
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Ici, vous implémenteriez l'envoi du formulaire via AJAX ou un service tiers
    console.log('Formulaire soumis:', { name, email, subject, message });
    
    // Réinitialiser le formulaire après soumission
    this.reset();
    
    // Afficher un message de confirmation
    alert('Merci pour votre message! Je vous répondrai dès que possible.');
});

// Animation au défilement (nécessite l'ajout de classes dans le HTML)
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Ajoutez des animations basées sur la position de défilement
    document.querySelectorAll('.section-padding').forEach(section => {
        if (scrollPosition > (section.offsetTop - window.innerHeight / 1.5)) {
            section.classList.add('visible');
        }
    });
});

// Navigation active en fonction de la section visible
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar ul li a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});
