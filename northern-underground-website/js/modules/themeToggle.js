// js/modules/themeToggle.js

function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme) {
        document.body.classList.toggle('dark-mode', theme === 'dark');
        themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙'; // Icon
    }

    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(prefersDarkMode.matches ? 'dark' : 'light');
    }

    // Listen for changes in system preference
    prefersDarkMode.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) { // Only apply if no theme is explicitly saved
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}

export { initThemeToggle };