export function initializeNavbar() {
    const navbarHTML = `
        <nav>
            <div class="logo">
                <a href="index.html">
                    <img src="../assets/qmul-logo.png" alt="QMES Logo">
                </a>
            </div>
            <div class="nav-links">
                <a href="#" id="nav-join-link" target="_blank" rel="noopener noreferrer">Join</a>
                <a href="#" id="nav-about-link">About us</a>
                <a href="projects.html">Projects</a>
                <a href="contact.html">Contact us</a>
            </div>
        </nav>
    `;

    // Get the header element and inject the navbar
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = navbarHTML;
        
        // Add click handler for About us link
        const aboutLink = document.getElementById('nav-about-link');
        if (aboutLink) {
            aboutLink.addEventListener('click', (e) => {
                e.preventDefault();
                // Get the current URL path
                const currentPath = window.location.pathname;
                // Check if we're in a subpage
                if (currentPath.includes('/projects.html') || currentPath.includes('/contact.html')) {
                    // Navigate to index.html in the same directory
                    window.location.href = './index.html#about';
                } else {
                    // If we're already on index.html or in a different context
                    window.location.href = 'index.html#about';
                }
                window.location.href = 'index.html#about';
            });
        }
    }
} 