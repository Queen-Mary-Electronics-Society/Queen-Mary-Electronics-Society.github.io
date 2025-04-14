// Function to load project data
async function loadProject(projectId) {
    try {
        const response = await fetch(`/src/projects/${projectId}.json`);
        if (!response.ok) {
            console.error(`Failed to load project ${projectId}:`, response.status, response.statusText);
            throw new Error('Project not found');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading project:', error);
        return null;
    }
}

// Function to load all projects
async function loadAllProjects() {
    // This could be replaced with a projects index file in the future
    const projectIds = [
        'line-follower-robots',
        'arduino-workshop',
        'robotic-arm',
        'drone-building',
        'smart-greenhouse'
    ];
    
    const projects = await Promise.all(
        projectIds.map(async id => {
            const project = await loadProject(id);
            return project;
        })
    );

    const loadedProjects = projects.filter(project => project !== null);
    console.log('Loaded projects:', loadedProjects); // Debug log
    return loadedProjects;
}

// Function to render project preview (for main page and projects list)
function renderProjectPreview(project) {
    const isOngoing = !project.endDate; // If no end date is specified, project is ongoing
    return `
        <div class="project-card" data-project-id="${project.id}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p class="project-date">${project.date}${isOngoing ? ' - <span class="ongoing">ongoing</span>' : ''}</p>
                <p>${project.summary}</p>
                <a href="projects.html?project=${project.id}" class="learn-more">Learn More</a>
            </div>
            <div class="project-image">
                <img src="${project.thumbnail}" alt="${project.title}">
            </div>
        </div>
    `;
}

// Function to render full project page
function renderProjectPage(project) {
    const sectionsHtml = project.content.sections.map(section => `
        <section class="project-section">
            <h2>${section.title}</h2>
            <div class="section-content">
                <p>${section.content}</p>
                ${section.image ? `
                    <div class="section-image">
                        <img src="${section.image}" alt="${section.imageDescription}">
                        <p class="image-description">${section.imageDescription}</p>
                    </div>
                ` : ''}
            </div>
        </section>
    `).join('');

    return `
        <article class="project-full">
            <div class="project-introduction">
                ${project.content.introduction}
            </div>
            <div class="project-content">
                ${sectionsHtml}
            </div>
            <footer class="project-footer">
                <div class="tags">
                    ${project.content.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </footer>
        </article>
    `;
}

// Initialize projects on the main page
async function initializeMainPage() {
    const projects = await loadAllProjects();
    const featuredProjects = projects.filter(p => p.featured).slice(0, 7);
    const container = document.querySelector('.featured-projects');
    if (container) {
        container.innerHTML = featuredProjects.map(renderProjectPreview).join('');
    }
}

// Initialize projects list page
async function initializeProjectsPage() {
    const projects = await loadAllProjects();
    const container = document.querySelector('.projects-list');
    if (container) {
        container.innerHTML = projects.map(renderProjectPreview).join('');
    }
}

// Initialize single project page
async function initializeProjectPage(projectId) {
    const project = await loadProject(projectId);
    if (project) {
        // Update the title section
        const titleSection = document.querySelector('.project-title-section');
        if (titleSection) {
            titleSection.innerHTML = `
                <h1>${project.title}</h1>
                <div class="project-meta">
                    <span class="date">${project.date}</span>
                    <span class="author">by ${project.author}</span>
                </div>
            `;
        }

        // Update the content container
        const container = document.querySelector('.project-container');
        if (container) {
            container.innerHTML = renderProjectPage(project);
        }
    }
}

// Export functions for use in other files
export {
    loadProject,
    loadAllProjects,
    initializeMainPage,
    initializeProjectsPage,
    initializeProjectPage
}; 