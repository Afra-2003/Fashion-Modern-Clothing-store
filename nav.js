// Create the navigation
const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = `

    <style>
  /* Enhanced styles for the cart badge */
.nav-items {
    position: relative;
}

#cart-icon {
    position: relative;
}

.cart-badge {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #ff4757; /* A bright, attractive red color */
    color: white; /* Text color */
    border-radius: 50%;
    width: 18px; /* Larger width for better visibility */
    height: 18px; /* Larger height */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px; /* Slightly larger font size */
    font-weight: bold;
    text-align: center;
    border: 2px solid #e84118; /* A slightly darker red for the border */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Softer shadow for better depth */
    transform: translate(25%, -25%); /* Position adjustment to align better */
    transition: background-color 0.3s, transform 0.3s; /* Smooth transition effects */
}

/* Optional hover effect for extra interactivity */
#cart-icon:hover .cart-badge {
    background-color: #ff6b81; /* A slightly lighter red for hover effect */
    transform: translate(25%, -25%) scale(1.1); /* Slightly enlarge on hover */
}


</style>
       <div class="nav">
    <img src="logo.png" class="brand-logo" alt="">
    <link rel="stylesheet" href="home.css">
    <div class="nav-items">
        <div class="search">
            <input type="text" class="search-box" placeholder="search brand, product">
            <button class="search-btn">search</button>
        </div>
        <a href="#"><img src="user.png" alt=""></a>
        <a href="cart.html">
            <img src="cart.png" alt="Cart Icon" id="cart-icon">
            <span id="cart-badge" class="cart-badge">0</span> <!-- Badge element here -->
        </a>
    </div>
</div>

        <ul class="links-container">
            <li class="link-item"><a href="index.html" class="link">home</a></li>
            <li class="link-item dropdown">
                <a href="#" class="link">women</a>
                <ul class="dropdown-menu">
                    <li><a href="maxi.html" class="dropdown-link">Maxi</a></li>
                    <li><a href="gown.html" class="dropdown-link">Gown</a></li>
                    <li><a href="kurti.html" class="dropdown-link">Kurtis</a></li>
                </ul>
            </li>
            <li class="link-item dropdown">
                <a href="#" class="link">men</a>
                <ul class="dropdown-menu">
                    <li><a href="tshirt.html" class="dropdown-link">t-shirts</a></li>
                    <li><a href="shirt.html" class="dropdown-link">shirts</a></li>
                    <li><a href="coat.html" class="dropdown-link">Coat</a></li>
                </ul>
            </li>
            <li class="link-item dropdown">
                <a href="#" class="link">kids</a>
                <ul class="dropdown-menu">
                    <li><a href="kgown.html" class="dropdown-link">Gown</a></li>
                    <li><a href="tops.html" class="dropdown-link">Tops</a></li>
                    <li><a href="skirt.html" class="dropdown-link">Skirts</a></li>
                </ul>
            </li>
            <li class="link-item dropdown">
                <a href="#" class="link">accessories</a>
                <ul class="dropdown-menu">
                    <li><a href="shoe.html" class="dropdown-link">shoes</a></li>
                    <li><a href="glass.html" class="dropdown-link">Glasses</a></li>
                    <li><a href="watch.html" class="dropdown-link">Watches</a></li>
                </ul>
            </li>
        </ul>
    `;
}

// Call the function to create the navigation
createNav();


// Modal and Cart functionality
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const modal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    const orderForm = document.getElementById('order-form');
    const orderConfirmationModal = document.getElementById('order-confirmation-modal');
    const closeOrderModal = document.querySelector('.close-order');
    const confirmOrderButton = document.getElementById('confirm-order-button');

    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Simulated cart for demonstration purposes
    let cart = [];

    // Add to Cart function
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.parentElement;
            const productName = productItem.querySelector('.product-name').innerText;
            const productPrice = parseFloat(productItem.querySelector('.product-price').innerText.replace('₹', ''));
            const productImage = productItem.querySelector('.product-image').src;

            // Add product to cart
            cart.push({ name: productName, price: productPrice, image: productImage });

            // Update the cart total
            updateCartTotal();

            alert(`${productName} has been added to the cart.`);
        });
    });

    // Update Cart Total function
    const updateCartTotal = () => {
        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price;
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-product-image">
                <span>${item.name} - ₹${item.price}</span>
            `;
            cartItemsList.appendChild(li);
        });

        cartTotal.innerText = `Total: ₹${total}`;
    };

    // Open Cart Modal
    cartIcon.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close Cart Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close Cart Modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Handle Checkout Button Click
    checkoutButton.addEventListener('click', () => {
        // Hide cart items and show order form
        document.getElementById('cart-contents').style.display = 'none';
        orderForm.style.display = 'block';
    });

    // Handle Confirm Order Button Click
    confirmOrderButton.addEventListener('click', () => {
        // Get address details and payment option
        const address = document.getElementById('address').value;
        const paymentOption = document.querySelector('input[name="payment"]:checked').value;

        if (address.trim() === '' || !paymentOption) {
            alert('Please enter your address and select a payment option.');
            return;
        }

        // Show the order confirmation modal
        orderConfirmationModal.style.display = 'block';

        // Clear the cart
        cart = [];
        updateCartTotal();
        orderForm.reset();
    });

    // Close Order Confirmation Modal
    closeOrderModal.addEventListener('click', () => {
        orderConfirmationModal.style.display = 'none';
        window.location.href = 'index.html';
    });

    // Close Order Confirmation Modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target == orderConfirmationModal) {
            orderConfirmationModal.style.display = 'none';
            window.location.href = 'index.html';
        }
    });
});
