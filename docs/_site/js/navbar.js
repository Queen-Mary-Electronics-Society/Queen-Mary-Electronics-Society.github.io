import { teamData } from './team.js';

export function initializeNavbar() {
    // Current team year and Discord server link
    const currentYear = teamData.currentYear;
    const discordUrl = window.siteConfig?.socialMedia?.discord || '#';
    
    const navbarHTML = `
        <nav>
            <div class="logo">
                <a href="/">
                    <img src="/assets/qmul-logo.png" alt="QMES Logo">
                </a>
            </div>
            <div class="nav-links">
                <a href="#" id="nav-join-link" target="_blank" rel="noopener noreferrer">Join</a>
                <a href="/#about">About us</a>
                <a href="/projects.html">Projects</a>
                <div class="dropdown">
                    <button class="dropdown-btn" aria-haspopup="true" aria-expanded="false">
                        Our Team
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="dropdown-content" role="menu">
                        <a href="/team/${currentYear}/" role="menuitem">Current Team</a>
                        <div class="submenu">
                            <button class="submenu-btn" aria-haspopup="true" aria-expanded="false">
                                Previous Teams
                                <i class="fas fa-chevron-right"></i>
                            </button>
                            <div class="submenu-content" role="menu">
                                <!-- Previous teams will be loaded dynamically -->
                            </div>
                        </div>
                    </div>
                </div>
                <a href="/contact.html">Contact us</a>
                <a href="${discordUrl}" id="nav-discord-link" target="_blank" rel="noopener noreferrer" title="Discord">
                    <i class="fab fa-discord"></i>
                </a>
            </div>
        </nav>
    `;
    // Get the header element and inject the navbar
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = navbarHTML;
        
        // Initialize dropdown functionality
        initializeDropdowns();
        
        // Load previous teams dynamically
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
            dropdownBtn.setAttribute('aria-expanded', String(!isExpanded));
            dropdownContent.classList.toggle('show');
        });
        
        // Handle submenu
        const submenuBtn = document.querySelector('.submenu-btn');
        const submenuContent = document.querySelector('.submenu-content');
        
        if (submenuBtn && submenuContent) {
            submenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isExpanded = submenuBtn.getAttribute('aria-expanded') === 'true';
                submenuBtn.setAttribute('aria-expanded', String(!isExpanded));
                submenuContent.classList.toggle('show');
            });
        }
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                dropdownBtn.setAttribute('aria-expanded', 'false');
                dropdownContent.classList.remove('show');
                const submenuBtn2 = document.querySelector('.submenu-btn');
                const submenuContent2 = document.querySelector('.submenu-content');
                if (submenuBtn2 && submenuContent2) {
                    submenuBtn2.setAttribute('aria-expanded', 'false');
                    submenuContent2.classList.remove('show');
                }
            }
        });
    }
}

async function loadPreviousTeams() {
    try {
        // Fetch list of available years directly
        const response = await fetch('/team/years.json');
        if (!response.ok) throw new Error('Failed to fetch team years');
        const years = await response.json();

        const submenuContent = document.querySelector('.submenu-content');
        if (submenuContent) {
            submenuContent.innerHTML = years
                .filter(year => year !== teamData.currentYear)
                .map(year => `<a href="/team/${year}/" role="menuitem">${year.replace('-', '/')}</a>`)
                .join('');
        }
    } catch (error) {
        console.error('Error loading previous teams:', error);
    }
}