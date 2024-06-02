document.addEventListener('DOMContentLoaded', function() {
    const logsContainer = document.querySelector('.log-box');

    // Fonction pour récupérer et afficher les logs
    function fetchLogs() {
        fetch('/api/logs')
            .then(response => response.json())
            .then(logs => {
                logsContainer.innerHTML = '';
                logs.forEach(log => {
                    const logDiv = document.createElement('div');
                    logDiv.classList.add('log');
                    logDiv.innerHTML = `
                        <span class="method">${log.method}</span>
                        <span class="fullUrl">${log.fullUrl}</span>
                        <span class="body">${log.body}</span>
                        <span class="ruleId">${log.ruleId}</span>
                        <span class="action">${log.action}</span>
                        <span class="message">${log.message}</span>
                    `;
                    logsContainer.appendChild(logDiv);
                });

                // Réappliquer le filtre de recherche après la mise à jour des logs
                if (typeof window.filterLogs === 'function') {
                    const searchInput = document.getElementById('searchInput');
                    window.filterLogs(searchInput.value.toLowerCase());
                }
            })
            .catch(error => console.error('Erreur en essayant de récupérer les logs :', error));
    }

    // Fetch toutes les 2s
    setInterval(fetchLogs, 2000);

    // Premier fetch
    fetchLogs();
});