const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors({
    origin: 'https://adolfo-html.github.io'
}));

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Nodemailer API for sending emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    // Mail data
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `adolfo-html.github.io: ${name} sent a message`,
        text: "email: " + email + "\n" + message
    };
    
    // Error handling & console log
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent!');
        }
    });

    // Nodemailer end

    res.send('Email sent!');
});

const PORT = process.env.PORT; // Add || 3000 for local stuff
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));