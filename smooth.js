// Get the target element to scroll
var content = document.querySelector(".unspoken-product-detail-content-box-wrapper");

// Get the height of the target element
var contentHeight = content.offsetHeight;

// Prevent default scroll behavior for mouse wheel and touch events
document.addEventListener("wheel", function (event) {
    event.preventDefault();
});

document.addEventListener("touchstart", function (event) {
    event.preventDefault();
});

document.addEventListener("touchmove", function (event) {
    event.preventDefault();
});

// Detect direction and speed of touch events or scroll amount for mouse wheel events
var lastY;
var currentY;
var speed;

document.addEventListener("touchstart", function (event) {
    lastY = event.touches[0].clientY;
});

document.addEventListener("touchmove", function (event) {
    currentY = event.touches[0].clientY;
    speed = lastY - currentY;
    lastY = currentY;
});

document.addEventListener("wheel", function (event) {
    speed = event.deltaY;
});

// Map event values to desired scroll level
var translateY = 0;
var targetTranslateY = 0;
var animationFrameId;

function easeOutQuad(t) {
    return t * (2 - t);
}

function update() {
    translateY += (targetTranslateY - translateY) * easeOutQuad(0.1);
    content.style.transform = "translateY(" + translateY + "px)";

    // Limit the amount of scrolling
    if (translateY > 0) {
        targetTranslateY = 0;
        translateY = 0;
    } else if (translateY < -contentHeight + window.innerHeight) {
        targetTranslateY = -contentHeight + window.innerHeight;
        translateY = -contentHeight + window.innerHeight;
    }

    animationFrameId = requestAnimationFrame(update);
}

update();

document.addEventListener("touchmove", function (event) {
    targetTranslateY -= speed / 4;
});

document.addEventListener("wheel", function (event) {
    targetTranslateY -= event.deltaY / 4;
});