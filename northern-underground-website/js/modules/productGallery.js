// js/modules/productGallery.js

function initProductGallery() {
    const mainProductImage = document.getElementById('main-product-image');
    const thumbnailsContainer = document.querySelector('.product-gallery .thumbnails');

    if (!mainProductImage || !thumbnailsContainer) {
        // console.warn("Product gallery elements not found. Skipping product gallery initialization.");
        return;
    }

    const thumbnails = thumbnailsContainer.querySelectorAll('img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to the clicked thumbnail
            thumbnail.classList.add('active');

            // Change the main image source
            mainProductImage.src = thumbnail.dataset.full;
        });
    });

    // Set the first thumbnail as active by default if not already set
    if (thumbnails.length > 0 && !thumbnailsContainer.querySelector('.active')) {
        thumbnails[0].classList.add('active');
    }
}

export { initProductGallery };