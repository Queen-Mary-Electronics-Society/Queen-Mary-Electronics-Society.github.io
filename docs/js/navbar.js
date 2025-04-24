export function initializeNavbar() {
    // Get the base URL from the config
    const baseUrl = window.siteConfig?.baseUrl || '';
    
    const navbarHTML = `
        <nav>
            <div class="logo">
                <a href="${baseUrl}/index.html">
                    <img src="../assets/qmul-logo.png" alt="QMES Logo">
                </a>
            </div>
            <div class="nav-links">
                <a href="#" id="nav-join-link" target="_blank" rel="noopener noreferrer">Join</a>
                <a href="${baseUrl}/#about">About us</a>
                <a href="${baseUrl}/projects.html">Projects</a>
                <div class="dropdown">
                    <button class="dropdown-btn" aria-expanded="false">
                        Our Team
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="dropdown-content">
                        <a href="${baseUrl}/team.html">Current Team</a>
                        <div class="submenu">
                            <button class="submenu-btn" aria-expanded="false">
                                Previous Teams
                                <i class="fas fa-chevron-right"></i>
                            </button>
                            <div class="submenu-content">
                                <!-- Previous teams will be loaded dynamically -->
                            </div>
                        </div>
                    </div>
                </div>
                <a href="${baseUrl}/contact.html">Contact us</a>
            </div>
        </nav>
    `;

    // Get the header element and inject the navbar
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = navbarHTML;
        
        // Initialize dropdown functionality
        initializeDropdowns();
        
        // Load previous teams
        loadPreviousTeams();
    }
}

function initializeDropdowns() {
    // Handle main dropdown
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (dropdownBtn && dropdownContent) {
        dropdownBtn.addEventListener('click', () => {
            const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
            dropdownBtn.setAttribute('aria-expanded', !isExpanded);
            dropdownContent.classList.toggle('show');
        });
        
        // Handle submenu
        const submenuBtn = document.querySelector('.submenu-btn');
        const submenuContent = document.querySelector('.submenu-content');
        
        if (submenuBtn && submenuContent) {
            submenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isExpanded = submenuBtn.getAttribute('aria-expanded') === 'true';
                submenuBtn.setAttribute('aria-expanded', !isExpanded);
                submenuContent.classList.toggle('show');
            });
        }
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                dropdownBtn.setAttribute('aria-expanded', 'false');
                dropdownContent.classList.remove('show');
                const submenuBtn = document.querySelector('.submenu-btn');
                const submenuContent = document.querySelector('.submenu-content');
                if (submenuBtn && submenuContent) {
                    submenuBtn.setAttribute('aria-expanded', 'false');
                    submenuContent.classList.remove('show');
                }
            }
        });
    }
}

async function loadPreviousTeams() {
    try {
        const response = await fetch('/team/years.json');
        if (!response.ok) throw new Error('Failed to fetch team years');
        const years = await response.json();
        
        const submenuContent = document.querySelector('.submenu-content');
        if (submenuContent) {
            submenuContent.innerHTML = years
                .filter(year => year !== '2024-2025') // Exclude current year
                .map(year => `<a href="/team.html?year=${year}">${year.replace('-', '/')}</a>`)
                .join('');
        }
    } catch (error) {
        console.error('Error loading previous teams:', error);
    }
} 