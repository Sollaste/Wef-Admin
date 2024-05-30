document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = new URLSearchParams(formData);

        fetch(form.action, {
            method: form.method,
            body: data,
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.text();
        })
        .then(result => {
            errorMessage.style.display = 'none';
            window.location.href = '/dashboard';
        })
        .catch(error => {
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = error.message;
        });
    });
});
