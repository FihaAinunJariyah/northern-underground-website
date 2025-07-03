// js/modules/cart.js

const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-item-count');
const cartTotalPriceSpan = document.getElementById('cartTotalPrice');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('closeCart');
const cartIconBtn = document.getElementById('cart-icon');

function updateCartUI() {
    if (!cartItemsContainer || !cartCountSpan || !cartTotalPriceSpan) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="cart-empty-message" data-translate-key="cartEmptyMessage">Your cart is empty.</p>';
        document.querySelector('.checkout-btn').disabled = true;
    } else {
        document.querySelector('.checkout-btn').disabled = false;
        cart.forEach(item => {
            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item-btn" data-id="${item.id}">&times;</button>
            `;
            cartItemsContainer.appendChild(cartItemEl);
            total += item.price * item.quantity;
        });
    }

    cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotalPriceSpan.textContent = `$${total.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addItemToCart(productId, productName, productPrice, productImage = 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=Product') {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    updateCartUI();
    openCartSidebar();
}

function removeItemFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function changeItemQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItemFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function openCartSidebar() {
    if (cartSidebar) {
        cartSidebar.classList.add('open');
    }
}

function closeCartSidebar() {
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
    }
}

function initCart() {
    updateCartUI(); // Initialize UI on load

    // Add event listeners for cart interactions
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const btn = event.target;
            const productId = btn.dataset.productId;
            const productName = btn.dataset.productName;
            const productPrice = parseFloat(btn.dataset.productPrice);
            addItemToCart(productId, productName, productPrice);
        } else if (event.target.classList.contains('remove-item-btn')) {
            const productId = event.target.dataset.id;
            removeItemFromCart(productId);
        } else if (event.target.classList.contains('decrease-quantity')) {
            const productId = event.target.dataset.id;
            changeItemQuantity(productId, -1);
        } else if (event.target.classList.contains('increase-quantity')) {
            const productId = event.target.dataset.id;
            changeItemQuantity(productId, 1);
        }
    });

    if (cartIconBtn) {
        cartIconBtn.addEventListener('click', openCartSidebar);
    }
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCartSidebar);
    }
}

export { initCart, addItemToCart, updateCartUI };