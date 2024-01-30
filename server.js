const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const cors = require('cors');
app.use(express.json());
app.use(express.static(__dirname)); // Servez statiquement le répertoire actuel
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',//admin
  password: 'piscine',//piscine
  database: 'manage_pool'
})
db.connect((err) => {
  if(err){
    console.error('Erreur de connexion à la base de données:',err);
    return;
  }
  console.log('Connexion a la base de données réussie');
});

// Endpoint pour la connexion (POST)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de la connexion à la base de données:', err);
        res.status(500).json({ success: false, message: 'Erreur du serveur' });
        return;
      }

      if (results.length > 0) {
        const hashedPassword = results[0].password_hash;

        // Comparaison du mot de passe fourni avec le mot de passe haché stocké
        bcrypt.compare(password, hashedPassword, (bcryptErr, bcryptRes) => {
          if (bcryptErr) {
            console.error('Erreur lors de la comparaison des mots de passe:', bcryptErr);
            res.status(500).json({ success: false, message: 'Erreur du serveur' });
            return;
          }

          if (bcryptRes) {
            res.json({ success: true, message: 'Connexion réussie' });
          } else {
            res.json({ success: false, message: 'Identifiants incorrects' });
          }
        });
      } else {
        res.json({ success: false, message: 'Identifiants incorrects' });
      }
    }
  );
});

// Endpoint pour la création d'utilisateur (POST)
// Endpoint pour la création d'utilisateur (POST)
app.post('/createUser', (req, res) => {
  const { username, password } = req.body;

  // Vérifier si le nom d'utilisateur existe déjà
  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Erreur lors de la vérification du nom d\'utilisateur:', checkErr);
        res.status(500).json({ success: false, message: 'Erreur du serveur' });
        return;
      }

      if (checkResults.length > 0) {
        // Le nom d'utilisateur existe déjà, retourner une erreur
        res.json({ success: false, message: 'Ce nom d\'utilisateur est déjà pris' });
      } else {
        // Le nom d'utilisateur n'existe pas, continuer avec la création de l'utilisateur

        // Hash du mot de passe avec bcrypt
        bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
          if (hashErr) {
            console.error('Erreur lors du hachage du mot de passe:', hashErr);
            res.status(500).json({ success: false, message: 'Erreur du serveur' });
            return;
          }

          // Logique de création d'utilisateur dans la base de données
          db.query(
            'INSERT INTO users (username, password_hash) VALUES (?, ?)',
            [username, hashedPassword],
            (dbErr) => {
              if (dbErr) {
                console.error('Erreur lors de la création de l\'utilisateur:', dbErr);
                res.status(500).json({ success: false, message: 'Erreur du serveur' });
                return;
              }

              res.json({ success: true, message: 'Utilisateur créé avec succès' });
            }
          );
        });
      }
    }
  );
});


app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
