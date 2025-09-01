import { teamData } from './team.js';

export function initializeNavbar() {
    // Get the header element and inject the navbar
    const header = document.querySelector('header');
    if (header) {
        // Initialize dropdown functionality
        initializeDropdowns();
        
        // Initialize hamburger menu
        initializeHamburgerMenu();
        
        // Load previous teams dynamically
        loadPreviousTeams();
    }
}

function initializeHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburgerMenu && navLinks) {
        // Toggle menu when hamburger is clicked
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on nav links
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle window resize - reset menu state on larger screens
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
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