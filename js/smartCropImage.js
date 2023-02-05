smartCropping = (imgBox, canvas, viewImg, autoHeight = false, shortHeight = 0, longHeight = 0) => {
    try {
        // var imgBox = $('#' + id)
        // var canvas = $('#' + id + '-canvas')[0];
        canvas = canvas[0]
        var ctx = canvas.getContext('2d');
        var img;
        // var viewImg = $('#' + id + '-image')
        load(imgBox.attr('data-src'));
        let divHeight = imgBox.height()
        let autoWidth = imgBox.width()

        function load(src) {
            img = new Image();
            img.onload = function () {
                run();
            };
            img.src = src;
        }

        function run() {
            if (!img) return;
            if (autoHeight) {
                let aspectRatio = img.height / img.width
                if (aspectRatio < 1) {
                    divHeight = shortHeight
                } else {
                    divHeight = longHeight
                }
            }
            var options = {
                width: imgBox.width() * 1,
                height: divHeight * 1,
                ruleOfThirds: false,
                debug: false
            };

            var analyzeOptions = analyze.bind(this, options);

            analyzeOptions();
        }

        function analyze(options) {
            smartcrop.crop(img, options, draw);
        }

        function draw(result) {
            var selectedCrop = result.topCrop;
            drawCrop(selectedCrop);
        }

        function drawCrop(crop) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            viewImg.attr('src', img.src);

            console.log(imgBox[0].id, viewImg[0].id)
            let wFactor = (imgBox.width() / crop.width)
            let hFactor = (divHeight / crop.height)
            viewImg.css('margin-left', -1 * crop.x * wFactor + 'px')
            viewImg.css('margin-top', -1 * crop.y * hFactor + 'px')
            viewImg.css('height', img.height * hFactor + 'px')
            // var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            // var data = imageData.data;

            // // Calculate the average color
            // var r = 0, g = 0, b = 0;
            // for (var i = 0, l = data.length; i < l; i += 4) {
            //     r += data[i];
            //     g += data[i + 1];
            //     b += data[i + 2];
            // }
            // r = Math.floor(r / (data.length / 4));
            // g = Math.floor(g / (data.length / 4));
            // b = Math.floor(b / (data.length / 4));

            // Set the background color of the page
            // document.body.style.background = "rgba(" + r + "," + g + "," + b + ",.2)";
        }
    } catch (error) {
        console.log('Error fetching images')
    }
}

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
let crops = $('.unspoken-smart-image-cropper');
for (let crop of crops) {
    let viewImage = $(crop).find('img');
    let canvas = $(crop).find('canvas');
    if ($(crop).hasClass('unspoken-autoResize')) {
        smartCropping($(crop), canvas, viewImage, true, convertRemToPixels(9), convertRemToPixels(19));
    } else {
        smartCropping($(crop), canvas, viewImage);
    }
}