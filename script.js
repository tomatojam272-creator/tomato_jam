// ==================================================
// Tomato Jam Website Script
// Handles product quantity, order flow, animations, and interactions
// ==================================================

// ---------------------------
// State Management
// ---------------------------
let quantity = 1;
let selectedSize = "120ml";
let price = 90.00; // fixed price for 120ml

// ---------------------------
// Initialize after DOM loads
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    initQuantityControls();
    updateOrderDisplay();
    initBenefitCardAnimations();
    initOrderButton();
    initRevealAnimations();
    initContactButtons();
});


// ---------------------------
// Smooth scroll to a section
// ---------------------------
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// ---------------------------
// Quantity Controls
// ---------------------------
function initQuantityControls() {
    const decreaseBtn = document.getElementById("decrease");
    const increaseBtn = document.getElementById("increase");

    if (decreaseBtn) {
        decreaseBtn.addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                updateOrderDisplay();
            }
        });
    }

    if (increaseBtn) {
        increaseBtn.addEventListener("click", () => {
            quantity++;
            updateOrderDisplay();
        });
    }
}

// ---------------------------
// Update Order Display
// ---------------------------
function updateOrderDisplay() {
    const quantityDisplay = document.getElementById("quantity");
    const priceDisplay = document.getElementById("price");
    const totalDisplay = document.getElementById("total");
    const orderTotalDisplay = document.getElementById("order-total");

    const total = (price * quantity).toFixed(2);

    if (quantityDisplay) quantityDisplay.textContent = quantity;
    if (priceDisplay) priceDisplay.textContent = price.toFixed(2);
    if (totalDisplay) totalDisplay.textContent = total;
    if (orderTotalDisplay) orderTotalDisplay.textContent = total;
}

// ---------------------------
// Benefit Cards Hover Animation
// ---------------------------
function initBenefitCardAnimations() {
    const cards = document.querySelectorAll(".benefit-card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-8px)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)";
        });
    });
}

// ---------------------------
// Order Button Handler
// ---------------------------
function initOrderButton() {
    const orderBtn = document.querySelector(".order-btn");
    if (!orderBtn) return;

    orderBtn.addEventListener("click", () => {
        // Click animation
        orderBtn.style.transform = "scale(0.96)";
        setTimeout(() => {
            orderBtn.style.transform = "scale(1)";
        }, 150);

        // Save order to localStorage
        const order = {
            size: selectedSize,
            quantity: quantity,
            price: price,
            total: (price * quantity).toFixed(2)
        };
        localStorage.setItem("order", JSON.stringify(order));

        // Redirect to checkout page
        window.location.href = "checkout.html";
    });
}

// ---------------------------
// Reveal Animations on Scroll
// ---------------------------
function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll(".benefit-card, .about-text, .hero-text");
    elements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });
}

// ---------------------------
// Contact Button Interactions
// ---------------------------
function initContactButtons() {
    const contactBtns = document.querySelectorAll(".contact-btn");

    contactBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const linkText = btn.textContent.trim();

            // Allow normal email links
            if (btn.href && btn.href.startsWith("mailto:")) return;

            e.preventDefault();

            switch (linkText) {
                case "Instagram":
                    alert("📸 Follow us on Instagram: @tomatojam");
                    break;
                case "Facebook":
                    alert("👍 Like our Facebook page for updates!");
                    break;
                case "WhatsApp":
                    alert("💬 Message us on WhatsApp: +1234567890");
                    break;
                default:
                    alert("Thanks for reaching out!");

                    
            }
        });
    });
}
