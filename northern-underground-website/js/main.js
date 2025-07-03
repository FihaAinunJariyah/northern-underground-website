// js/main.js
// This is the main script that initializes all modules.

import { initTranslation, applyTranslations } from './modules/translation.js';
import { initThemeToggle } from './modules/themeToggle.js';
import { initCart } from './modules/cart.js';
import { initSampleModal } from './modules/sampleModal.js';

// Page-specific modules - only import if needed for performance
// Note: If a module is tiny, it's fine to import globally and check `if (element)` inside.
// For larger modules, conditional imports with dynamic import() are better.
// For now, we'll import and check presence of elements.

import { initProductGallery } from './modules/productGallery.js';
import { initBlogFiltering } from './modules/blogFiltering.js';


document.addEventListener('DOMContentLoaded', () => {
    console.log('Northern Underground Website Scripts Loaded.');

    // Initialize global modules
    initTranslation();
    initThemeToggle();
    initCart();
    initSampleModal();

    // Initialize page-specific modules based on body class or element presence
    // Add these classes to your <body> tag: <body class="page-shop">, <body class="page-blog">
    if (document.body.classList.contains('page-shop')) {
        initProductGallery();
    }
    if (document.body.classList.contains('page-blog')) {
        initBlogFiltering(applyTranslations); // Pass applyTranslations for blog post content
    }
});