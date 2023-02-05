// Get the target element
const content = document.querySelector(".unspoken-product-detail-content-box-wrapper");

// Get the content height
const contentHeight = content.offsetHeight;

// Get the window height
const windowHeight = window.innerHeight;

// Get the starting Y position of the target element
let startY = 0;

// Get the ending Y position of the target element
let endY = 0;

// Get the current Y position of the target element
let currentY = 0;

// Get the animation duration in milliseconds
let duration = 500;

// Get the start time of the animation
let startTime = null;

// Easing function for the animation
const easeOutCubic = (t) => (--t) * t * t + 1;

// Animate the target element
function animate(currentTime) {
    if (startTime === null) startTime = currentTime;

    // Calculate the progress of the animation
    let progress = (currentTime - startTime) / duration;

    // Apply the easing function to the progress
    progress = easeOutCubic(progress);

    // Calculate the current Y position of the target element
    currentY = startY + (endY - startY) * progress;

    // Prevent the target element from scrolling more than its height
    if (currentY > 0) currentY = 0;
    if (currentY < -(contentHeight - windowHeight)) {
        currentY = -(contentHeight - windowHeight);
    }

    // Apply the CSS transform to the target element
    content.style.transform = `translateY(${currentY}px)`;

    // Continue the animation until it's completed
    if (progress < 1) {
        requestAnimationFrame(animate);
    }
}

// Start the animation when the mouse wheel event is triggered
document.addEventListener("wheel", (event) => {
    // Reverse the direction of the scroll event
    event.deltaY = -event.deltaY;

    startY = currentY;
    endY += event.deltaY;
    startTime = null;
    requestAnimationFrame(animate);
});
