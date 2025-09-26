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

    // Weather: Cartagena, CO using Open-Meteo (no API key)
    (function loadCartagenaWeather() {
        const tempEl = document.getElementById('weather-temp');
        const descEl = document.getElementById('weather-desc');
        const windEl = document.getElementById('weather-wind');
        const humidityEl = document.getElementById('weather-humidity');
        const precipEl = document.getElementById('weather-precip');
        const updatedEl = document.getElementById('weather-updated');

        if (!tempEl || !descEl || !windEl || !humidityEl || !precipEl || !updatedEl) {
            return;
        }

        // Cartagena coordinates
        const latitude = 10.3910;
        const longitude = -75.4794;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto`;

        fetch(url, { cache: 'no-store' })
            .then(r => r.json())
            .then(data => {
                const current = data && data.current ? data.current : null;
                if (!current) throw new Error('No current weather data');

                const temperature = Math.round(current.temperature_2m);
                const humidity = current.relative_humidity_2m;
                const windKmh = Math.round(current.wind_speed_10m);
                const precipitation = current.precipitation ?? 0;
                const code = current.weather_code;
                const time = current.time;

                tempEl.textContent = `${temperature}°C`;
                descEl.textContent = weatherCodeToText(code);
                windEl.textContent = `${windKmh} km/h`;
                humidityEl.textContent = `${humidity}%`;
                precipEl.textContent = `${precipitation} mm`;

                const dt = new Date(time);
                updatedEl.textContent = `Actualizado: ${dt.toLocaleString()}`;
            })
            .catch(() => {
                descEl.textContent = 'No se pudo cargar el clima';
            });

        function weatherCodeToText(code) {
            // Mapping based on WMO weather interpretation codes
            const map = {
                0: 'Despejado',
                1: 'Mayormente despejado', 2: 'Parcialmente nublado', 3: 'Nublado',
                45: 'Niebla', 48: 'Niebla con escarcha',
                51: 'Llovizna ligera', 53: 'Llovizna', 55: 'Llovizna intensa',
                56: 'Llovizna helada ligera', 57: 'Llovizna helada intensa',
                61: 'Lluvia ligera', 63: 'Lluvia', 65: 'Lluvia intensa',
                66: 'Lluvia helada ligera', 67: 'Lluvia helada intensa',
                71: 'Nieve ligera', 73: 'Nieve', 75: 'Nieve intensa',
                77: 'Granos de nieve',
                80: 'Chubascos ligeros', 81: 'Chubascos', 82: 'Chubascos intensos',
                85: 'Chubascos de nieve', 86: 'Chubascos de nieve intensos',
                95: 'Tormenta', 96: 'Tormenta con granizo', 99: 'Tormenta fuerte con granizo'
            };
            return map[code] || 'Condición desconocida';
        }
    })();
}); 