// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Navigation functionality
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleMobileMenu();
        this.handleSmoothScroll();
        this.handleActiveLinks();
    }

    handleScroll() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    handleMobileMenu() {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    handleSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll indicator click
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    handleActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Services Carousel
class ServicesCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.service-card');
        this.init();
    }

    init() {
        this.bindEvents();
        this.autoPlay();
    }

    bindEvents() {
        // Pause autoplay on hover
        const carousel = document.querySelector('.services-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carousel.addEventListener('mouseleave', () => this.resumeAutoPlay());
        }
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === this.currentSlide) {
                slide.classList.add('active');
            }
        });

    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlides();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
    }


    autoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    pauseAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }

    resumeAutoPlay() {
        this.autoPlay();
    }
}

// Services Grid with Modal
class ServicesGrid {
    constructor() {
        this.cards = document.querySelectorAll('.service-card');
        this.modal = document.getElementById('serviceModal');
        this.modalBody = document.getElementById('modalBody');
        this.modalClose = document.getElementById('modalClose');
        this.servicesData = this.initServicesData();
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.addHoverEffects();
        this.bindModalEvents();
    }

    initServicesData() {
        return {
            osteopathie: {
                title: "Ostéopathie Équine",
                badge: "Thérapeutique",
                icon: "fas fa-hands",
                description: "L'ostéopathie équine est une approche thérapeutique manuelle qui vise à rétablir l'équilibre et la mobilité du système musculo-squelettique de votre cheval. Par des techniques douces et précises, je traite les dysfonctions articulaires, musculaires et fasciales.",
                duration: "45-60 minutes",
                sections: [
                    {
                        title: "Techniques utilisées",
                        items: [
                            "Diagnostic postural et locomoteur complet",
                            "Manipulations articulaires douces",
                            "Techniques de relâchement myofascial",
                            "Mobilisations passives et actives",
                            "Corrections des déséquilibres biomécaniques"
                        ]
                    },
                    {
                        title: "Indications",
                        items: [
                            "Raideurs et blocages articulaires",
                            "Asymétries posturales",
                            "Troubles locomoteurs",
                            "Préparation et récupération sportive",
                            "Suivi préventif régulier"
                        ]
                    }
                ]
            },
            massage: {
                title: "Massage Thérapeutique",
                badge: "Bien-être",
                icon: "fas fa-spa",
                description: "Le massage thérapeutique équin combine différentes techniques manuelles pour améliorer la circulation sanguine et lymphatique, détendre les tensions musculaires et favoriser la récupération. Une approche personnalisée selon les besoins de chaque cheval.",
                duration: "30-45 minutes",
                sections: [
                    {
                        title: "Types de massage",
                        items: [
                            "Massage relaxant et décontractant",
                            "Drainage lymphatique manuel",
                            "Massage sportif pré et post-effort",
                            "Techniques de trigger points",
                            "Massage circulatoire stimulant"
                        ]
                    },
                    {
                        title: "Bienfaits",
                        items: [
                            "Amélioration de la circulation",
                            "Réduction des tensions musculaires",
                            "Accélération de la récupération",
                            "Détente générale et bien-être",
                            "Prévention des blessures"
                        ]
                    }
                ]
            },
            phytotherapie: {
                title: "Phytothérapie Équine",
                badge: "Naturel",
                icon: "fas fa-leaf",
                description: "La phytothérapie utilise les propriétés thérapeutiques des plantes pour soutenir la santé et le bien-être de votre cheval de manière naturelle. Une approche douce et respectueuse qui complète parfaitement les soins manuels.",
                duration: "Consultation 30 minutes",
                sections: [
                    {
                        title: "Domaines d'application",
                        items: [
                            "Soutien du système digestif",
                            "Renforcement du système immunitaire",
                            "Gestion du stress et de l'anxiété",
                            "Support articulaire et musculaire",
                            "Amélioration de la récupération"
                        ]
                    },
                    {
                        title: "Approche personnalisée",
                        items: [
                            "Bilan de terrain individualisé",
                            "Sélection de plantes adaptées",
                            "Conseils nutritionnels ciblés",
                            "Suivi et ajustements réguliers",
                            "Prévention holistique"
                        ]
                    }
                ]
            },
            acupuncture: {
                title: "Acupuncture Équine",
                badge: "Énergétique",
                icon: "fas fa-yin-yang",
                description: "L'acupuncture équine, issue de la médecine traditionnelle chinoise, vise à rééquilibrer les énergies du corps en stimulant des points spécifiques. Cette technique millénaire favorise l'autoguérison et l'harmonie corps-esprit.",
                duration: "45-60 minutes",
                sections: [
                    {
                        title: "Techniques pratiquées",
                        items: [
                            "Acupuncture traditionnelle aux aiguilles",
                            "Moxibustion (chaleur thérapeutique)",
                            "Acupression et digitopuncture",
                            "Stimulation des méridiens",
                            "Harmonisation énergétique globale"
                        ]
                    },
                    {
                        title: "Indications principales",
                        items: [
                            "Gestion de la douleur chronique",
                            "Troubles digestifs et respiratoires",
                            "Déséquilibres émotionnels",
                            "Amélioration des performances",
                            "Renforcement de la vitalité"
                        ]
                    }
                ]
            },
            bilan: {
                title: "Bilan Complet",
                badge: "Diagnostic",
                icon: "fas fa-clipboard-check",
                description: "Un bilan complet permet d'évaluer l'état général de votre cheval sous tous ses aspects : posture, locomotion, comportement, et bien-être global. Cette évaluation approfondie guide le choix des soins les plus adaptés.",
                duration: "60-90 minutes",
                sections: [
                    {
                        title: "Évaluation complète",
                        items: [
                            "Anamnèse détaillée et historique",
                            "Examen postural statique et dynamique",
                            "Analyse de la locomotion aux trois allures",
                            "Palpation musculo-squelettique complète",
                            "Évaluation comportementale et émotionnelle"
                        ]
                    },
                    {
                        title: "Livrables",
                        items: [
                            "Rapport détaillé avec photos",
                            "Plan de soins personnalisé",
                            "Recommandations d'exercices",
                            "Conseils de prévention",
                            "Suivi et réévaluations programmées"
                        ]
                    }
                ]
            },
            suivi: {
                title: "Suivi Sportif",
                badge: "Performance",
                icon: "fas fa-chart-line",
                description: "Un accompagnement spécialisé pour les chevaux de sport, axé sur l'optimisation des performances, la prévention des blessures et la récupération. Un suivi régulier adapté au calendrier sportif et aux objectifs de chaque couple.",
                duration: "Suivi personnalisé",
                sections: [
                    {
                        title: "Programme personnalisé",
                        items: [
                            "Préparation physique pré-compétition",
                            "Soins de récupération post-effort",
                            "Optimisation de la condition physique",
                            "Prévention active des blessures",
                            "Suivi de l'évolution des performances"
                        ]
                    },
                    {
                        title: "Approche intégrée",
                        items: [
                            "Coordination avec l'équipe technique",
                            "Adaptation selon le calendrier sportif",
                            "Conseils en nutrition et récupération",
                            "Gestion du stress de compétition",
                            "Bilans réguliers et ajustements"
                        ]
                    }
                ]
            }
        };
    }

