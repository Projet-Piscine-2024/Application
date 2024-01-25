const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Servez statiquement le répertoire actuel

// Endpoint pour la page de connexion (GET)
app.get('/login', (req, res) => {
  const filePath = path.join(__dirname, 'login.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier login.html:', err);
      res.status(500).send('Erreur du serveur');
      return;
    }
    res.send(data);
  });
});

// Endpoint pour la connexion (POST)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Logique de connexion à la base de données
  res.json({ success: true, message: 'Connexion réussie (mode test sans BDD)' });
});

// Endpoint pour la création d'utilisateur (POST)
app.post('/createUser', (req, res) => {
  const { username, password } = req.body;
  // Logique de création d'utilisateur (à adapter pour votre utilisation)
  res.json({ success: true, message: 'Utilisateur créé avec succès (mode test sans BDD)' });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
