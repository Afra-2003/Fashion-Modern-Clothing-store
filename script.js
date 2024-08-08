// Add this to your script.js

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const viewCartButton = document.getElementById('view-cart');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.closest('.product-item');
            const productName = productItem.querySelector('.product-name').innerText;
            const productPrice = parseFloat(productItem.querySelector('.product-price').innerText.replace('₹', ''));

            addItemToCart(productName, productPrice);
            alert(`${productName} has been added to your cart.`);
        });
    });

    viewCartButton.addEventListener('click', () => {
        displayCart();
        cartModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    function addItemToCart(name, price) {
        cart.push({ name, price });
        updateCartTotal();
    }

    function displayCart() {
        cartItemsList.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerText = `${item.name} - ₹${item.price}`;
            cartItemsList.appendChild(li);
        });
    }

    function updateCartTotal() {
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        cartTotal.innerText = `Total: ₹${total}`;
    }
});



document.addEventListener('DOMContentLoaded', (event) => {
    const viewCartButtons = document.querySelectorAll('.view-cart');

    viewCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'cart.html'; // Replace 'cart.html' with your desired URL
        });
    });
});





