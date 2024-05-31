const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const logs = document.querySelectorAll('.log');

    logs.forEach(function(log) {
        const message = log.querySelector('.message').textContent.toLowerCase();
        const type = log.querySelector('.Attaque').textContent.toLowerCase();
        if (message.includes(searchTerm) || type.includes(searchTerm)) {
            log.style.display = 'block';
        } else {
            log.style.display = 'none';
        }
    });
});