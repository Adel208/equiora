// FAQ Page Functionality
class FAQManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupCategoryFilters();
        this.setupFAQToggles();
        this.setupAnimations();
    }

    setupCategoryFilters() {
        const categoryBtns = document.querySelectorAll('.faq-category-btn');
        const categories = document.querySelectorAll('.faq-category');

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetCategory = btn.dataset.category;

                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Show/hide categories with animation
                categories.forEach(category => {
                    if (category.dataset.category === targetCategory) {
                        category.style.display = 'block';
                        gsap.fromTo(category, 
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                        );
                    } else {
                        gsap.to(category, {
                            opacity: 0,
                            y: -20,
                            duration: 0.3,
                            ease: "power2.in",
                            onComplete: () => {
                                category.style.display = 'none';
                            }
                        });
                    }
                });

                // Close all open FAQ items when switching categories
                this.closeAllFAQItems();
            });
        });
    }

    setupFAQToggles() {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.closest('.faq-item');
                const faqAnswer = faqItem.querySelector('.faq-answer');
                const isActive = faqItem.classList.contains('active');

                if (isActive) {
                    // Close the FAQ item
                    this.closeFAQItem(faqItem, faqAnswer);
                } else {
                    // Close other open items first
                    this.closeAllFAQItems();
                    // Open this FAQ item
                    this.openFAQItem(faqItem, faqAnswer);
                }
            });
        });
    }

    openFAQItem(faqItem, faqAnswer) {
        faqItem.classList.add('active');
        
        // Animate the answer opening
        gsap.fromTo(faqAnswer, 
            { 
                maxHeight: 0,
                opacity: 0
            },
            { 
                maxHeight: 'auto',
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            }
        );

        // Animate the chevron rotation
        const chevron = faqItem.querySelector('.faq-question i');
        gsap.to(chevron, {
            rotation: 180,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    closeFAQItem(faqItem, faqAnswer) {
        faqItem.classList.remove('active');
        
        // Animate the answer closing
        gsap.to(faqAnswer, {
            maxHeight: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        });

        // Animate the chevron rotation back
        const chevron = faqItem.querySelector('.faq-question i');
        gsap.to(chevron, {
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    closeAllFAQItems() {
        const activeFAQItems = document.querySelectorAll('.faq-item.active');
        
        activeFAQItems.forEach(item => {
            const answer = item.querySelector('.faq-answer');
            this.closeFAQItem(item, answer);
        });
    }

    setupAnimations() {
        // Animate FAQ intro
        gsap.fromTo('.faq-intro', 
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
                    trigger: '.faq-intro',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate category buttons
        gsap.fromTo('.faq-category-btn', 
            {
                opacity: 0,
                y: 20,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.faq-categories',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate FAQ container
        gsap.fromTo('.faq-container', 
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
                    trigger: '.faq-container',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate FAQ items
        gsap.fromTo('.faq-item', 
            {
                opacity: 0,
                x: -30
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.faq-container',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate CTA section
        gsap.fromTo('.faq-cta', 
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
                    trigger: '.faq-cta',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Hover animations for category buttons
        document.querySelectorAll('.faq-category-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                if (!btn.classList.contains('active')) {
                    gsap.to(btn, {
                        scale: 1.05,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
            });

            btn.addEventListener('mouseleave', () => {
                if (!btn.classList.contains('active')) {
                    gsap.to(btn, {
                        scale: 1,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
            });
        });

        // Hover animations for FAQ questions
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('mouseenter', () => {
                gsap.to(question.querySelector('h3'), {
                    color: 'var(--primary-color)',
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            question.addEventListener('mouseleave', () => {
                const faqItem = question.closest('.faq-item');
                if (!faqItem.classList.contains('active')) {
                    gsap.to(question.querySelector('h3'), {
                        color: 'var(--text-dark)',
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
            });
        });
    }
}

// Initialize FAQ functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FAQManager();
});

// Search functionality (optional enhancement)
class FAQSearch {
    constructor() {
        this.createSearchBar();
        this.setupSearch();
    }

    createSearchBar() {
        const searchHTML = `
            <div class="faq-search">
                <div class="search-input-wrapper">
                    <input type="text" id="faq-search" placeholder="Rechercher dans les questions...">
                    <i class="fas fa-search"></i>
                </div>
            </div>
        `;

        const faqCategories = document.querySelector('.faq-categories');
        faqCategories.insertAdjacentHTML('beforebegin', searchHTML);
    }

    setupSearch() {
        const searchInput = document.getElementById('faq-search');
        const faqItems = document.querySelectorAll('.faq-item');

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    gsap.fromTo(item, 
                        { opacity: 0, x: -20 },
                        { opacity: 1, x: 0, duration: 0.3 }
                    );
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        x: -20,
                        duration: 0.2,
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });

            // Show all categories when searching
            if (searchTerm) {
                document.querySelectorAll('.faq-category').forEach(category => {
                    category.style.display = 'block';
                });
            }
        });
    }
}

// Uncomment to enable search functionality
// document.addEventListener('DOMContentLoaded', () => {
//     new FAQSearch();
// });
