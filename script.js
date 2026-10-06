const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});

let cart = [];

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard = button.closest(".product-card");

        const name = productCard.dataset.name;
        const price = Number(productCard.dataset.price);

        const existingProduct = cart.find(function (item) {
            return item.name === name;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();

        button.innerText = "Added ✓";

        setTimeout(function () {
            button.innerText = "Add to Cart";
        }, 800);

    });

});

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }

    cart.forEach(function (item, index) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        totalQuantity += item.quantity;

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div class="cart-product">
                <h3>${item.name}</h3>
                <p>₹${item.price} each</p>
            </div>

            <div class="quantity">
                <button onclick="decreaseQuantity(${index})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>

            <div class="item-total">
                ₹${itemTotal}
            </div>

            <button
                class="remove-btn"
                onclick="removeItem(${index})">
                ✕
            </button>
        `;

        cartItems.appendChild(cartItem);

    });

    cartCount.innerText = totalQuantity;
    cartTotal.innerText = total;
}

function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce(function (sum, item) {
        return sum + (item.price * item.quantity);
    }, 0);

    alert(
        "GlobalMart Order Placed Successfully!\n\n" +
        "Total Amount: ₹" + total
    );

    cart = [];

    updateCart();
});