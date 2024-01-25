// login.js

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Envoi des données au serveur pour la connexion
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
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

    // Envoi des données au serveur pour la création d'utilisateur
    fetch('http://localhost:3000/createUser', {
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
