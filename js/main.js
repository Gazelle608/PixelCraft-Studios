// Wait for the page to fully load  
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Mobile Navigation Toggle
    setupMobileMenu();
    
    // 2. Smooth Scrolling for Links
    setupSmoothScroll();
    
    // 3. Current Year in Footer
    updateFooterYear();
    
    // 4. Contact Form Handler
    setupContactForm();
    
    // 5. FAQ Toggle
    setupFAQ();
});

// 1. Mobile Menu Toggle
function setupMobileMenu() {
    const menuButton = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', function() {
            // Toggle the menu visibility
            navMenu.classList.toggle('active');
            
            // Change hamburger to X icon
            const icon = menuButton.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuButton.querySelector('i').classList.remove('fa-times');
                menuButton.querySelector('i').classList.add('fa-bars');
            });
        });
    }
}

// 2. Smooth Scrolling for Anchor Links
function setupSmoothScroll() {
    // Get all links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Stop normal link behavior
            
            // Get the target element ID
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to the element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 3. Update Current Year in Footer
function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// 4. Simple Contact Form Handler
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop form from reloading page
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending form data (in real site, this would go to a server)
            setTimeout(function() {
                // Show success message
                const successDiv = document.getElementById('formSuccess');
                if (successDiv) {
                    successDiv.style.display = 'block';
                } else {
                    alert('Thank you! Your message has been sent.');
                }
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll to success message
                if (successDiv) {
                    successDiv.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1500); // 1.5 second delay to simulate sending
        });
    }
}

// 5. FAQ Toggle Functionality
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            // Toggle active class on the FAQ item
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
            
            // Change the plus/minus sign
            const toggleIcon = this.querySelector('.faq-toggle');
            if (faqItem.classList.contains('active')) {
                toggleIcon.textContent = '−'; // Minus sign
            } else {
                toggleIcon.textContent = '+'; // Plus sign
            }
        });
    });
}

// 6. Simple Back to Top Button
function createBackToTopButton() {
    // Create the button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.id = 'backToTop';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: #6C63FF;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    // Add to page
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Call this function in DOMContentLoaded
// createBackToTopButton();