// Contact Page JavaScript

// Form Validation and Submission
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.successMessage = document.getElementById('successMessage');
        this.formContainer = document.querySelector('.contact-form-container');
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupRealTimeValidation();
        this.setupFormAnimations();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Set minimum date to today
        const dateInput = document.getElementById('preferredDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }
    }

    setupRealTimeValidation() {
        // Email validation
        const emailInput = document.getElementById('email');
        emailInput.addEventListener('input', () => {
            const email = emailInput.value;
            if (email && !this.isValidEmail(email)) {
                this.showFieldError(emailInput, 'Format d\'email invalide');
            } else {
                this.clearFieldError(emailInput);
            }
        });

        // Phone validation
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('input', () => {
            const phone = phoneInput.value;
            if (phone && !this.isValidPhone(phone)) {
                this.showFieldError(phoneInput, 'Format de téléphone invalide');
            } else {
                this.clearFieldError(phoneInput);
            }
        });

        // Name validation
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        
        [firstNameInput, lastNameInput].forEach(input => {
            input.addEventListener('input', () => {
                const value = input.value.trim();
                if (value && value.length < 2) {
                    this.showFieldError(input, 'Minimum 2 caractères');
                } else {
                    this.clearFieldError(input);
                }
            });
        });
    }

    setupFormAnimations() {
        // Animate form fields on scroll
        gsap.fromTo('.form-group',
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.contact-form',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        this.setLoadingState(true);
        
        try {
            // Simulate form submission
            await this.submitForm();
            this.showSuccess();
        } catch (error) {
            this.showError('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            this.setLoadingState(false);
        }
    }

    async submitForm() {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 2000);
        });
    }

    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'Ce champ est obligatoire';
            isValid = false;
        }
        // Email validation
        else if (fieldName === 'email' && value && !this.isValidEmail(value)) {
            errorMessage = 'Format d\'email invalide';
            isValid = false;
        }
        // Phone validation
        else if (fieldName === 'phone' && value && !this.isValidPhone(value)) {
            errorMessage = 'Format de téléphone invalide (ex: 06 12 34 56 78)';
            isValid = false;
        }
        // Name validation
        else if ((fieldName === 'firstName' || fieldName === 'lastName') && value && value.length < 2) {
            errorMessage = 'Minimum 2 caractères';
            isValid = false;
        }
        // Location validation
        else if (fieldName === 'location' && value && value.length < 10) {
            errorMessage = 'Veuillez préciser l\'adresse complète';
            isValid = false;
        }

        if (isValid) {
            this.showFieldSuccess(field);
        } else {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;
        const cleanPhone = phone.replace(/[\s.-]/g, '');
        return phoneRegex.test(cleanPhone);
    }

    showFieldError(field, message) {
        field.classList.remove('success');
        field.classList.add('error');
        
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        // Add shake animation
        field.parentNode.classList.add('error');
        setTimeout(() => {
            field.parentNode.classList.remove('error');
        }, 500);
    }

    showFieldSuccess(field) {
        field.classList.remove('error');
        field.classList.add('success');
        this.clearFieldError(field);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showSuccess() {
        // Hide form and show success message
        gsap.to(this.formContainer, {
            opacity: 0,
            y: -30,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                this.formContainer.style.display = 'none';
                this.successMessage.classList.add('show');
                
                gsap.fromTo(this.successMessage,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
                );
            }
        });
    }

    showError(message) {
        // Show error message (you can customize this)
        alert(message);
    }

    reset() {
        this.form.reset();
        this.form.querySelectorAll('.error, .success').forEach(el => {
            el.classList.remove('error', 'success');
        });
        this.form.querySelectorAll('.form-error.show').forEach(el => {
            el.classList.remove('show');
        });
    }
}

// Interactive Map
class InteractiveMap {
    constructor() {
        this.mapElement = document.getElementById('map');
        this.map = null;
        this.init();
    }

    init() {
        if (!this.mapElement) return;
        
        this.initializeMap();
        this.addMarkers();
        this.addZones();
        this.setupMapAnimations();
    }

