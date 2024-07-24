require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-email', (req, res) => {
    const { cpf, fullName, email, loanAmount, term, offerSmsWhatsappEmail, offerDaycoval, offerPartners } = req.body;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_RECEIVER,
        subject: 'Nova Simulação de Empréstimo',
        text: `
            CPF: ${cpf}
            Nome Completo: ${fullName}
            E-mail: ${email}
            Valor do Empréstimo: R$${loanAmount}
            Prazo: ${term} meses
            Deseja receber ofertas por SMS, WhatsApp e e-mail: ${offerSmsWhatsappEmail ? 'Sim' : 'Não'}
            Aceita as condições do Banco Daycoval: ${offerDaycoval ? 'Sim' : 'Não'}
            Concorda em receber ofertas dos parceiros do Banco Daycoval: ${offerPartners ? 'Sim' : 'Não'}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar o e-mail:', error);
            return res.status(500).json({ error: 'Erro ao enviar o e-mail' });
        }
        res.status(200).json({ message: 'Simulação enviada com sucesso!' });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
