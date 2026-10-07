

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


/* ================= CART ================= */

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


let cart = [];


function openCart() {

    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");

}


function closeCartPanel() {

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");

}


cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


/* ================= ADD PRODUCT ================= */

document.querySelectorAll(".quick-add").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cart.find(
            item => item.name === name
        );


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

        openCart();

    });

});


/* ================= UPDATE CART ================= */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>🛒</span>
                <p>Your basket is waiting.</p>
            </div>
        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "₹0";

        return;
    }


    let total = 0;
    let quantityTotal = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        quantityTotal += item.quantity;


        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";

        itemElement.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                    × ${item.quantity}
                </p>

            </div>

            <button
                class="remove-item"
                data-index="${index}">
                Remove
            </button>

        `;


        cartItems.appendChild(itemElement);

    });


    cartCount.textContent = quantityTotal;

    cartTotal.textContent =
        "₹" + total.toLocaleString("en-IN");


    document.querySelectorAll(".remove-item").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            cart.splice(index, 1);

            updateCart();

        });

    });

}


/* ================= NEWSLETTER ================= */

const newsletterForm =
    document.getElementById("newsletterForm");


newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email =
        newsletterForm.querySelector("input").value;


    if (email) {

        alert(
            "Thank you! You'll hear from GRAINA soon."
        );

        newsletterForm.reset();

    }

});


/* ================= SMOOTH PRODUCT REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".product-card, .recipe-card, .story-content, .story-image"
    );


const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(element);

});


/* ================= MOUSE PARALLAX ================= */

const heroContent =
    document.querySelector(".hero-content");


document.querySelector(".hero")
    .addEventListener("mousemove", event => {

        const x =
            (event.clientX / window.innerWidth - 0.5) * 10;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 10;


        heroContent.style.transform =
            `translate(${x}px, ${y}px)`;

    });


document.querySelector(".hero")
    .addEventListener("mouseleave", () => {

        heroContent.style.transform =
            "translate(0, 0)";

    });


/* ================= VIDEO FALLBACK ================= */

document.querySelectorAll("video").forEach(video => {

    video.addEventListener("error", () => {

        console.log(
            "Video could not be loaded. Check assets/hero.mp4"
        );

    });

});


/* ================= ESCAPE KEY ================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeCartPanel();

        mobileMenu.classList.remove("active");

    }

});
/* ================= CHECKOUT ================= */

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    // Save cart
    localStorage.setItem(
        "grainaCart",
        JSON.stringify(cart)
    );

    // Go to checkout page
    window.location.href = "checkout.html";
}