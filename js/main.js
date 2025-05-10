document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links (EXCLUDING mailto:)
    const navLinks = document.querySelectorAll('.nav-links a:not([href^="mailto:"])');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for non-mailto links
            if (!this.getAttribute('href').startsWith('mailto:')) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
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
    
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Disable submit button and show sending state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            submitBtn.style.backgroundColor = '#888';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // Show success message
                const formControls = contactForm.querySelectorAll('.form-group, .btn-submit');
                formControls.forEach(control => {
                    control.style.display = 'none';
                });
                
                // Create and show thank you message
                const thankYouMessage = document.createElement('div');
                thankYouMessage.className = 'thank-you-message';
                thankYouMessage.innerHTML = `
                    <h3>¡Gracias ${name}!</h3>
                    <p>Tu mensaje ha sido enviado exitosamente.</p>
                    <button class="btn-submit" id="reset-form">Enviar otro mensaje</button>
                `;
                contactForm.appendChild(thankYouMessage);
                
                // Add event listener to reset form
                document.getElementById('reset-form').addEventListener('click', function() {
                    // Clear form fields
                    contactForm.reset();
                    
                    // Show form controls again
                    formControls.forEach(control => {
                        control.style.display = '';
                    });
                    
                    // Remove thank you message
                    thankYouMessage.remove();
                    
                    // Reset submit button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                });
            }, 1500);
        });
    }
    
    // Add active class to current navigation item
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile optimization - enhance tap targets for iOS
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // Add iOS-specific optimizations if needed
        document.documentElement.classList.add('ios-device');
    }
}); 