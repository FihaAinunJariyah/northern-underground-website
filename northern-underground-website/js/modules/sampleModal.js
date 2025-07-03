// js/modules/sampleModal.js

function initSampleModal() {
    const openModalBtn = document.getElementById('open-modal-btn');
    const modal = document.getElementById('sample-modal');
    const closeButton = document.querySelector('.modal .close-button');
    const sampleForm = document.getElementById('sample-form');
    const sampleFormMessage = document.getElementById('sample-form-message');

    if (!modal || !openModalBtn || !closeButton || !sampleForm || !sampleFormMessage) {
        // console.warn("One or more sample modal elements not found. Modal functionality might be limited.");
        return;
    }

    openModalBtn.addEventListener('click', () => {
        modal.classList.add('show');
        modal.style.display = 'flex'; // Ensure display is flex for centering
        sampleFormMessage.textContent = ''; // Clear previous messages
        sampleFormMessage.classList.remove('success', 'error');
        sampleForm.reset(); // Reset form
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300); // Hide after transition
    });

    // Close when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300); // Hide after transition
        }
    });

    sampleForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById('sample-name').value;
        const email = document.getElementById('sample-email').value;
        const address = document.getElementById('sample-address').value;

        // Basic validation
        if (!name || !email || !address) {
            sampleFormMessage.textContent = 'Please fill in all fields.';
            sampleFormMessage.classList.remove('success');
            sampleFormMessage.classList.add('error');
            return;
        }

        // Simulate API call
        setTimeout(() => {
            const isSuccess = Math.random() > 0.3; // Simulate 70% success rate
            if (isSuccess) {
                sampleFormMessage.textContent = 'Thank you for your order! Your sample will be shipped soon.';
                sampleFormMessage.classList.remove('error');
                sampleFormMessage.classList.add('success');
                sampleForm.reset();
            } else {
                sampleFormMessage.textContent = 'There was an error submitting your order. Please try again.';
                sampleFormMessage.classList.remove('success');
                sampleFormMessage.classList.add('error');
            }
        }, 1000);
    });
}

export { initSampleModal };