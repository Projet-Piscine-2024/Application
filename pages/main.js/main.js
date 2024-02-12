// main.js

function showPage(pageName) {
    // Récupère l'élément content
    var content = document.getElementById('content');

    // Charge le contenu de la page en fonction du nom de la page
    switch (pageName) {
        case 'accueil':
            content.innerHTML = '<h2>Page d\'Accueil</h2><p>Contenu de la page d\'accueil.</p>';
            break;
        case 'gestion':
            content.innerHTML = '<h2>Page de Gestion</h2><p>Contenu de la page de gestion.</p>';
            break;
        case 'compte':
            content.innerHTML = '<h2>Page de Compte</h2><p>Contenu de la page de compte.</p>';
            break;
        default:
            content.innerHTML = ''; // Efface le contenu si le nom de la page n'est pas reconnu
    }
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
