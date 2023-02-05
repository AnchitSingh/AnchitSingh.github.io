// Get the sections and the content container
const sections = document.querySelectorAll(".unspoken-section");
const content = document.querySelector(".unspoken-product-detail-content-box-wrapper");

// Calculate the height of each section and the total height of all sections
const sectionHeights = [];
let totalHeight = 0;
sections.forEach(section => {
    sectionHeights.push(section.offsetHeight);
    totalHeight += section.offsetHeight;
});

// Get the current section index and the target translate Y value
let currentSectionIndex = 0;
let targetTranslateY = 0;

// Add event listeners for touch events and mouse wheel
content.addEventListener("touchstart", touchStartHandler);
content.addEventListener("touchmove", touchMoveHandler);
content.addEventListener("touchend", touchEndHandler);
content.addEventListener("wheel", wheelHandler);

function touchStartHandler(event) {
    // Store the starting touch position
    const touch = event.touches[0];
    this.startY = touch.pageY;
}

function touchMoveHandler(event) {
    // Prevent default touch behavior
    event.preventDefault();

    // Get the current touch position and calculate the touch delta
    const touch = event.touches[0];
    const touchDelta = touch.pageY - this.startY;

    // Update the target translate Y value based on the touch delta
    targetTranslateY -= touchDelta;

    // Check if the target translate Y value is within the bounds of the total height
    if (targetTranslateY > 0) {
        targetTranslateY = 0;
    } else if (targetTranslateY < -(totalHeight - window.innerHeight)) {
        targetTranslateY = -(totalHeight - window.innerHeight);
    }

    // Update the content position based on the target translate Y value
    content.style.transform = `translateY(${targetTranslateY}px)`;

    // Store the current touch position for the next touch move event
    this.startY = touch.pageY;
}

function touchEndHandler() {
    // Check which section the content is currently in and update the current section index
    let currentSectionTop = 0;
    sectionHeights.forEach((sectionHeight, index) => {
        if (-targetTranslateY >= currentSectionTop && -targetTranslateY < currentSectionTop + sectionHeight) {
            currentSectionIndex = index;
        }
        currentSectionTop += sectionHeight;
    });

    // Update the target translate Y value to align with the current section
    targetTranslateY = -currentSectionTop;

    // Update the content position based on the target translate Y value
    content.style.transform = `translateY(${targetTranslateY}px)`;
}

function wheelHandler(event) {
    // Prevent default mouse wheel behavior
    event.preventDefault();

    // Calculate the mouse wheel delta
    const delta = event.deltaY;

    // Update the target translate Y value based on the mouse wheel delta
    targetTranslateY -= delta;

    // Check if the target translate Y value is within the bounds of the total height
    if (targetTranslateY > 0) {
        targetTranslateY = 0;
    } else if (targetTranslateY < -(totalHeight - window.innerHeight)) {
        targetTranslateY = -(totalHeight - window.innerHeight);
    }

    // Update the content position based on the target translate Y value
    content.style.transform = `translateY(${targetTranslateY}px)`;

    // Check which section the content is currently in and update the current section index
    let currentSectionTop = 0;
    sectionHeights.forEach((sectionHeight, index) => {
        if (-targetTranslateY >= currentSectionTop && -targetTranslateY < currentSectionTop + sectionHeight) {
            currentSectionIndex = index;
        }
        currentSectionTop += sectionHeight;
    });
}