document.addEventListener('DOMContentLoaded', function () {
    setupAddToCartButtons();
    updateCartCount(getCart()); 
});

// Handle the "Add to Cart" button click
function setupAddToCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const grandParent = this.parentElement.parentElement;
            const parent = this.parentElement;
            const name = grandParent.querySelector('h3').innerText;
            const ounce = parent.querySelector('span:nth-child(1)').innerText;
            const price = parent.querySelector('span:nth-child(2)').innerText;

            const itemName = name + ` (${ounce})`;
            const itemPrice = parseFloat(price.replace('₱', ''));

            const item = {
                name: itemName,
                price: itemPrice
            };

            addToCart(item);
        });
    });
}

//Add to cart function
function addToCart(item) {
    let quantity = prompt("How many of " + item.name + " would you like to add?", "1");
    
    if (quantity === null) {//canceled
        return; 
    }

    quantity = parseInt(quantity);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return; 
    }
    
    let cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    const cost = item.price * quantity;
    
    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.price += cost;
    } else {
        item.price = cost;
        cart.push({ ...item, quantity }); 
    }

    saveCart(cart);
    alert(quantity + " of " + item.name + " added to cart! \nCost: ₱ " + cost);
}


// Get current cart from localStorage
function getCart() {
    let cart = localStorage.getItem("cartSpecial");
    if (cart) {
        return JSON.parse(cart);
    } else {
        return []; 
    }
}

// Save the cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cartSpecial", JSON.stringify(cart));
    updateCartCount(getCart());
}

// Update the cart count in the HTML
function updateCartCount(cart) {
    const cartCountElement = document.getElementById("cart-count");
    
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.quantity; 
    });
    
    cartCountElement.innerText = totalQuantity; 
}