// js/script.js

// Sélectionnez le bouton par son ID
var bouton = document.getElementById("monBouton");
var imageAffichee = document.getElementById("imageAffichee");

// Ajoutez un écouteur d'événement pour le clic sur le bouton
bouton.addEventListener("click", function() {
    // Inversez la visibilité de l'image
    if (imageAffichee.style.display === "none") {
        imageAffichee.style.display = "block";
    } else {
        imageAffichee.style.display = "none";
    }
});
