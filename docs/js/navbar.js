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
                <a href="#about">About us</a>
                <a href="projects.html">Projects</a>
                <a href="contact.html">Contact us</a>
            </div>
        </nav>
    `;

    // Get the header element and inject the navbar
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = navbarHTML;
    }
} 