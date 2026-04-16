const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware za obradu podataka iz forme
app.use(bodyParser.urlencoded({ extended: true }));

// Serviranje HTML fajla
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta koja prima tekst i upisuje ga u fajl
app.post('/save', (req, res) => {
    const korisnickiTekst = req.body.tekstUnos;

    // Dodavanje teksta u novi red dokumenta 'poruke.txt'
    fs.appendFile('poruke.txt', korisnickiTekst + '\n', (err) => {
        if (err) {
            return res.status(500).send('Greška pri čuvanju fajla.');
        }
        res.send('Tekst je uspešno sačuvan u poruke.txt!');
    });
});

app.listen(PORT, () => {
    console.log(`Server radi na http://localhost:${PORT}`);
});