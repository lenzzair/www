// LEGENDE DES COMMENTAIRES

// ============================================================   FONCTION PRINCIPALE

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::   FONCTION SECONDAIRE / REPONSE PLUGIN ASHYNCHRONE

// ------------------------------------------------------------   FONCTION CALLBACK

// ************************************************************   COMPARTIMENTAGE DU CODE

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   FONCTION LIER A CORDOVA

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   FONCTION APPELLE D'API



const BTN_ENVOIE = document.getElementById("btn-envoie");
const EXPIRATION = 30 * 60;

// Boutton submit du formulaire

/**************************************/
/**  Event Listeners                  */
/**************************************/

BTN_ENVOIE.addEventListener("click", post_token);

function post_token() {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   
    // Fonction pour envoyer une requête POST pour obtenir un token
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    console.log("POST token Appelle");
    post("https://cheveux-bleus.fr:16800/token");
}

/**************************************/
/** Appelle API  TOKEN                */
/**************************************/

function post(url) {
    // ============================================================
    // Fonction pour effectuer une requête HTTP POST pour obtenir un token.
    // Paramètres d'entrée :
    // - url (string) : L'URL du endpoint pour générer le token.
    // La fonction utilise un objet XMLHttpRequest pour envoyer la requête.
    // ============================================================
    console.log("POST TOKEN: URL Appelle");

    // Récupération login + mdp
    let login = document.getElementById("login").value;
    let mdp = document.getElementById("Password1").value;

    // Envoie de donnée en x-www-form-urlencoded
    // prépare la requete pour récuperer un token JWT sur le serveur 
    let params =
        "grant_type=password" +
        "&username=" + encodeURIComponent(login) +
        "&password=" + encodeURIComponent(mdp) +
        "&scope=" + encodeURIComponent("") +
        "&client_id=" + encodeURIComponent("string") +
        "&client_secret=" + encodeURIComponent("string");

    const XHR = new XMLHttpRequest();
    XHR.onreadystatechange = statechange;
    XHR.open("POST", url, true);
    XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  // Utilisez uniquement "application/x-www-form-urlencoded"
    XHR.setRequestHeader("Accept", "application/json");  // accepter le JSON


    // Envoie la requête avec les données
    XHR.send(params);

    console.log("Requête envoyée.");
}

function statechange(event) {
    console.log("Statechange POST appelle");
    const XHR = event.target;

    switch (XHR.readyState) {
        case 0:
            console.log("Requête non initialisée");
            break;
        case 1:
            console.log("Connexion établie avec le serveur");
            break;
        case 2:
            console.log("Requête envoyée");
            break;
        case 3:
            console.log("Réponse en cours de réception");
            break;
        case 4:
            console.log("Requête terminée et réponse prête");

            console.log("Statut HTTP :", XHR.status);


            if (XHR.status === 200) {
                console.log("Traitement local de la réponse");

                let reponse = JSON.parse(XHR.responseText);
                console.log(reponse);

                // Appelle la fonction qui rajoute le cookie
                set_cookie(reponse["access_token"]);
                // Appelle la fonction qui affiche une alerte de connection
                afficherAlerte("Vous êtes connecté avec success !", "success");

                document.getElementById("Password1").value = "";

            } else {
                console.error("Erreur :", XHR.status, XHR.responseText);
                // Appelle la fonction qui affiche une alerte de connection
                afficherAlerte("Echec de connexion !", "danger");
            }
            break;
    }
}


function set_cookie(token)
// ============================================================
// Fonction qui set un cookie avec le token utilisateur
// ============================================================
{

    document.cookie = `token_access=${token}; path=/; Max-Age=${EXPIRATION}`;

}

function afficherAlerte(message, type) {
    let alertContainer = document.getElementById("alert-container");

    // Crée une alerte Bootstrap
    let alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    // Ajoute l'alerte au conteneur
    alertContainer.innerHTML = alertHTML;

    // Optionnel : Supprimer automatiquement l'alerte après quelques secondes
    setTimeout(() => {
        alertContainer.innerHTML = ""; // Efface l'alerte après 5 secondes
    }, 10000);
}