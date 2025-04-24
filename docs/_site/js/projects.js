// Function to initialize the main page projects
function initializeMainPage() {
    try {
        // Get the container for featured projects
        const featuredProjectsContainer = document.querySelector('.featured-projects');
        
        if (featuredProjectsContainer) {
            // The projects data will be injected by Jekyll during build
            const projectCards = Array.from(document.querySelectorAll('.project-card'));
            
            if (projectCards.length > 0) {
                console.log('Projects loaded successfully:', projectCards.length);
            } else {
                console.warn('No project cards found');
                featuredProjectsContainer.innerHTML = '<p class="error-message">No projects available.</p>';
            }
        } else {
            console.warn('Featured projects container not found');
        }
    } catch (error) {
        console.error('Error initializing projects:', error);
        const featuredProjectsContainer = document.querySelector('.featured-projects');
        if (featuredProjectsContainer) {
            featuredProjectsContainer.innerHTML = '<p class="error-message">Unable to load projects. Please try again later.</p>';
        }
    }
}

// Function to create a project card element
function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    if (project.featured) {
        card.classList.add('featured');
    }
    
    // Ensure URLs are properly formatted
    const thumbnailUrl = project.thumbnail.startsWith('/') ? project.thumbnail : `/${project.thumbnail}`;
    const projectUrl = project.url.startsWith('/') ? project.url : `/${project.url}`;
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${thumbnailUrl}" alt="${project.title}">
        </div>
        <div class="project-content">
            <h2 class="project-title">
                <a href="${projectUrl}">${project.title}</a>
            </h2>
            <div class="project-meta">
                <time datetime="${project.date}">${formatDate(project.date)}</time>
                ${project.endDate ? '<span class="project-status archived">Archived</span>' : ''}
            </div>
            ${project.summary ? `<p class="project-summary">${project.summary}</p>` : ''}
            ${project.tags ? `
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
            <a href="${projectUrl}" class="project-link">Learn More</a>
        </div>
    `;
    
    return card;
}

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Export the initialization function
export { initializeMainPage }; 