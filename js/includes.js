// Function to load HTML content
async function loadHTML(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

// Function to load all includes
async function loadIncludes() {
    const includes = [
        { id: 'navbar-container', path: 'includes/navbar.html' },
        { id: 'footer-container', path: 'includes/footer.html' },
        { id: 'head-container', path: 'includes/head.html'}
    ];

    // Load all includes simultaneously
    await Promise.all(
        includes.map(include => loadHTML(include.id, include.path))
    );

    // Initialize any JavaScript that depends on the loaded content
    initializeLoadedContent();
}

// Initialize functionality after content is loaded
function initializeLoadedContent() {
    // Re-initialize Bootstrap dropdowns if needed
    if (typeof bootstrap !== 'undefined') {
        const dropdowns = document.querySelectorAll('.dropdown-toggle');
        dropdowns.forEach(dropdown => {
            new bootstrap.Dropdown(dropdown);
        });
    }

    // Re-initialize any other JavaScript functionality
    // that depends on the loaded navbar/footer
}

// Load includes when DOM is ready
document.addEventListener('DOMContentLoaded', loadIncludes);

// Add this to the initializeLoadedContent function
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Call this in initializeLoadedContent
function initializeLoadedContent() {
    // ... existing code ...
    setActiveNavigation();
}