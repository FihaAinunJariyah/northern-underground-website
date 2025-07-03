// js/domLoader.js
// This script loads the header and footer HTML into the main document.

document.addEventListener('DOMContentLoaded', () => {
    // Function to load HTML content from an external file
    async function loadHTML(elementId, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const placeholder = document.getElementById(elementId);
            if (placeholder) {
                placeholder.innerHTML = html;
            } else {
                console.warn(`Placeholder element with ID "${elementId}" not found.`);
            }
        } catch (error) {
            console.error(`Could not load ${filePath}:`, error);
        }
    }

    // Load header and footer
    loadHTML('header-placeholder', 'includes/header.html');
    loadHTML('footer-placeholder', 'includes/footer.html');
});