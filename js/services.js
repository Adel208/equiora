// Simple Badges Filter System
class SimpleBadgesFilter {
    constructor() {
        this.badgeButtons = document.querySelectorAll('.category-badge');
        this.serviceCards = document.querySelectorAll('.service-card-detailed');
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupAnimations();
    }

    bindEvents() {
        this.badgeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.closest('.category-badge').getAttribute('data-category');
                this.filterServices(category);
                this.updateActiveButton(e.target.closest('.category-badge'));
            });
        });
    }

    filterServices(category) {
        this.currentFilter = category;

        this.serviceCards.forEach(card => {
            card.classList.add('filtering');

            setTimeout(() => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hidden', 'filtering');
                    card.classList.add('show');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('show', 'filtering');
                }
            }, 150);
        });

        // Trigger layout recalculation
        setTimeout(() => {
            this.serviceCards.forEach(card => {
                card.classList.remove('filtering', 'show');
            });
        }, 600);
    }

    updateActiveButton(activeBtn) {
        this.badgeButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    setupAnimations() {
        // Simple fade-in animation for badges
        gsap.fromTo('.category-badge',
            {
                y: 20,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.badges-container',
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}
class ServiceFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.serviceCards = document.querySelectorAll('.service-card-detailed');
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupInitialAnimations();
    }

    bindEvents() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterServices(category);
                this.updateActiveButton(e.target);
            });
        });
    }

    filterServices(category) {
        this.currentFilter = category;
        
        this.serviceCards.forEach(card => {
            card.classList.add('filtering');
            
            setTimeout(() => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hidden', 'filtering');
                    card.classList.add('show');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('show', 'filtering');
                }
            }, 200);
        });

        // Trigger layout recalculation
        setTimeout(() => {
            this.serviceCards.forEach(card => {
                card.classList.remove('filtering', 'show');
            });
        }, 800);
    }

    updateActiveButton(activeBtn) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    setupInitialAnimations() {
        gsap.fromTo('.service-card-detailed',
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
                    trigger: '.services-container',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Service Modal System
class ServiceModal {
    constructor() {
        this.modal = document.getElementById('serviceModal');
        this.modalBody = document.getElementById('modalBody');
        this.closeBtn = document.getElementById('modalClose');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(serviceId) {
        const serviceData = this.getServiceData(serviceId);
        this.renderModalContent(serviceData);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    getServiceData(serviceId) {
        const services = {
            'osteopathie': {
                title: 'Ostéopathie Équine',
                image: 'https://images.unsplash.com/photo-1574263867128-6b4e64b3e8e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                description: 'L\'ostéopathie équine est une approche thérapeutique manuelle qui vise à rétablir l\'équilibre et la mobilité du système musculo-squelettique du cheval.',
                benefits: [
                    'Amélioration de la mobilité articulaire',
                    'Réduction des tensions musculaires',
                    'Optimisation des performances',
                    'Prévention des blessures',
                    'Amélioration du bien-être général'
                ],
                process: [
                    'Anamnèse complète et observation du cheval',
                    'Examen palpatoire des structures',
                    'Tests de mobilité articulaire',
                    'Techniques de correction manuelle',
                    'Conseils post-traitement'
                ],
                duration: '60-90 minutes',
                price: 'À partir de 80€',
                indications: [
                    'Raideurs articulaires',
                    'Asymétries posturales',
                    'Baisse de performance',
                    'Récupération post-effort',
                    'Entretien préventif'
                ]
            },
            'massage': {
                title: 'Massage Thérapeutique',
                image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                description: 'Le massage thérapeutique équin favorise la détente musculaire, améliore la circulation et contribue au bien-être général de l\'animal.',
                benefits: [
                    'Relaxation musculaire profonde',
                    'Amélioration de la circulation',
                    'Réduction du stress',
                    'Accélération de la récupération',
                    'Renforcement du lien homme-cheval'
                ],
                process: [
                    'Évaluation de l\'état musculaire',
                    'Techniques de massage adaptées',
                    'Drainage lymphatique si nécessaire',
                    'Étirements passifs',
                    'Conseils d\'entretien'
                ],
                duration: '45-60 minutes',
                price: 'À partir de 60€',
                indications: [
                    'Tensions musculaires',
                    'Fatigue après l\'effort',
                    'Stress et nervosité',
                    'Préparation à l\'effort',
                    'Détente générale'
                ]
            },
            'phytotherapie': {
                title: 'Phytothérapie',
                image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                description: 'La phytothérapie utilise les propriétés thérapeutiques des plantes pour soutenir la santé et le bien-être naturel du cheval.',
                benefits: [
                    'Approche naturelle et douce',
                    'Renforcement du système immunitaire',
                    'Soutien des fonctions organiques',
                    'Prévention des déséquilibres',
                    'Complémentarité avec autres soins'
                ],
                process: [
                    'Bilan de santé global',
                    'Sélection des plantes appropriées',
                    'Préparation personnalisée',
                    'Conseils d\'administration',
                    'Suivi et ajustements'
                ],
                duration: '30-45 minutes',
                price: 'À partir de 45€',
                indications: [
                    'Soutien immunitaire',
                    'Troubles digestifs légers',
                    'Stress et anxiété',
                    'Fatigue chronique',
                    'Prévention saisonnière'
                ]
            },
            'acupuncture': {
                title: 'Acupuncture',
                image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                description: 'L\'acupuncture équine stimule les points énergétiques pour rétablir l\'équilibre et soulager diverses affections.',
                benefits: [
                    'Rééquilibrage énergétique',
                    'Soulagement de la douleur',
                    'Amélioration de la circulation',
                    'Stimulation des défenses naturelles',
                    'Harmonisation générale'
                ],
                process: [
                    'Diagnostic énergétique',
                    'Sélection des points d\'acupuncture',
                    'Pose des aiguilles stériles',
                    'Stimulation appropriée',
                    'Conseils de suivi'
                ],
                duration: '45-75 minutes',
                price: 'À partir de 70€',
                indications: [
                    'Douleurs chroniques',
                    'Troubles fonctionnels',
                    'Déséquilibres énergétiques',
                    'Soutien immunitaire',
                    'Optimisation du bien-être'
                ]
            },
            'bilan': {
                title: 'Bilan de Santé Complet',
                image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                description: 'Un examen approfondi pour évaluer l\'état de santé global de votre cheval et établir un plan de soins personnalisé.',
                benefits: [
                    'Évaluation complète de la santé',
                    'Détection précoce des déséquilibres',
                    'Plan de soins personnalisé',
                    'Conseils préventifs',
                    'Suivi à long terme'
                ],
                process: [
                    'Anamnèse détaillée',
                    'Examen physique complet',
                    'Tests de mobilité',
                    'Évaluation posturale',
                    'Rapport et recommandations'
                ],
                duration: '90-120 minutes',
                price: 'À partir de 120€',
                indications: [
                    'Bilan de santé annuel',
                    'Nouveau cheval',
                    'Changement de comportement',
                    'Baisse de performance',
                    'Prévention ciblée'
                ]
            },
            'suivi-sportif': {
                title: 'Suivi Sportif',
                image: 'https://images.unsplash.com/photo-1553284966-19b8815c7817?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                description: 'Un accompagnement spécialisé pour optimiser les performances et la récupération des chevaux de sport.',
                benefits: [
                    'Optimisation des performances',
                    'Prévention des blessures',
                    'Récupération accélérée',
                    'Suivi personnalisé',
                    'Conseils d\'entraînement'
                ],
                process: [
                    'Évaluation des besoins sportifs',
                    'Plan de suivi adapté',
                    'Soins pré et post-effort',
                    'Monitoring des performances',
                    'Ajustements réguliers'
                ],
                duration: 'Variable selon les besoins',
                price: 'Sur devis personnalisé',
                indications: [
                    'Chevaux de compétition',
                    'Préparation aux épreuves',
                    'Récupération post-compétition',
                    'Optimisation des performances',
                    'Prévention spécialisée'
                ]
            }
        };

        return services[serviceId] || services['osteopathie'];
    }

    renderModalContent(data) {
        this.modalBody.innerHTML = `
            <div class="modal-header">
                <img src="${data.image}" alt="${data.title}" class="modal-image">
                <h2 class="modal-title">${data.title}</h2>
                <p class="modal-description">${data.description}</p>
            </div>
            
            <div class="modal-sections">
                <div class="modal-section">
                    <h3><i class="fas fa-heart"></i> Bienfaits</h3>
                    <ul class="modal-list">
                        ${data.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-cogs"></i> Déroulement</h3>
                    <ol class="modal-process">
                        ${data.process.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-info-circle"></i> Indications</h3>
                    <ul class="modal-list">
                        ${data.indications.map(indication => `<li>${indication}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-details">
                    <div class="detail-card">
                        <i class="fas fa-clock"></i>
                        <div>
                            <h4>Durée</h4>
                            <p>${data.duration}</p>
                        </div>
                    </div>
                    <div class="detail-card">
                        <i class="fas fa-euro-sign"></i>
                        <div>
                            <h4>Tarif</h4>
                            <p>${data.price}</p>
                        </div>
                    </div>
                </div>
                
                <div class="modal-cta">
                    <a href="contact.html" class="btn btn-primary">
                        <span>Prendre Rendez-vous</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;

        // Add modal-specific styles
        this.addModalStyles();
    }

    addModalStyles() {
        if (!document.getElementById('modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'modal-styles';
            styles.textContent = `
                .modal-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                
                .modal-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-radius: 15px;
                    margin-bottom: 1.5rem;
                }
                
                .modal-title {
                    font-family: var(--font-heading);
                    font-size: 2rem;
                    color: var(--primary-color);
                    margin-bottom: 1rem;
                }
                
                .modal-description {
                    color: var(--text-muted);
                    font-size: 1.1rem;
                    line-height: 1.6;
                }
                
                .modal-sections {
                    display: grid;
                    gap: 2rem;
                }
                
                .modal-section h3 {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    margin-bottom: 1rem;
                    font-size: 1.2rem;
                }
                
                .modal-section h3 i {
                    color: var(--accent-color);
                }
                
                .modal-list, .modal-process {
                    padding-left: 1.5rem;
                }
                
                .modal-list li, .modal-process li {
                    margin-bottom: 0.5rem;
                    color: var(--text-muted);
                    line-height: 1.5;
                }
                
                .modal-details {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin: 2rem 0;
                }
                
                .detail-card {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.5rem;
                    background: var(--background-light);
                    border-radius: 15px;
                }
                
                .detail-card i {
                    font-size: 1.5rem;
                    color: var(--primary-color);
                }
                
                .detail-card h4 {
                    margin: 0 0 0.25rem 0;
                    color: var(--primary-color);
                }
                
                .detail-card p {
                    margin: 0;
                    color: var(--text-muted);
                }
                
                .modal-cta {
                    text-align: center;
                    margin-top: 2rem;
                    padding-top: 2rem;
                    border-top: 1px solid #eee;
                }
                
                @media (max-width: 768px) {
                    .modal-details {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }
}

// FAQ System
class FAQSystem {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupAnimations();
    }

    bindEvents() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                this.toggleFAQ(item);
            });
        });
    }

    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        this.faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current FAQ
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    }

    setupAnimations() {
        gsap.fromTo('.faq-item',
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.faq-container',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Pricing Animation
class PricingAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        gsap.fromTo('.pricing-card',
            {
                y: 80,
                opacity: 0,
                scale: 0.9
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.pricing-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    setupHoverEffects() {
        const cards = document.querySelectorAll('.pricing-card:not(.featured)');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// Page Scroll Effects
class ServicesScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupParallaxEffects();
        this.setupRevealAnimations();
    }

    setupParallaxEffects() {
        // Hero parallax
        gsap.to('.hero-background img', {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.page-hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    setupRevealAnimations() {
        // Section titles
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

        // Filter buttons
        gsap.fromTo('.filter-btn',
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
                    trigger: '.categories-filter',
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // CTA section
        gsap.fromTo('.cta-content',
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.cta-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Global function for opening service modals
function openServiceModal(serviceId) {
    if (window.serviceModal) {
        window.serviceModal.openModal(serviceId);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to be ready
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all components
    window.serviceFilter = new ServiceFilter();
    window.serviceModal = new ServiceModal();
    new SimpleBadgesFilter();
    new FAQSystem();
    new PricingAnimation();
    new ServicesScrollEffects();
    
    // Refresh ScrollTrigger after all animations are set up
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
