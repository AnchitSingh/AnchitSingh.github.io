const heartButton = document.querySelector('.heart-button');

heartButton.addEventListener('click', function () {

    heartButton.classList.add('active');

    if (heartButton.classList.contains('active')) {
        if (!heartButton.classList.contains('fallow')) {
            heartButton.classList.add('fallow');

        } else {
            heartButton.classList.remove('fallow');

        }
    }
});