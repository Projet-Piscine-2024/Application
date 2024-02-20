// main.js

function showPage(page) {
    // Masquer toutes les pages
    document.getElementById('accueil').style.display = 'none';
    document.getElementById('gestion').style.display = 'none';
    document.getElementById('compte').style.display = 'none';

    // Afficher la page sélectionnée
    document.getElementById(page).style.display = 'block';
}

// main.js

// Ajoutez cette fonction pour basculer entre le mode normal et le mode sombre
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(!username || !password)
    {
        console.error('Veuillez remplir tous les champs.');
        return;
    }
    // Envoi des données au serveur pour la connexion
    fetch('https://aquasterion.fr:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
	mode : 'cors',
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        // Traitement de la réponse du serveur
        console.log(data);
        // Ajoutez ici la logique de redirection ou d'autres actions après la connexion
    })
    .catch(error => {
        console.error('Erreur lors de la connexion au serveur:', error);
    });
}

function createUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(!username || !password)
    {
        console.error('Veuillez remplir tous les champs.');
        return;
    }
    // Envoi des données au serveur pour la création d'utilisateur
    fetch('https://192.168.0.64:3000/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        // Traitement de la réponse du serveur pour la création d'utilisateur
        console.log(data);
    })
    .catch(error => {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
    });
}
