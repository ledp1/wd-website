document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Form validation
            if (!formData.name || !formData.email || !formData.message) {
                alert('Por favor complete todos los campos requeridos.');
                return;
            }
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll just show an alert
            alert('¡Gracias por su mensaje! Nos pondremos en contacto pronto.');
            contactForm.reset();
        });
    }
    
    // Mobile optimization - enhance tap targets
    const enhanceTapTargets = () => {
        // Detect if mobile device
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Add more padding to navigation links for better tap targets
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.style.padding = '0.7rem 0.4rem';
            });
            
            // Add touch feedback to buttons and links
            const interactiveElements = document.querySelectorAll('button, .btn-submit, .nav-links a, .social-link');
            
            interactiveElements.forEach(element => {
                element.addEventListener('touchstart', function() {
                    this.style.opacity = '0.7';
                });
                
                element.addEventListener('touchend', function() {
                    this.style.opacity = '1';
                });
            });
            
            // Improve form inputs on mobile
            const formInputs = document.querySelectorAll('input, textarea');
            formInputs.forEach(input => {
                // Auto-capitalization off for email fields
                if (input.type === 'email') {
                    input.setAttribute('autocapitalize', 'off');
                }
                
                // Improve mobile keyboard experience
                if (input.type === 'text') {
                    input.setAttribute('autocomplete', 'name');
                }
                
                // Better spacing for touch input
                input.style.marginBottom = '1rem';
            });
        }
    };
    
    enhanceTapTargets();
}); 