document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartItemsModal = document.getElementById('cart-items-modal');
    const cartBadge = document.getElementById('cart-badge');
    const cartTotal = document.getElementById('cart-total');
    const cartTotalModal = document.getElementById('cart-total-modal');
    const cartModal = document.getElementById('cart-modal');
    const orderConfirmationModal = document.getElementById('order-confirmation-modal');
    const userDetailsModal = document.getElementById('user-details-modal');
    const orderSummaryModal = document.getElementById('order-summary-modal');
    const checkoutButtonModal = document.getElementById('checkout-button-modal');
    const confirmOrderButton = document.getElementById('confirm-order-button');
    const confirmSummaryButton = document.getElementById('confirm-summary-button');
    const openCartModalButton = document.getElementById('open-cart-modal');
    const userDetailsForm = document.getElementById('user-details-form');
    const cardFields = document.getElementById('credit-debit-card-fields');
    const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
    const orderSummaryContent = document.getElementById('order-summary-content');
    const userDetails = {};

    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to format price for calculation
    function formatPrice(price) {
        const formattedPrice = parseFloat(price.replace(/[^\d.-]/g, ''));
        if (isNaN(formattedPrice)) {
            console.error(`Invalid price detected: ${price}`);
            return 0;
        }
        return formattedPrice;
    }

    // Function to display cart items and total price
    function displayCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartItemsModal.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map((item, index) => `
                <div class="cart-item" data-index="${index}">
                    <img src="${item.imgSrc}" alt="${item.name}" class="cart-img">
                    <h3 class="cart-name">${item.name}</h3>
                    <p class="cart-price">${item.price}</p>
                    <p class="cart-quantity">Quantity: ${item.quantity}</p>
                    <button class="remove-from-cart">Remove</button>
                </div>
            `).join('');

            cartItemsModal.innerHTML = cart.map((item, index) => `
                <li>
                    <img src="${item.imgSrc}" alt="${item.name}" class="cart-img">
                    <span>${item.name}</span>
                    <span>${item.price}</span>
                    <span>Quantity: ${item.quantity}</span>
                </li>
            `).join('');
        }

        // Calculate total price
        const total = cart.reduce((acc, item) => {
            const price = formatPrice(item.price);
            return acc + (price * item.quantity);
        }, 0).toFixed(2);

        // Update total price display
        cartTotal.innerText = `Total: ₹${total}`;
        cartTotalModal.innerText = `Total: ₹${total}`;

        // Update cart badge
        cartBadge.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    // Function to update cart badge
    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartBadge.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    // Function to show/hide payment fields based on selected method
    function updatePaymentFields() {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
        if (selectedMethod === 'credit-debit-card') {
            cardFields.style.display = 'block';
        } else {
            cardFields.style.display = 'none';
        }
    }

    // Function to generate order summary content
    function generateOrderSummary() {
        const total = cart.reduce((acc, item) => {
            const price = formatPrice(item.price);
            return acc + (price * item.quantity);
        }, 0).toFixed(2);

        orderSummaryContent.innerHTML = `
            <div class="order-summary-section">
                <h2>Order Summary</h2>
                <h3>Items:</h3>
                <ul>
                    ${cart.map(item => `
                        <li>
                            <img src="${item.imgSrc}" alt="${item.name}" class="cart-img">
                            <span>${item.name}</span>
                            <span>${item.price}</span>
                            <span>Quantity: ${item.quantity}</span>
                        </li>
                    `).join('')}
                </ul>
                <h3>Total: ₹${total}</h3>
                <h3>Delivery Address:</h3>
                <p>${userDetails.address}</p>
                <h3>Payment Method:</h3>
                <p>${userDetails.paymentMethod}</p>
                ${userDetails.paymentMethod === 'credit-debit-card' ? `
                    <p>Card Number: ${userDetails.cardNumber}</p>
                    <p>Card Expiry: ${userDetails.cardExpiry}</p>
                    <p>Card CVV: ${userDetails.cardCvv}</p>
                ` : ''}
            </div>
        `;
    }

    // Initial display and badge update
    displayCart();
    updateCartBadge();

    // Event listener for removing items from the cart
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const cartItem = event.target.closest('.cart-item');
            const index = cartItem.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
            updateCartBadge();
        }
    });

    // Event listener for opening the cart modal
    openCartModalButton.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    // Event listener for closing the cart modal
    document.querySelector('.close').addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Event listener for proceeding to checkout
    checkoutButtonModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
        userDetailsModal.style.display = 'block';
    });

    // Event listener for closing the user details modal
    document.querySelector('.close-user-details').addEventListener('click', () => {
        userDetailsModal.style.display = 'none';
    });

    // Event listener for handling payment method changes
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', updatePaymentFields);
    });

    // Handle form submission
    userDetailsForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        // Collect form data and process it
        const formData = new FormData(this);
        userDetails.address = formData.get('address');
        userDetails.paymentMethod = formData.get('payment-method');
        
        if (userDetails.paymentMethod === 'credit-debit-card') {
            userDetails.cardNumber = formData.get('card-number');
            userDetails.cardExpiry = formData.get('card-expiry');
            userDetails.cardCvv = formData.get('card-cvv');
        }

        // Generate order summary
        generateOrderSummary();

        // Show order summary modal
        userDetailsModal.style.display = 'none';
        orderSummaryModal.style.display = 'block';
    });

    // Event listener for closing the order summary modal
    document.querySelector('.close-order-summary').addEventListener('click', () => {
        orderSummaryModal.style.display = 'none';
    });

    // Event listener for confirming the order summary
    confirmSummaryButton.addEventListener('click', () => {
        orderSummaryModal.style.display = 'none';
        localStorage.removeItem('cart');
        displayCart(); // Update the cart display
        updateCartBadge(); // Update the badge
    });

    // Event listener for closing the order confirmation modal
    document.querySelector('.close-order').addEventListener('click', () => {
        orderConfirmationModal.style.display = 'none';
    });

    // Event listener for confirming the order
    confirmOrderButton.addEventListener('click', () => {
        orderConfirmationModal.style.display = 'none';
        displayCart(); // Update the cart display
        updateCartBadge(); // Update the badge
    });
});
