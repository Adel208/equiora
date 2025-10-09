// Approche Page Specific JavaScript

// Counter Animation
class CounterAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.observeCounters();
    }

    observeCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
}

// Circular Diagram Animation
class CircularDiagram {
    constructor() {
        this.diagram = document.querySelector('.circular-diagram');
        this.init();
    }

    init() {
        if (!this.diagram) return;
        
        this.setupHoverEffects();
        this.setupScrollAnimation();
    }

    setupHoverEffects() {
        const orbitItems = this.diagram.querySelectorAll('.orbit-item');
        
        orbitItems.forEach((item, index) => {
            const circle = item.querySelector('.orbit-circle');
            
            circle.addEventListener('mouseenter', () => {
                this.highlightItem(item, index);
            });
            
            circle.addEventListener('mouseleave', () => {
                this.resetHighlight();
            });
        });
    }

    highlightItem(item, index) {
        const allItems = this.diagram.querySelectorAll('.orbit-item');
        
        allItems.forEach((otherItem, otherIndex) => {
            if (otherIndex !== index) {
                otherItem.style.opacity = '0.3';
            }
        });
        
        item.style.transform = item.style.transform + ' scale(1.2)';
    }

    resetHighlight() {
        const allItems = this.diagram.querySelectorAll('.orbit-item');
        
        allItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = item.style.transform.replace(' scale(1.2)', '');
        });
    }

    setupScrollAnimation() {
        gsap.fromTo('.orbit-item',
            {
                scale: 0,
                opacity: 0,
                rotation: -180
            },
            {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.circular-diagram',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.center-circle',
            {
                scale: 0,
                opacity: 0
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.circular-diagram',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Timeline Animation
class TimelineAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        // Animate timeline line
        gsap.fromTo('.process-timeline::before',
            {
                scaleY: 0,
                transformOrigin: 'top'
            },
            {
                scaleY: 1,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.process-timeline',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate timeline items
        gsap.fromTo('.timeline-item',
            {
                opacity: 0,
                x: (index) => index % 2 === 0 ? -100 : 100
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.process-timeline',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate timeline markers
        gsap.fromTo('.timeline-marker',
            {
                scale: 0,
                rotation: -180
            },
            {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                stagger: 0.3,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.process-timeline',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Benefits Cards Animation
class BenefitsAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        gsap.fromTo('.benefit-card',
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
                    trigger: '.benefits-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    setupHoverEffects() {
        const cards = document.querySelectorAll('.benefit-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card.querySelector('.benefit-icon'), {
                    rotation: 360,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// Experience Stats Animation
class ExperienceAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        // Animate experience timeline items
        gsap.fromTo('.exp-item',
            {
                x: -50,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.experience-timeline',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate stat cards
        gsap.fromTo('.stat-card',
            {
                y: 50,
                opacity: 0,
                scale: 0.8
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.experience-stats',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Philosophy Points Animation
class PhilosophyAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        gsap.fromTo('.point-item',
            {
                x: -100,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.philosophy-points',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Page-specific scroll effects
class ApprochScrollEffects {
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

        // Lead text
        gsap.fromTo('.lead-text',
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.lead-text',
                    start: 'top 85%',
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

// Interactive Elements
class InteractiveElements {
    constructor() {
        this.init();
    }

    init() {
        this.setupTimelineHovers();
        this.setupCardHovers();
    }

    setupTimelineHovers() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const marker = item.querySelector('.timeline-marker');
            const content = item.querySelector('.timeline-content');
            
            item.addEventListener('mouseenter', () => {
                gsap.to(marker, {
                    scale: 1.2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(content, {
                    y: -10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(marker, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(content, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    setupCardHovers() {
        const cards = document.querySelectorAll('.point-item, .benefit-card, .stat-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to be ready
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all animation classes
    new CounterAnimation();
    new CircularDiagram();
    new TimelineAnimation();
    new BenefitsAnimation();
    new ExperienceAnimation();
    new PhilosophyAnimation();
    new ApprochScrollEffects();
    new InteractiveElements();
    
    // Refresh ScrollTrigger after all animations are set up
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
