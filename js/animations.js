// Simple Animations  
document.addEventListener('DOMContentLoaded', function() {
    setupAnimations();
    setupScrollAnimations();
});

function setupAnimations() {
    // Animate elements when they appear in view
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .value-card');
    
    // Create Intersection Observer for simple animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(function(element) {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(function(element) {
            element.classList.add('animate-fade-in');
        });
    }
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.12)';
        });
    });
    
    // Animate floating shapes (if they exist)
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(function(shape, index) {
        // Add animation delay
        shape.style.animationDelay = (index * 2) + 's';
    });
}

function setupScrollAnimations() {
    // Simple scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.id = 'scrollProgress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: #6C63FF;
        width: 0%;
        z-index: 1001;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress bar on scroll
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // Animate page header on scroll
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (pageHeader) {
                pageHeader.style.backgroundPosition = 'center ' + (rate + 50) + 'px';
            }
        });
    }
    
    // Simple parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            // Move background slower than foreground
            heroSection.style.transform = 'translateY(' + rate + 'px)';
        });
    }
}

// Simple counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(function(counter) {
        const target = parseInt(counter.textContent);
        let count = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        
        const updateCounter = function() {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count) + '+';
                setTimeout(updateCounter, duration / 100);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
}

// Call this function when needed
// animateCounters();

// Simple typing effect for hero text
function typeWriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && heroTitle.textContent.includes('Crafting Digital')) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Call this function when needed
// typeWriterEffect();