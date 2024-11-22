console.log("JS charger");
const BTN_ENVOIE = document.getElementById("btn-envoie");
// Boutton submit du formulaire

/**************************************/
/**  Event Listeners                  */
/**************************************/

BTN_ENVOIE.addEventListener("click", post_token);

function post_token() {
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
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("username", login);
    params.append("password", mdp);
    params.append("scope", "");
    params.append("client_id", "string");
    params.append("client_secret", "string");

    console.log("Données envoyées :", params.toString()); // Données à envoyer

    const XHR = new XMLHttpRequest();
    XHR.onreadystatechange = statechange;
    XHR.open("POST", url, true);
    XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  // Utilisez uniquement "application/x-www-form-urlencoded"
    XHR.setRequestHeader("Accept", "application/json");  // Ajoutez "Accept" pour accepter le JSON

    console.log("En-têtes configurés : Content-Type et Accept");

    // Envoie la requête avec les données
    XHR.send(params.toString()); // Paramètres encodés comme x-www-form-urlencoded
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
            console.log("Réponse brute :", XHR.responseText);

            if (XHR.status === 200) {
                console.log("Traitement local de la réponse");

                let reponse = JSON.parse(XHR.responseText);

                console.log("Token obtenue: " + reponse.access_token);
            } else {
                console.error("Erreur :", XHR.status, XHR.responseText);
            }
            break;
    }
}
