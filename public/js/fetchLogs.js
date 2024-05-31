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
                    logDiv.innerHTML = `<span class="Attaque">${log.type}</span><span class="message">${log.message}</span>`;
                    logsContainer.appendChild(logDiv);
                });
            })
            .catch(error => console.error('Error fetching logs:', error));
    }

    fetchLogs();
});