    bindModalEvents() {
        // Click sur les cartes pour ouvrir le modal
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceType = card.dataset.service;
                this.openModal(serviceType);
            });
        });

        // Fermer le modal
        this.modalClose.addEventListener('click', () => this.closeModal());
        
        // Fermer en cliquant sur l'overlay
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal || e.target.classList.contains('modal-overlay')) {
                this.closeModal();
            }
        });

        // Fermer avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(serviceType) {
        const service = this.servicesData[serviceType];
        if (!service) {
            return;
        }

        // Générer le contenu du modal
        const modalContent = this.generateModalContent(service);
        this.modalBody.innerHTML = modalContent;

        // Afficher le modal avec animation
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animation GSAP
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(this.modal.querySelector('.modal-content'), 
                { 
                    scale: 0.8, 
                    opacity: 0,
                    y: 50
                },
                { 
                    scale: 1, 
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                }
            );
        }
    }

    closeModal() {
        if (typeof gsap !== 'undefined') {
            gsap.to(this.modal.querySelector('.modal-content'), {
                scale: 0.8,
                opacity: 0,
                y: 50,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    this.modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        } else {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    generateModalContent(service) {
        let sectionsHTML = '';
        service.sections.forEach(section => {
            const itemsHTML = section.items.map(item => `<li>${item}</li>`).join('');
            sectionsHTML += `
                <div class="modal-section">
                    <h4>${section.title}</h4>
                    <ul>${itemsHTML}</ul>
                </div>
            `;
        });

        return `
            <div class="modal-header">
                <div class="modal-icon">
                    <i class="${service.icon}"></i>
                </div>
                <div class="modal-title-section">
                    <h2>${service.title}</h2>
                    <div class="modal-badge">${service.badge}</div>
                </div>
            </div>
            <div class="modal-description">
                ${service.description}
            </div>
            ${sectionsHTML}
            <div class="modal-duration">
                <i class="fas fa-clock"></i>
                <span>Durée : ${service.duration}</span>
            </div>
        `;
    }

    initScrollAnimations() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            // Animate service cards on scroll
            gsap.fromTo('.service-card', 
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: '.services-grid',
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Animate service icons
            gsap.fromTo('.service-icon', 
                {
                    scale: 0,
                    rotation: -90
                },
                {
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    delay: 0.3,
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: '.services-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Animate service badges
            gsap.fromTo('.service-badge', 
                {
                    opacity: 0,
                    x: 30
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.services-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Animate service details
            gsap.fromTo('.service-details li', 
                {
                    opacity: 0,
                    x: -20
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.05,
                    delay: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.services-grid',
                        start: 'top 70%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    }

    addHoverEffects() {
        this.cards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });

            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });
        });
    }

    animateCardHover(card, isHover) {
        if (typeof gsap !== 'undefined') {
            const icon = card.querySelector('.service-icon');
            const badge = card.querySelector('.service-badge');
            const details = card.querySelectorAll('.service-details li');
            const duration = card.querySelector('.service-duration');

            if (isHover) {
                // Icon animation
                gsap.to(icon, {
                    scale: 1.1,
                    rotation: 5,
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Badge animation
                gsap.to(badge, {
                    scale: 1.05,
                    y: -2,
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Details animation
                gsap.to(details, {
                    x: 5,
                    duration: 0.3,
                    stagger: 0.02,
                    ease: "power2.out"
                });

                // Duration animation
                gsap.to(duration, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });

            } else {
                // Reset animations
                gsap.to([icon, badge, duration], {
                    scale: 1,
                    rotation: 0,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(details, {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        }
    }
}

// Testimonials Slider
class TestimonialsSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.dots = document.querySelectorAll('.testimonial-dots .dot');
        this.prevBtn = document.getElementById('testimonialPrev');
        this.nextBtn = document.getElementById('testimonialNext');
        this.init();
    }

    init() {
        this.bindEvents();
        this.autoPlay();
    }

    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }


        // Pause autoplay on hover
        const slider = document.querySelector('.testimonials-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => this.pauseAutoPlay());
            slider.addEventListener('mouseleave', () => this.resumeAutoPlay());
        }
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === this.currentSlide) {
                slide.classList.add('active');
            }
        });

    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlides();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
    }


    autoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 6000);
    }

    pauseAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }

    resumeAutoPlay() {
        this.autoPlay();
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.initGSAPAnimations();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
            observer.observe(el);
        });
    }

    initGSAPAnimations() {
        // Hero animations
        gsap.timeline()
            .from('.hero-title .title-line', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: 'power3.out'
            })
            .from('.hero-subtitle', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.5')
            .from('.hero-buttons', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.3')
            .from('.scroll-indicator', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.2');

        // Services section animations
        gsap.fromTo('.service-card', 
            {
                y: 80,
                opacity: 0,
                scale: 0.8
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.services-carousel',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Section titles animation
        gsap.fromTo('.section-title',
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
                    trigger: '.section-title',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Testimonials animation
        gsap.fromTo('.testimonial-slide.active',
            {
                x: 100,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.testimonials',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // About section animation
        gsap.fromTo('.about-text',
            {
                x: -100,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.about-image',
            {
                x: 100,
                opacity: 0,
                scale: 0.8
            },
            {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Expert profile (Mme Thévenin) animations
        // Image card slide-in with slight scale
        gsap.fromTo('.expert-profile .image-wrapper',
            {
                x: -80,
                opacity: 0,
                scale: 0.95
            },
            {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.expert-profile',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Badge pop-in on the image
        gsap.fromTo('.expert-profile .profile-badge',
            {
                y: -20,
                opacity: 0,
                scale: 0.8
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                delay: 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.expert-profile .image-wrapper',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Textual content fade/slide-in
        gsap.fromTo(['.expert-profile .profile-header', '.expert-profile .profile-description', '.expert-profile .profile-cta'],
            {
                y: 40,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.expert-profile .profile-info',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Credentials items stagger-in
        gsap.fromTo('.expert-profile .credential-item',
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
                    trigger: '.expert-profile .credentials-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Parallax effect for hero
        gsap.to('.hero-image', {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // "Une Approche Personnalisée" section animations
        // Header icon animation (pop-in with rotation)
        gsap.fromTo('.services-unified .header-icon',
            {
                scale: 0,
                rotation: -180,
                opacity: 0
            },
            {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.services-unified',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Title fade-in from top
        gsap.fromTo('.services-unified .services-title',
            {
                y: -30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.services-unified',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Description paragraphs stagger-in
        gsap.fromTo('.services-unified .services-description, .services-unified .services-mission',
            {
                y: 20,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                delay: 0.4,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.services-unified',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Category cards slide-in with stagger
        gsap.fromTo('.services-unified .category-card',
            {
                y: 60,
                opacity: 0,
                scale: 0.9
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.services-categories',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Category icons rotation animation
        gsap.fromTo('.services-unified .category-icon',
            {
                rotation: -20,
                scale: 0.8
            },
            {
                rotation: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: '.services-categories',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Services subtitle fade-in
        gsap.fromTo('.services-unified .services-subtitle',
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
                    trigger: '.services-subtitle',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Footer animation
        gsap.fromTo('.footer-section',
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.footer',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Video Modal
class VideoModal {
    constructor() {
        this.init();
    }

    init() {
        const aboutVideoBtn = document.getElementById('aboutVideo');
        if (aboutVideoBtn) {
            aboutVideoBtn.addEventListener('click', () => {
                this.openVideoModal();
            });
        }
    }

    openVideoModal() {
        // Create modal HTML
        const modalHTML = `
            <div class="video-modal" id="videoModal">
                <div class="video-modal-content">
                    <button class="video-modal-close" id="videoModalClose">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="video-container">
                        <iframe 
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                            frameborder="0" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add modal styles
        const modalStyles = `
            <style>
                .video-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    animation: fadeIn 0.3s ease-out forwards;
                }

                .video-modal-content {
                    position: relative;
                    width: 90%;
                    max-width: 800px;
                    aspect-ratio: 16/9;
                    background: #000;
                    border-radius: 10px;
                    overflow: hidden;
                    transform: scale(0.8);
                    animation: scaleIn 0.3s ease-out 0.1s forwards;
                }

                .video-modal-close {
                    position: absolute;
                    top: -50px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    z-index: 10001;
                    transition: transform 0.2s ease;
                }

                .video-modal-close:hover {
                    transform: scale(1.1);
                }

                .video-container {
                    width: 100%;
                    height: 100%;
                }

                .video-container iframe {
                    width: 100%;
                    height: 100%;
                }

                @keyframes fadeIn {
                    to { opacity: 1; }
                }

                @keyframes scaleIn {
                    to { transform: scale(1); }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', modalStyles);

        // Close modal functionality
        const modal = document.getElementById('videoModal');
        const closeBtn = document.getElementById('videoModalClose');

        closeBtn.addEventListener('click', () => {
            this.closeVideoModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeVideoModal();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeVideoModal();
            }
        });
    }

    closeVideoModal() {
        const modal = document.getElementById('videoModal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeScrollEvents();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeScrollEvents() {
        let ticking = false;

        function updateScrollEffects() {
            // Add any scroll-based effects here
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new ServicesGrid();
    new TestimonialsSlider();
    new ScrollAnimations();
    new VideoModal();
    new PerformanceOptimizer();

    // Add loading animation
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    }

    // Add custom cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add cursor styles
    const cursorStyles = `
        <style>
            .custom-cursor {
                position: fixed;
                width: 20px;
                height: 20px;
                background: var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0.7;
                transition: transform 0.1s ease;
                transform: translate(-50%, -50%);
            }

            .custom-cursor.hover {
                transform: translate(-50%, -50%) scale(1.5);
            }

            @media (max-width: 768px) {
                .custom-cursor {
                    display: none;
                }
            }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', cursorStyles);

    // Add hover effects for cursor
    document.querySelectorAll('a, button, .service-card, .testimonial-btn').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
});

// Add CSS for loading animation
const loadingStyles = `
    <style>
        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        }

        .loader::before {
            content: '';
            width: 50px;
            height: 50px;
            border: 3px solid var(--accent-color);
            border-top: 3px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes fadeOut {
            to { opacity: 0; }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', loadingStyles);

// Blog Section Animations
class BlogAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateBlogCards();
        this.animateBlogSection();
    }

    animateBlogCards() {
        // Animate blog cards on scroll
        gsap.fromTo('.blog-card', 
            {
                opacity: 0,
                y: 50,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.15,
                scrollTrigger: {
                    trigger: '.blog-grid',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Hover animations for blog cards
        document.querySelectorAll('.blog-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.blog-image img'), {
                    scale: 1.05,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.blog-image img'), {
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
        });

        // Animate blog links
        document.querySelectorAll('.blog-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link.querySelector('i'), {
                    x: 5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link.querySelector('i'), {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    animateBlogSection() {
        // Animate section header
        gsap.fromTo('.blog-preview .section-header', 
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.blog-preview',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate CTA button
        gsap.fromTo('.blog-cta', 
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.blog-cta',
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Initialize blog animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogAnimations();
});

// Modern Testimonials Animations
class TestimonialsAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateTestimonialCards();
        this.animateStats();
        this.setupHoverEffects();
    }

    animateTestimonialCards() {
        // Animate testimonial cards on scroll
        gsap.fromTo('.testimonial-card', 
            {
                opacity: 0,
                y: 50,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.testimonials-grid',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate section header
        gsap.fromTo('.testimonials-modern .section-header', 
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.testimonials-modern',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    animateStats() {
        // Animate statistics numbers
        const statNumbers = document.querySelectorAll('.testimonials-stats .stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            
            gsap.fromTo(stat, 
                { 
                    textContent: 0 
                },
                {
                    textContent: target,
                    duration: 2,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: '.testimonials-stats',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Animate stats container
        gsap.fromTo('.testimonials-stats', 
            {
                opacity: 0,
                y: 40
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.testimonials-stats',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    setupHoverEffects() {
        // Hover animations for testimonial cards
        document.querySelectorAll('.testimonial-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                // Animate stars on hover
                gsap.to(card.querySelectorAll('.stars-rating i'), {
                    scale: 1.1,
                    duration: 0.2,
                    ease: "power2.out",
                    stagger: 0.05
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                // Reset stars
                gsap.to(card.querySelectorAll('.stars-rating i'), {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out",
                    stagger: 0.05
                });
            });
        });

        // Hover effect for stat items
        document.querySelectorAll('.stat-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item.querySelector('.stat-number'), {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item.querySelector('.stat-number'), {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }
}

// Initialize testimonials animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsAnimations();
});

// Pricing Section Animations
class PricingAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animatePricingCards();
        this.setupHoverEffects();
    }

    animatePricingCards() {
        // Animate section header
        gsap.fromTo('.pricing-section .section-header', 
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.pricing-section',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate pricing cards
        gsap.fromTo('.pricing-card', 
            {
                opacity: 0,
                y: 50,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.pricing-grid',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate pricing note
        gsap.fromTo('.pricing-note', 
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.pricing-note',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    setupHoverEffects() {
        // Hover animations for pricing cards
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                // Animate featured badge if exists
                const badge = card.querySelector('.featured-badge');
                if (badge) {
                    gsap.to(badge, {
                        scale: 1.05,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                // Reset featured badge
                const badge = card.querySelector('.featured-badge');
                if (badge) {
                    gsap.to(badge, {
                        scale: 1,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
            });
        });

        // Hover effect for pricing buttons
        document.querySelectorAll('.pricing-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
    }
}

// Newsletter functionality
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message
            alert(`Merci de vous être abonné avec l'email : ${email}`);
            this.reset();
        });
    }
}

// Newsletter animations
function animateNewsletter() {
    if (document.querySelector('.newsletter-section')) {
        gsap.from('.newsletter-content', {
            scrollTrigger: {
                trigger: '.newsletter-section',
                start: 'top 80%',
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
}

// Service Discover Badges functionality
function initServiceDiscoverBadges() {
    const discoverBadges = document.querySelectorAll('.service-badge.service-discover');
    
    discoverBadges.forEach(badge => {
        badge.addEventListener('click', function(e) {
            // Empêcher la propagation pour éviter le double clic
            e.stopPropagation();
            
            // Trouver la carte de service parente
            const serviceCard = this.closest('.service-card');
            if (serviceCard) {
                // Déclencher le clic sur la carte pour ouvrir le modal
                serviceCard.click();
            }
        });
    });
}

// Navigation Mobile Toggle
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Initialize pricing animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    new PricingAnimations();
    initNewsletter();
    animateNewsletter();
    initServiceDiscoverBadges();
});

