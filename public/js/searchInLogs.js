document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');

    // Fonction pour filtrer les logs
    window.filterLogs = function(term) {
        const logs = document.querySelectorAll('.log');
        logs.forEach(function(log) {
            const method = log.querySelector('.method').textContent.toLowerCase();
            const fullUrl = log.querySelector('.fullUrl').textContent.toLowerCase();
            const body = log.querySelector('.body').textContent.toLowerCase();
            const ruleId = log.querySelector('.ruleId').textContent.toLowerCase();
            const action = log.querySelector('.action').textContent.toLowerCase();
            const message = log.querySelector('.message').textContent.toLowerCase();

            if (
                method.includes(term) || 
                fullUrl.includes(term) || 
                body.includes(term) || 
                ruleId.includes(term) || 
                action.includes(term) || 
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