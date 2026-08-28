let index = 0;
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".slider-dots");
const sliderContainer = document.querySelector(".hero-slider"); // Select the container
let timer;

// Initialize
function initSlider() {
    // Create dots
    if(slides.length > 0) {
        slides.forEach((_, i) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
        startAutoSlide();
        
        // Add Event Listeners for Pause on Hover
        sliderContainer.addEventListener("mouseenter", stopAutoSlide);
        sliderContainer.addEventListener("mouseleave", startAutoSlide);
    }
}

function goToSlide(n) {
    // Remove active classes
    slides[index].classList.remove("active");
    const dots = document.querySelectorAll(".dot");
    if(dots.length > index) dots[index].classList.remove("active");
    
    // Set new index
    index = (n + slides.length) % slides.length;
    
    // Add active classes
    slides[index].classList.add("active");
    if(dots.length > index) dots[index].classList.add("active");
}

function changeSlide(step) {
    goToSlide(index + step);
}

function startAutoSlide() {
    // Clear any existing timer first to avoid duplicates
    stopAutoSlide(); 
    timer = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(timer);
}

function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('active');
}

// Run init
initSlider();
/* Styling for the forum icon in buttons */
.cta-btn i {
    margin-right: 8px;
}

/* Ensure the features grid handles 4 cards nicely on desktop */
@media (min-width: 1200px) {
    .features-grid {
        grid-template-columns: repeat(4, 1fr); /* 4 columns on large screens */
    }
}

/* Give the Community link in navbar a slight "pop" */
.nav-links a[href="forum.html"] {
    position: relative;
}

.nav-links a[href="forum.html"]::after {
    content: 'LIVE';
    position: absolute;
    top: -5px;
    right: -25px;
    background: var(--orange-grad);
    color: white;
    font-size: 0.6rem;
    padding: 2px 4px;
    border-radius: 4px;
}