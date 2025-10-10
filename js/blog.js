// Blog JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter articles with animation
            articles.forEach(article => {
                const articleCategory = article.getAttribute('data-category');
                
                if (category === 'all' || articleCategory === category) {
                    article.style.display = 'flex';
                    gsap.fromTo(article, 
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                    );
                } else {
                    gsap.to(article, {
                        opacity: 0,
                        y: -20,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => {
                            article.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            articles.forEach(article => {
                const title = article.querySelector('h3').textContent.toLowerCase();
                const description = article.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    article.style.display = 'flex';
                    gsap.to(article, {
                        opacity: 1,
                        duration: 0.3
                    });
                } else {
                    gsap.to(article, {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                            article.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message (you can customize this)
            alert(`Merci de vous être abonné avec l'email : ${email}`);
            this.reset();
        });
    }
    
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial visibility to ensure text shows
    gsap.set('.blog-hero .hero-title, .blog-hero .hero-subtitle', { 
        opacity: 1,
        visibility: 'visible'
    });
    
    // Hero animations (like index.html)
    gsap.timeline()
        .from('.blog-hero .hero-title', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.blog-hero .hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5');
    
    // Animate featured article
    gsap.set('.featured-article', { opacity: 1, y: 0 });
    gsap.from('.featured-article', {
        scrollTrigger: {
            trigger: '.featured-article',
            start: 'top 80%',
        },
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Animate article cards
    gsap.set('.article-card', { opacity: 1, y: 0 });
    gsap.from('.article-card', {
        scrollTrigger: {
            trigger: '.articles-grid',
            start: 'top 80%',
        },
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Animate filters
    gsap.set('.filter-btn', { opacity: 1, y: 0 });
    gsap.from('.filter-btn', {
        scrollTrigger: {
            trigger: '.blog-filters',
            start: 'top 80%',
        },
        y: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });
    
    // Animate search bar
    gsap.set('.search-wrapper', { opacity: 1, scale: 1 });
    gsap.from('.search-wrapper', {
        scrollTrigger: {
            trigger: '.blog-search',
            start: 'top 80%',
        },
        scale: 0.95,
        duration: 0.5,
        ease: 'back.out(1.7)'
    });
    
    // Animate newsletter section
    gsap.set('.newsletter-content', { opacity: 1, y: 0 });
    gsap.from('.newsletter-content', {
        scrollTrigger: {
            trigger: '.newsletter-section',
            start: 'top 80%',
        },
        y: 20,
        duration: 0.6,
        ease: 'power3.out'
    });
    
    // Pagination functionality
    const pageButtons = document.querySelectorAll('.page-btn:not(:disabled)');
    
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.querySelector('i')) {
                // Remove active from all
                pageButtons.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                this.classList.add('active');
                
                // Scroll to top of articles
                window.scrollTo({
                    top: document.querySelector('.articles-grid').offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hover effects for article cards
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.article-image img'), {
                scale: 1.1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.article-image img'), {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
    
    // Featured article hover effect
    const featuredArticle = document.querySelector('.featured-article');
    
    if (featuredArticle) {
        featuredArticle.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.featured-image img'), {
                scale: 1.1,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
        
        featuredArticle.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.featured-image img'), {
                scale: 1,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    }
    
    // Les liens fonctionnent normalement maintenant
    // Pas besoin d'empêcher le comportement par défaut
    
    // Add loading animation on page load
    window.addEventListener('load', function() {
        gsap.to('body', {
            opacity: 1,
            duration: 0.5
        });
    });
});
