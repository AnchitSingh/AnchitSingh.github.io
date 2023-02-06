$(document).ready(function () {
    var col = 255;
    document.querySelector('#draggable-wrapper').addEventListener('wheel', function (e) {
        if (e.wheelDelta > 0) {
            $('#draggable-wrapper').css('width', parseFloat($('#draggable-wrapper').css('width')) * 1.02 + 'px')
        } else {
            $('#draggable-wrapper').css('width', parseFloat($('#draggable-wrapper').css('width')) * 0.98 + 'px')
        }
    })
    let initialDistance;
    $("#draggable-wrapper").on("touchstart", function (e) {
        // alert('touchstart')
        if (e.originalEvent.touches.length >= 2) {
            let x1 = e.originalEvent.touches[0].clientX;
            let y1 = e.originalEvent.touches[0].clientY;
            let x2 = e.originalEvent.touches[1].clientX;
            let y2 = e.originalEvent.touches[1].clientY;
            initialDistance = distanceBetween(x1, y1, x2, y2);
        }
    });
    $("#draggable-wrapper").on("touchmove", function (e) {
        // alert('touchmove')
        if (e.originalEvent.touches.length >= 2) {
            let x1 = e.originalEvent.touches[0].clientX;
            let y1 = e.originalEvent.touches[0].clientY;
            let x2 = e.originalEvent.touches[1].clientX;
            let y2 = e.originalEvent.touches[1].clientY;
            let currentDistance = distanceBetween(x1, y1, x2, y2);
            if (currentDistance > initialDistance) {
                // fingers moving further apart
                $('#draggable-wrapper').css('width', parseFloat($('#draggable-wrapper').css('width')) * 1.08 + 'px')
            } else if (currentDistance < initialDistance) {
                // fingers moving closer together
                $('#draggable-wrapper').css('width', parseFloat($('#draggable-wrapper').css('width')) * 0.92 + 'px')
            }
            initialDistance = currentDistance;
        }
    });

    function distanceBetween(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

});

let heightPercent = 15
let widthPercent = 60
let fontSizePercent = 8
let topPercent = 10
let leftPercent = 10

function updateDimentions() {
    let currentHeight = $('#imageId').height();
    let currentWidth = $('#draggable-wrapper').width();

    $("#childDiv").height((currentHeight * heightPercent) / 100);
    $("#childDiv").width((currentWidth * widthPercent) / 100);
    $("#childDiv").css("top", (currentHeight * topPercent) / 100 + "px");
    $("#childDiv").css("left", (currentWidth * leftPercent) / 100 + "px");
    $("#childDiv").css("font-size", (currentWidth * fontSizePercent) / 100 + "px");

    $('#topLeftPointer').width($('#childDiv').width() * .1 + 'px')
    $('#bottomLeftPointer').width($('#childDiv').width() * .1 + 'px')
    $('#topRightPointer').width($('#childDiv').width() * .1 + 'px')
    $('#bottomRightPointer').width($('#childDiv').width() * .1 + 'px')
    $('#bottomDragger').width($('#childDiv').width() * .1 + 'px')

    $('#topLeftPointer').height($('#childDiv').width() * .1 + 'px')
    $('#bottomLeftPointer').height($('#childDiv').width() * .1 + 'px')
    $('#topRightPointer').height($('#childDiv').width() * .1 + 'px')
    $('#bottomRightPointer').height($('#childDiv').width() * .1 + 'px')
    $('#bottomDragger').height($('#childDiv').width() * .1 + 'px')

    $('#topLeftPointer').css('left', -1 * $('#topLeftPointer').width() * .5 + 'px')
    $('#bottomLeftPointer').css('left', -1 * $('#bottomLeftPointer').width() * .5 + 'px')
    $('#topRightPointer').css('right', -1 * $('#topRightPointer').width() * .5 + 'px')
    $('#bottomRightPointer').css('right', -1 * $('#bottomRightPointer').width() * .5 + 'px')

    $('#topLeftPointer').css('top', -1 * $('#topLeftPointer').width() * .5 + 'px')
    $('#bottomLeftPointer').css('bottom', -1 * $('#bottomLeftPointer').width() * .5 + 'px')
    $('#topRightPointer').css('top', -1 * $('#topRightPointer').width() * .5 + 'px')
    $('#bottomRightPointer').css('bottom', -1 * $('#bottomRightPointer').width() * .5 + 'px')
    $('#bottomDragger').css('bottom', -1 * $('#childDiv').width() * .1 + 'px')

}
updateDimentions()
var element = document.getElementById("draggable-wrapper");
let previousWidth;
let previousHeight;
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        const currentWidth = mutation.target.getBoundingClientRect().width;
        const currentHeight = mutation.target.getBoundingClientRect().height;
        if ((previousWidth && currentWidth !== previousWidth) || (previousHeight && currentHeight !== previousHeight)) {
            console.log('width or height changed');
        }
        previousWidth = currentWidth;
        previousHeight = currentHeight;
    });
    updateDimentions()
    // let currentHeight = $('#imageId').height();
    // let currentWidth = $('#draggable-wrapper').width();
    // $("#childDiv").height((currentHeight * heightPercent) / 100);
    // $("#childDiv").width((currentWidth * widthPercent) / 100);
    // $("#childDiv").css("top", (currentHeight * topPercent) / 100 + "px");
    // $("#childDiv").css("left", (currentWidth * leftPercent) / 100 + "px");
    // $("#childDiv").css("font-size", (currentWidth * fontSizePercent) / 100 + "px");
});
observer.observe(element, {
    attributes: true,
    childList: false,
    subtree: false
});

function updateWHTL() {
    widthPercent = ($('#childDiv').width() * 100) / $('#imageId').width();
    heightPercent = ($('#childDiv').height() * 100) / $('#imageId').height();
    leftPercent = (parseFloat($('#childDiv').css('left')) * 100) / $('#imageId').width();
    topPercent = (parseFloat($('#childDiv').css('top')) * 100) / $('#imageId').height();
}
$("#draggable-wrapper").draggable();
$('#childDiv').draggable({
    containment: $("#imageId"),
    drag: function (e, ui) {
        updateWHTL()
    },
    stop: function (e, ui) {
        updateWHTL()
    }
}).resizable({
    containment: $("#imageId"),
    handles: "n, e, s, w, ne, nw, se, sw",
    resize: function (e, ui) {
        updateWHTL()
    },
    stop: function (e, ui) {
        updateWHTL()
    }
})
$('.ui-icon').remove()
