/**************************************/
/**  VARIABLES                        */
/**************************************/
// const UL = document.createElement("ul");
// const LI = document.createElement("li");

const TO_UPDATE_CPU = document.getElementById("to_update_cpu");
const UPDATE_CPU = document.getElementById("update_cpu");

const TO_UPDATE_MEMORY = document.getElementById("to_update_memory");
const UPDATE_MEMORY = document.getElementById("update_memory");

const TO_UPDATE_DISK = document.getElementById("to_update_disk");
const UPDATE_DISK = document.getElementById("update_disk");

const TO_UPDATE_UPTIME = document.getElementById("to_update_uptime");
const UPDATE_UPTIME = document.getElementById("update_uptime");

const TO_UPDATE_NETWORK = document.getElementById("to_update_network");
const UPDATE_NETWORK = document.getElementById("update_network");

/**************************************/
/** Event Listeners                   */
/**************************************/

UPDATE_CPU.addEventListener("click", get_cpu);;
UPDATE_MEMORY.addEventListener("click", get_memory);
UPDATE_DISK.addEventListener("click", get_disk);
UPDATE_UPTIME.addEventListener("click", get_uptime);
UPDATE_NETWORK.addEventListener("click", get_network);

verif();// verifie si on est connecter en temp qu'admin

/**************************************/
/** Functions                         */
/**************************************/
function get_cookie(name) {
// ============================================================
// Fonction qui return la valeur du cookie qui correspond au token du serveur
// en param le nom "key" du cookie
// ============================================================
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key == name) {
            return value;
        }
    }
}

function verif() {
// ============================================================
// Fonction qui vérifie qu'il y a bien le cookie token 
// ============================================================
    if (document.cookie) {
        afficherAlerte("Vous êtes connecter en tant qu'Administrateur", "success");
        UPDATE_NETWORK.ariaDisabled = "false";
        UPDATE_NETWORK.className = "btn btn-outline-success";

    } else {
        afficherAlerte("Vous n'êtes pas connecter ! Vous n'aurez pas acces a tous. <a href=../login.html>Login</a>", "secondary");
    }
}

function get_cpu() {
    console.log("CPU Appelle");
    param = "CPU"
    get("https://cheveux-bleus.fr:16800/system/cpu", param);
}

function get_memory() {
    console.log("MEMORY appelle");
    param = "MEMORY"
    get("https://cheveux-bleus.fr:16800/system/memory", param);
}

function get_disk() {
    console.log("DISK appelle");
    param = "DISK";
    get("https://cheveux-bleus.fr:16800/system/disk", param);
}

function get_uptime() {
    console.log("UPTIME Appelle");
    param = "UPTIME";
    get("https://cheveux-bleus.fr:16800/system/uptime", param);
}

// Fonction admin

function get_network() {
    console.log("NETWORK Appelle");
    param = "NETWORK";
    token = get_cookie("token_access");
    get("https://cheveux-bleus.fr:16800/network/connections", param, token);
}

function get_log_api_today(){
    console.log("LOG API TODAY");
    param = "API_TODAY";
    token = get_cookie("token_access");
    get("https://cheveux-bleus.fr:16800/log/api/today_ip", param, token);
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

}
/**************************************/
/** Appelle API                       */
/**************************************/


function get(url, param, token)
// ============================================================
// Fonction pour effectuer une requête HTTP GET vers une URL donnée.
// Paramètres d'entrée :
// - url (string) : L'URL de la ressource à laquelle effectuer la requête.
// La fonction utilise un objet XMLHttpRequest pour envoyer la requête.
// ============================================================
{
    console.log("URL appelle");
    const XHR = new XMLHttpRequest();
    XHR.param = param;
    XHR.onreadystatechange = statechange;
    XHR.open("GET", url);
    XHR.setRequestHeader("Accept", "application/json");
    XHR.setRequestHeader("Authorization", `Bearer ${token}`);
    XHR.send();
}
function statechange(event) {
    console.log("StateChange appelle");
    const XHR = event.target;

    switch (XHR.readyState) {
        case 0: console.log("Requête non initialisée"); break
        case 1: console.log("Connexion établie avec le serveur"); break;
        case 2: console.log("Requête reçue"); break;
        case 3: console.log("Requête en cours de traitement"); break;
        case 4:
            console.log("Requête terminée et réponse prête");

            if (XHR.status == 200) {
                console.log("Traitement local de la réponse");

                let reponse_brut = XHR.responseText;
                let reponse_objet = JSON.parse(reponse_brut);
                console.log(reponse_objet);

                switch (XHR.param) {

                    case "CPU":
                        console.log("Reponse CPU : " + XHR.param);
                        TO_UPDATE_CPU.innerHTML = "";
                        // Mise à jour du contenu HTML
                        // Parcoure dictionnaire
                        for (let [index, nom] of Object.entries(reponse_objet)) {
                            if (typeof nom === "object" && !Array.isArray(nom)) {
                                // Si la valeur est un objet, on parcourt ses propriétés
                                TO_UPDATE_CPU.innerHTML += `<strong>${index} :</strong><br>`;
                                for (let [subIndex, subNom] of Object.entries(nom)) {
                                    TO_UPDATE_CPU.innerHTML += `&nbsp;&nbsp;- ${subIndex}: ${subNom}<br>`;
                                }
                            } else {
                                // Affichage direct pour les valeurs primitives
                                TO_UPDATE_CPU.innerHTML += `<strong>${index} :</strong> ${nom}<br>`;
                            }
                        }
                        break;

                    case "MEMORY":
                        console.log("Reponse MEMORY" + XHR.param);
                        // reset de la memory
                        TO_UPDATE_MEMORY.innerHTML = "";

                        // On parcoure le dictionnaire
                        for (let [index, nom] of Object.entries(reponse_objet)) {

                            // On affiche l'index et le nom
                            TO_UPDATE_MEMORY.innerHTML += `<strong>${index} : </strong> ${nom}<br>`;
                        }
                        break;

                    case "DISK":
                        console.log("Reponse DISK" + XHR.param);

                        TO_UPDATE_DISK.innerHTML = "";

                        for (let [index, nom] of Object.entries(reponse_objet)) {

                            TO_UPDATE_DISK.innerHTML += `<strong>${index} : </strong> ${nom}<br>`;
                        }
                        break;

                    case "UPTIME":
                        console.log("Reponse UPTIME" + XHR.param);
                        TO_UPDATE_UPTIME.innerHTML = "";

                        for (let [key, valeur] of Object.entries(reponse_objet)) {

                            TO_UPDATE_UPTIME.innerHTML += `<strong>${key} : </strong> ${valeur}<br>`;
                        }
                        break;

                    case "NETWORK":
                        console.log("Reponse NETWORK" + XHR.param);
                        TO_UPDATE_NETWORK.innerHTML = "";



                        let ul = document.querySelector("#to_update_network");
                        ul = document.createElement("ul");
                        TO_UPDATE_NETWORK.appendChild(ul);
                        // Ajoute la liste au document

                        // Parcourir les données et créer une nouvelle balise <li> pour chaque objet
                        reponse_objet.forEach((item, index) => {
                            let li = document.createElement("li"); // Crée un élément <li>
                            li.textContent = `Item ${index + 1}: Local Address: ${item.local_address.join(", Port:")} | Status: ${item.status}`;
                            ul.appendChild(li); // Ajoute chaque élément <li> à la liste <ul>
                        });


                }
            }
    }
}