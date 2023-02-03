document.querySelectorAll('.add-remove-button').forEach(button => {
    button.addEventListener('click', e => {
        if (button.classList.contains('inactive')) {
            button.classList.remove('active', 'inactive');
            button.classList.add('active');
        } else {
            if (button.classList.contains('active')) {
                button.classList.add('inactive');
            }
        }
        if (!button.classList.contains('active')) {
            button.classList.add('active');
        }
    });
});