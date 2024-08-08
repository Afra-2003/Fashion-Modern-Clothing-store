document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product-item');
            if (!product) return;

            const productName = product.querySelector('.product-name').innerText;
            const productPrice = product.querySelector('.product-price').innerText;
            const productImgSrc = product.querySelector('img').src;

            const cartItem = {
                name: productName,
                price: productPrice, // Ensure price includes currency symbol
                imgSrc: productImgSrc,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingItemIndex = cart.findIndex(item => item.name === cartItem.name);
            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push(cartItem);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartBadge(); // Update badge
            alert(`${productName} has been added to your cart`);
        });
    });

    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartBadge = document.getElementById('cart-badge');
        if (cartBadge) {
            cartBadge.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
        }
    }

    updateCartBadge(); // Ensure badge is updated on page load
});
