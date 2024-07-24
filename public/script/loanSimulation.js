document.getElementById('loan-simulation-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        cpf: document.getElementById('cpf').value,
        fullName: document.getElementById('full-name').value,
        email: document.getElementById('email').value,
        loanAmount: document.getElementById('loan-amount').value,
        term: document.getElementById('term').value,
        offerSmsWhatsappEmail: document.getElementById('offer-sms-whatsapp-email').checked,
        offerDaycoval: document.getElementById('offer-daycoval').checked,
        offerPartners: document.getElementById('offer-partners').checked
    };

    // Verifique se está em produção ou desenvolvimento
    const url = window.location.hostname === 'localhost' ? 'http://localhost:3000/send-email' : 'https://loan-simulation.vercel.app/send-email';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = data.message;
    })
    .catch(error => {
        document.getElementById('result').textContent = 'Erro ao enviar a simulação.';
    });
});
