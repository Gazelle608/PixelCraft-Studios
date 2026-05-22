// Services Page JavaScript  
document.addEventListener('DOMContentLoaded', function() {
    setupServiceTabs();
    setupServiceAccordion();
});

// Tab functionality for services
function setupServiceTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get tab ID from data attribute
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            tabPanes.forEach(function(pane) {
                pane.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const activePane = document.getElementById(tabId);
            if (activePane) {
                activePane.classList.add('active');
            }
            
            // Smooth scroll to top of tab content
            if (activePane) {
                activePane.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Accordion for mobile view
function setupServiceAccordion() {
    // Only set up on mobile
    if (window.innerWidth > 768) return;
    
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(function(item) {
        const header = item.querySelector('.service-content h3');
        const content = item.querySelector('.service-content > p, .service-sublist');
        
        if (header && content) {
            // Make header clickable
            header.style.cursor = 'pointer';
            
            // Add click event
            header.addEventListener('click', function() {
                // Toggle active class
                item.classList.toggle('active');
                
                // Show/hide content
                if (item.classList.contains('active')) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
            
            // Hide content initially on mobile
            content.style.display = 'none';
        }
    });
}

// Price calculator for services (simplified)
function setupPriceCalculator() {
    const serviceSelect = document.getElementById('service');
    const budgetSelect = document.getElementById('budget');
    const priceDisplay = document.getElementById('estimatedPrice');
    
    if (serviceSelect && budgetSelect && priceDisplay) {
        function calculatePrice() {
            const service = serviceSelect.value;
            const budget = budgetSelect.value;
            
            let basePrice = 0;
            
            // Base prices for services
            switch(service) {
                case 'branding':
                    basePrice = 2500;
                    break;
                case 'web':
                    basePrice = 4000;
                    break;
                case 'print':
                    basePrice = 1500;
                    break;
                case 'marketing':
                    basePrice = 2000;
                    break;
                case 'illustration':
                    basePrice = 1800;
                    break;
                default:
                    basePrice = 2000;
            }
            
            // Adjust based on budget
            switch(budget) {
                case 'under-1000':
                    basePrice = Math.min(basePrice, 800);
                    break;
                case '1000-3000':
                    basePrice = 2000;
                    break;
                case '3000-5000':
                    basePrice = 4000;
                    break;
                case '5000-10000':
                    basePrice = 7500;
                    break;
                case '10000-plus':
                    basePrice = 12000;
                    break;
            }
            
            // Display price
            priceDisplay.textContent = '$' + basePrice.toLocaleString();
            priceDisplay.style.color = '#6C63FF';
            priceDisplay.style.fontWeight = 'bold';
        }
        
        // Calculate when selections change
        serviceSelect.addEventListener('change', calculatePrice);
        budgetSelect.addEventListener('change', calculatePrice);
        
        // Initial calculation
        calculatePrice();
    }
}

// Call this in DOMContentLoaded if you add the price display element
// setupPriceCalculator();

// Print service list
function printServiceList() {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Services';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: #6C63FF;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        cursor: pointer;
        z-index: 999;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Only add on services page
    if (document.querySelector('.services-overview')) {
        document.body.appendChild(printBtn);
    }
}

// Call this function if you want a print button
// printServiceList();