    initializeMap() {
        // Center on Normandy region
        const normandyCenter = [49.1829, -0.3707]; // Caen coordinates
        
        this.map = L.map('map', {
            center: normandyCenter,
            zoom: 8,
            zoomControl: false,
            scrollWheelZoom: false
        });

        // Add custom zoom control
        L.control.zoom({
            position: 'bottomright'
        }).addTo(this.map);

        // Add tile layer with custom styling
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);

        // Enable scroll wheel zoom on click
        this.map.on('click', () => {
            this.map.scrollWheelZoom.enable();
        });

        this.map.on('mouseout', () => {
            this.map.scrollWheelZoom.disable();
        });
    }

    addMarkers() {
        const locations = [
            {
                coords: [49.1829, -0.3707],
                title: 'Caen - Zone principale',
                description: 'Centre de la zone d\'intervention'
            },
            {
                coords: [49.4944, 0.1079],
                title: 'Le Havre',
                description: 'Zone d\'intervention étendue'
            },
            {
                coords: [49.4431, -1.0982],
                title: 'Cherbourg',
                description: 'Zone d\'intervention étendue'
            }
        ];

        locations.forEach(location => {
            const marker = L.marker(location.coords, {
                icon: this.createCustomIcon()
            }).addTo(this.map);

            marker.bindPopup(`
                <div style="text-align: center; padding: 10px;">
                    <h4 style="margin: 0 0 5px 0; color: var(--primary-color);">${location.title}</h4>
                    <p style="margin: 0; color: var(--text-muted);">${location.description}</p>
                </div>
            `);
        });
    }

    createCustomIcon() {
        return L.divIcon({
            className: 'custom-marker',
            html: '<i class="fas fa-map-marker-alt" style="color: white; font-size: 16px; margin-top: 3px;"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        });
    }

    addZones() {
        // Add circular zones for pricing
        const center = [49.1829, -0.3707];
        
        // Zone 1: 0-30km (Free)
        L.circle(center, {
            radius: 30000,
            fillColor: '#28a745',
            color: '#28a745',
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.2
        }).addTo(this.map).bindPopup('Zone gratuite (0-30km)');

        // Zone 2: 30-50km (+15€)
        L.circle(center, {
            radius: 50000,
            fillColor: '#ffc107',
            color: '#ffc107',
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.1
        }).addTo(this.map).bindPopup('Zone +15€ (30-50km)');

        // Zone 3: 50km+ (+0.50€/km)
        L.circle(center, {
            radius: 80000,
            fillColor: '#dc3545',
            color: '#dc3545',
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.05
        }).addTo(this.map).bindPopup('Zone +0.50€/km (50km+)');
    }

    setupMapAnimations() {
        // Animate map container on scroll
        gsap.fromTo('.map-container',
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.map-container',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Contact Info Animations
class ContactAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupHeroAnimations();
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    setupHeroAnimations() {
        // Set initial visibility to ensure text shows
        gsap.set('.hero-contact .hero-title, .hero-contact .hero-subtitle', { 
            opacity: 1,
            visibility: 'visible'
        });
        
        // Hero content animations (like index.html)
        gsap.timeline()
            .from('.hero-contact .hero-title', {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            })
            .from('.hero-contact .hero-subtitle', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.5');
    }

    setupScrollAnimations() {
        // Info cards animation
        gsap.fromTo('.info-card',
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.contact-info-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // FAQ cards animation
        gsap.fromTo('.faq-card',
            {
                y: 50,
                opacity: 0,
                scale: 0.9
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.faq-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Emergency section animation
        gsap.fromTo('.emergency-content',
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.emergency-contact',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    setupHoverEffects() {
        // Info card hover effects
        const infoCards = document.querySelectorAll('.info-card');
        infoCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card.querySelector('.info-icon'), {
                    scale: 1.1,
                    rotation: 5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card.querySelector('.info-icon'), {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // FAQ card hover effects
        const faqCards = document.querySelectorAll('.faq-card');
        faqCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card.querySelector('.faq-icon'), {
                    scale: 1.1,
                    y: -5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card.querySelector('.faq-icon'), {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// Form Auto-completion
class FormAutoComplete {
    constructor() {
        this.init();
    }

    init() {
        this.setupLocationAutocomplete();
        this.setupServiceDependencies();
    }

    setupLocationAutocomplete() {
        const locationInput = document.getElementById('location');
        if (!locationInput) return;

        // Simple autocomplete for common locations in Normandy
        const normandyLocations = [
            'Caen, Calvados',
            'Le Havre, Seine-Maritime',
            'Rouen, Seine-Maritime',
            'Cherbourg-en-Cotentin, Manche',
            'Alençon, Orne',
            'Bayeux, Calvados',
            'Lisieux, Calvados',
            'Évreux, Eure',
            'Dieppe, Seine-Maritime',
            'Granville, Manche'
        ];

        locationInput.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            if (value.length < 2) return;

            const suggestions = normandyLocations.filter(location =>
                location.toLowerCase().includes(value)
            );

            this.showSuggestions(locationInput, suggestions);
        });
    }

    showSuggestions(input, suggestions) {
        // Remove existing suggestions
        const existingSuggestions = document.querySelector('.location-suggestions');
        if (existingSuggestions) {
            existingSuggestions.remove();
        }

        if (suggestions.length === 0) return;

        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'location-suggestions';
        suggestionsDiv.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 2px solid var(--primary-color);
            border-top: none;
            border-radius: 0 0 12px 12px;
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        `;

        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = suggestion;
            suggestionItem.style.cssText = `
                padding: 0.75rem 1rem;
                cursor: pointer;
                border-bottom: 1px solid #eee;
                transition: background-color 0.2s;
            `;

            suggestionItem.addEventListener('mouseenter', () => {
                suggestionItem.style.backgroundColor = 'var(--background-light)';
            });

            suggestionItem.addEventListener('mouseleave', () => {
                suggestionItem.style.backgroundColor = 'white';
            });

            suggestionItem.addEventListener('click', () => {
                input.value = suggestion;
                suggestionsDiv.remove();
            });

            suggestionsDiv.appendChild(suggestionItem);
        });

        input.parentNode.style.position = 'relative';
        input.parentNode.appendChild(suggestionsDiv);

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !suggestionsDiv.contains(e.target)) {
                suggestionsDiv.remove();
            }
        }, { once: true });
    }

    setupServiceDependencies() {
        const serviceSelect = document.getElementById('service');
        const urgencySelect = document.getElementById('urgency');

        serviceSelect.addEventListener('change', (e) => {
            const service = e.target.value;
            
            // Update urgency options based on service
            if (service === 'bilan' || service === 'suivi-sportif') {
                // These services typically don't need emergency options
                urgencySelect.innerHTML = `
                    <option value="normal">Rendez-vous normal</option>
                    <option value="urgent">Urgent (sous 48h)</option>
                `;
            } else {
                // Restore all options
                urgencySelect.innerHTML = `
                    <option value="normal">Rendez-vous normal</option>
                    <option value="urgent">Urgent (sous 48h)</option>
                    <option value="emergency">Urgence (sous 24h)</option>
                `;
            }
        });
    }
}

// Global function to reset form
function resetForm() {
    const contactForm = window.contactFormInstance;
    if (contactForm) {
        contactForm.reset();
        
        // Hide success message and show form
        const successMessage = document.getElementById('successMessage');
        const formContainer = document.querySelector('.contact-form-container');
        
        gsap.to(successMessage, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                successMessage.classList.remove('show');
                formContainer.style.display = 'block';
                
                gsap.fromTo(formContainer,
                    { opacity: 0, y: -30 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
                );
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to be ready
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all components
    window.contactFormInstance = new ContactForm();
    new InteractiveMap();
    new ContactAnimations();
    new FormAutoComplete();
    
    // Refresh ScrollTrigger after all animations are set up
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
