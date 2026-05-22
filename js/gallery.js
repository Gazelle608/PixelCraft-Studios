// Portfolio Gallery Filter  
document.addEventListener('DOMContentLoaded', function() {
    setupPortfolioFilter();
});

function setupPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Check if we're on portfolio page
    if (filterButtons.length === 0) return;
    
    // Add click event to each filter button
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the filter value (all, branding, web, etc.)
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(function(item) {
                const itemCategory = item.getAttribute('data-category');
                
                // Show all items or items matching the filter
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                    // Add fade in animation
                    setTimeout(function() {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // View Details Button for Portfolio Items
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get project data
            const projectId = this.getAttribute('data-project');
            const projectTitle = this.closest('.portfolio-item').querySelector('h3').textContent;
            
            // Create simple modal
            showProjectModal(projectTitle, projectId);
        });
    });
}

function showProjectModal(title, projectId) {
    // Project data - in real site, this could come from a database
    const projects = {
        1: {
            title: "NovaTech Brand Identity",
            description: "Complete brand identity redesign for a tech startup specializing in AI solutions. We created a modern, tech-forward visual identity that communicates innovation and reliability.",
            services: ["Logo Design", "Brand Guidelines", "Business Cards", "Social Media Kit"],
            image: "images/portfolio/brand1.jpg"
        },
        2: {
            title: "Bloom Cosmetics",
            description: "Luxury beauty brand packaging and identity design. We developed an elegant, feminine brand that stands out in the competitive cosmetics market.",
            services: ["Packaging Design", "Brand Identity", "Marketing Materials"],
            image: "images/portfolio/brand2.jpg"
        }
        // Add more projects as needed
    };
    
    const project = projects[projectId] || {
        title: title,
        description: "Project details coming soon!",
        services: ["Design", "Development"],
        image: "images/logo/hero-design.svg"
    };
    
    // Create modal HTML
    const modalHTML = `
        <div class="project-modal" id="projectModal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        ">
            <div style="
                background: white;
                padding: 30px;
                border-radius: 16px;
                max-width: 600px;
                width: 100%;
                position: relative;
                max-height: 90vh;
                overflow-y: auto;
            ">
                <button id="closeModal" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                ">×</button>
                
                <h2 style="color: #6C63FF; margin-bottom: 15px;">${project.title}</h2>
                
                <img src="${project.image}" alt="${project.title}" style="
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                    border-radius: 8px;
                    margin-bottom: 20px;
                ">
                
                <p style="margin-bottom: 20px; line-height: 1.6;">${project.description}</p>
                
                <h3 style="margin-bottom: 10px;">Services Provided:</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
                    ${project.services.map(service => `
                        <span style="
                            background: #6C63FF;
                            color: white;
                            padding: 5px 15px;
                            border-radius: 20px;
                            font-size: 14px;
                        ">${service}</span>
                    `).join('')}
                </div>
                
                <button id="contactAboutProject" style="
                    background: #6C63FF;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    width: 100%;
                    margin-top: 10px;
                ">
                    <i class="fas fa-envelope"></i> Contact About Similar Project
                </button>
            </div>
        </div>
    `;
    
    // Add modal to page
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Close modal functionality
    const closeBtn = document.getElementById('closeModal');
    const modal = document.getElementById('projectModal');
    
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    // Close when clicking outside modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Contact button functionality
    const contactBtn = document.getElementById('contactAboutProject');
    contactBtn.addEventListener('click', function() {
        modal.remove();
        // Redirect to contact page
        window.location.href = 'contact.html';
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal) {
            modal.remove();
        }
    });
}

// Load More Projects Button
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMore');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real site, this would load more projects from a server
            alert('In a real website, this would load more portfolio items from the server.');
            
            // For demo purposes, we'll just disable the button
            this.innerHTML = 'All Projects Loaded';
            this.disabled = true;
            this.style.opacity = '0.5';
        });
    }
}

// Call this in DOMContentLoaded
// setupLoadMore();