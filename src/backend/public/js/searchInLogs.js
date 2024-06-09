document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');

    // Fonction pour filtrer les logs
    window.filterLogs = function(term) {
        const logs = document.querySelectorAll('.log');
        logs.forEach(function(log) {
            const ts = log.querySelector('.method').textContent.toLowerCase();
            const level = log.querySelector('.ruleId').textContent.toLowerCase();
            const message = log.querySelector('.message').textContent.toLowerCase();

            if (
                ts.includes(term) ||
                level.includes(term) ||
                message.includes(term)
            ) {
                log.style.display = 'block';
            } else {
                log.style.display = 'none';
            }
        });
    };

    // Écouter les entrées de recherche
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        filterLogs(searchTerm);
    });
});