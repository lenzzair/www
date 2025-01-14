// LEGENDE DES COMMENTAIRES

// ============================================================   FONCTION PRINCIPALE

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::   FONCTION SECONDAIRE / REPONSE PLUGIN ASHYNCHRONE

// ------------------------------------------------------------   FONCTION CALLBACK

// ************************************************************   COMPARTIMENTAGE DU CODE

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   FONCTION LIER A CORDOVA

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   FONCTION APPELLE D'API



/**************************************/
/**  VARIABLES                        */
/**************************************/


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

const TO_UPDATE_LOG_API_TD = document.getElementById("to_update_log_api_td");
const UPDATE_LOG_API = document.getElementById("update_log_api_td");


const TO_UPDATE_LOG_API_WK = document.getElementById("to_update_log_api_wk");
const UPDATE_LOG_API_WK = document.getElementById("update_log_api_wk");

const TO_UPDATE_LOG_APACHE_TD = document.getElementById("to_update_log_apache_td");
const UPDATE_LOG_APACHE_TD = document.getElementById("update_log_apache_td");

const TO_UPDATE_LOG_APACHE_WK = document.getElementById("to_update_log_apache_wk");
const UPDATE_LOG_APACHE_WK = document.getElementById("update_log_apache_wk");

const ARCHIVE_CPU = document.getElementById("cpu");
const ARCHIVE_MEMORY = document.getElementById("memory");
const ARCHIVE_DISK = document.getElementById("disk");
const ARCHIVE_UPTIME = document.getElementById("uptime");
const ARCHIVE_NETWORK = document.getElementById("network");
const ARCHIVE_TODAY_API = document.getElementById("log_api_td");
const ARCHIVE_WEEK_API = document.getElementById("log_api_wk");
const ARCHIVE_TODAY_APACHE = document.getElementById("log_apache_td");
const ARCHIVE_WEEK_APACHE = document.getElementById("log_apache_wk");

// Variables globales (temporaires) pour les archives

let temp_cpu, temp_memory, temp_disk, temp_uptime, temp_network, temp_log_api_td, temp_log_api_wk, temp_log_apache_td, temp_log_apache_wk;
/**************************************/
/** Event Listeners                   */
/**************************************/

UPDATE_CPU.addEventListener("click", get_cpu);;
UPDATE_MEMORY.addEventListener("click", get_memory);
UPDATE_DISK.addEventListener("click", get_disk);
UPDATE_UPTIME.addEventListener("click", get_uptime);
UPDATE_NETWORK.addEventListener("click", get_network);
UPDATE_LOG_API.addEventListener("click", get_log_api_today);
UPDATE_LOG_API_WK.addEventListener("click", get_log_api_week);
UPDATE_LOG_APACHE_TD.addEventListener("click", get_log_apache_today);
UPDATE_LOG_APACHE_WK.addEventListener("click", get_log_apache_week);

ARCHIVE_CPU.addEventListener("click", put_archive_alert);
ARCHIVE_DISK.addEventListener("click", put_archive_alert);
ARCHIVE_MEMORY.addEventListener("click", put_archive_alert);
ARCHIVE_UPTIME.addEventListener("click", put_archive_alert);
ARCHIVE_NETWORK.addEventListener("click", put_archive_alert);
ARCHIVE_TODAY_API.addEventListener("click", put_archive_alert);
ARCHIVE_WEEK_API.addEventListener("click", put_archive_alert);
ARCHIVE_TODAY_APACHE.addEventListener("click", put_archive_alert);
ARCHIVE_WEEK_APACHE.addEventListener("click", put_archive_alert);



verif();// verifie si on est connecter en temp qu'admin

/*****************************************************/
/** Functions TOKEN                                  */
/*****************************************************/

function get_cookie(name) {
    // ============================================================
    // Fonction qui return la valeur du cookie qui correspond au token du serveur
    // en param le nom "key" du cookie
    // ============================================================
    verif();
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

        UPDATE_NETWORK.className = "btn btn-success";
        UPDATE_LOG_API.className = "btn btn-success";
        UPDATE_LOG_API_WK.className = "btn btn-success";
        UPDATE_LOG_APACHE_TD.className = "btn btn-success";
        UPDATE_LOG_APACHE_WK.className = "btn btn-success";

    } else {

        afficherAlerte("Vous n'êtes pas connecter ! Vous n'aurez pas acces a tous. <a href=../login.html>Login</a>", "secondary");
    }
}

function afficherAlerte(message, type) {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // Fonction pour afficher une alerte Bootstrap.
    // Paramètres d'entrée :
    // - message (string) : Le message à afficher dans l'alerte.
    // - type (string) : Le type de l'alerte (danger, warning, info, success).
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

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

// ************************************************************
// Fonction Appelle API
// ************************************************************

function get_cpu() {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Appelle API qui récupère le CPU en temps réel du serveur
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    console.log("CPU Appelle");
    param = "CPU"
    get("https://cheveux-bleus.fr:16800/system/cpu", param);
}

function get_memory() {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Appelle API qui récupère la Mémoire en temps réel du serveur
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    console.log("MEMORY appelle");
    param = "MEMORY"
    get("https://cheveux-bleus.fr:16800/system/memory", param);
}

function get_disk() {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Appelle API qui récupère l' espace DISK en temps réel du serveur
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    console.log("DISK appelle");
    param = "DISK";
    get("https://cheveux-bleus.fr:16800/system/disk", param);
}

function get_uptime() {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Appelle API qui récupère le temps depuis le dernier reboot du serveur
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    console.log("UPTIME Appelle");
    param = "UPTIME";
    get("https://cheveux-bleus.fr:16800/system/uptime", param);
}

// Fonction admin

function get_network() {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //  ! PARTIE ADMIN ! Besoin d'une autehentification avec le token
    // Appelle API qui récupère les connection tcp/udp et les port en écoute en temps réel du serveur
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    verif();
    console.log("NETWORK Appelle");
    param = "NETWORK";
    token = get_cookie("token_access");
    get("https://cheveux-bleus.fr:16800/network/connections", param, token);
}

function get_log_api_today() {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //  ! PARTIE ADMIN ! Besoin d'une autehentification avec le token
    // Appelle API qui récupère les logs de l'api du jour en temps réel du serveur
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    console.log("LOG API TODAY");
    param = "API_TODAY";
    token = get_cookie("token_access");
    get("https://cheveux-bleus.fr:16800/log/api/today_ip", param, token);
}

function get_log_api_week() {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //  ! PARTIE ADMIN ! Besoin d'une autehentification avec le token
    // Appelle API qui récupère les logs de l'api de la semaine sauf celle du jour en temps réel du serveur
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    console.log("LOG API WEEK");
    param = "API_WEEK";
    token = get_cookie("token_access");
    get("https://cheveux-bleus.fr:16800/log/api/week_ip", param, token);
}

function get_log_apache_today() {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //  ! PARTIE ADMIN ! Besoin d'une autehentification avec le token
    // Appelle API qui récupère les logs de l'apache du jour en temps réel du serveur
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    console.log("LOG APACHE TODAY");
    param = "APACHE_TODAY";
    token = get_cookie("token_access");
    get("https://cheveux-bleus.fr:16800/log/apache/connexion_web/today", param, token);
}

function get_log_apache_week() {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //  ! PARTIE ADMIN ! Besoin d'une autehentification avec le token
    // Appelle API qui récupère les logs de l'apache de la semaine en temps réel du serveur
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    console.log("LOG APACHE WEEK");
    param = "APACHE_WEEK";
    token = get_cookie("token_access");
    get("https://cheveux-bleus.fr:16800/log/apache/connexion_web/week", param, token);
}




/**************************************/
/** FONTION XML HTTPREQUEST           */
/**************************************/


function get(url, param, token)
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Fonction pour effectuer une requête HTTP GET vers une URL donnée.
// Paramètres d'entrée :
// - url (string) : L'URL de la ressource à laquelle effectuer la requête.
// La fonction utilise un objet XMLHttpRequest pour envoyer la requête.
// - param (object) : Paramètres supplémentaires (actuellement inutilisés ici).
// - token (string) : Jeton d'authentification pour l'en-tête Authorization.
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
                        ARCHIVE_CPU.style.display = "block";
                        temp_cpu = reponse_brut;

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
                        ARCHIVE_MEMORY.style.display = "block";
                        temp_memory = reponse_brut;

                        break;

                    case "DISK":
                        console.log("Reponse DISK" + XHR.param);

                        TO_UPDATE_DISK.innerHTML = "";

                        for (let [index, nom] of Object.entries(reponse_objet)) {

                            TO_UPDATE_DISK.innerHTML += `<strong>${index} : </strong> ${nom}<br>`;
                        }
                        ARCHIVE_DISK.style.display = "block";
                        temp_disk = reponse_brut;
                        break;

                    case "UPTIME":
                        console.log("Reponse UPTIME :" + XHR.param);
                        TO_UPDATE_UPTIME.innerHTML = "";

                        for (let [key, valeur] of Object.entries(reponse_objet)) {

                            TO_UPDATE_UPTIME.innerHTML += `<strong>${key} : </strong> ${valeur}<br>`;
                        }
                        ARCHIVE_UPTIME.style.display = "block";
                        temp_uptime = reponse_brut;
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
                        ARCHIVE_NETWORK.style.display = "block";
                        temp_network = reponse_brut;
                        break;

                    case "API_TODAY":
                        console.log("Reponse Log api today" + XHR.param);
                        TO_UPDATE_LOG_API_TD.innerHTML = "";

                        for (let [index, nom] of Object.entries(reponse_objet)) {

                            // On affiche l'index et le nom
                            TO_UPDATE_LOG_API_TD.innerHTML += `<strong>Les adresses IP qui se sont connecter aujourd'hui: </strong> ${nom}<br>`;
                        }
                        ARCHIVE_TODAY_API.style.display = "block";
                        temp_log_api_td = reponse_brut;
                        break;

                    case "API_WEEK":
                        console.log("Reponse Log api week" + XHR.param);
                        TO_UPDATE_LOG_API_WK.innerHTML = "";

                        for (let [index, nom] of Object.entries(reponse_objet)) {

                            // On affiche l'index et le nom

                            TO_UPDATE_LOG_API_WK.innerHTML += `<strong>Les adresses IP qui se sont connecter cette semaine: </strong> ${nom}<br>`;

                        }
                        ARCHIVE_WEEK_API.style.display = "block";
                        temp_log_api_wk = reponse_brut;
                        break;

                    case "APACHE_TODAY":

                        console.log("Reponse Log apache today" + XHR.param);
                        TO_UPDATE_LOG_APACHE_TD.innerHTML = "";

                        // Parcoure dictionnaire
                        for (let [index, nom] of Object.entries(reponse_objet)) {
                            if (typeof nom === "object" && !Array.isArray(nom)) {
                                // Si la valeur est un objet, on parcourt ses propriétés
                                TO_UPDATE_LOG_APACHE_TD.innerHTML += `<strong>${index} :</strong><br>`;

                                for (let [subIndex, subNom] of Object.entries(nom)) {
                                    TO_UPDATE_LOG_APACHE_TD.innerHTML += `&nbsp;&nbsp;- ${subIndex}: ${subNom}<br>`;
                                }
                            } else {
                                // Affichage direct pour les valeurs primitives
                                TO_UPDATE_LOG_APACHE_TD.innerHTML += `<strong>${index} :</strong> ${nom}<br>`;
                            }
                        }
                        ARCHIVE_TODAY_APACHE.style.display = "block";
                        temp_log_apache_td = reponse_brut;
                        break;

                    case "APACHE_WEEK":
                        console.log("Reponse Log apache week" + XHR.param);
                        TO_UPDATE_LOG_APACHE_WK.innerHTML = "";

                        // Parcoure dictionnaire
                        for (let [index, nom] of Object.entries(reponse_objet)) {
                            if (typeof nom === "object" && !Array.isArray(nom)) {
                                // Si la valeur est un objet, on parcourt ses propriétés
                                TO_UPDATE_LOG_APACHE_WK.innerHTML += `<strong>${index} :</strong><br>`;
                                for (let [subIndex, subNom] of Object.entries(nom)) {
                                    TO_UPDATE_LOG_APACHE_WK.innerHTML += `&nbsp;&nbsp;- ${subIndex}: ${subNom}<br>`;
                                }
                            } else {
                                // Affichage direct pour les valeurs primitives
                                TO_UPDATE_LOG_APACHE_WK.innerHTML += `<strong>${index} :</strong> ${nom}<br>`;
                            }
                        }
                        ARCHIVE_WEEK_APACHE.style.display = "block";
                        temp_log_apache_wk = reponse_brut;
                        break;
                }
            }
    }
}

/**************************************************************************/
/** ARCHIVE                                                               */
/**************************************************************************/
let event_archive;


function put_archive(id_archivage) {
    // ============================================================
    // Fonction qui permet d'archiver les données dans le localstorage
    // ============================================================
    console.log("=======put_archive=======");
    console.log(id_archivage);

    let now = new Date();
    // Récupérer les composants de la date
    let day = String(now.getDate()).padStart(2, '0'); // Jour avec zéro initial
    let month = String(now.getMonth() + 1).padStart(2, '0'); // Mois avec zéro initial (getMonth() commence à 0)
    let year = now.getFullYear(); // Année complète
    // Construire la date au format souhaité
    let formattedDate = `${day}/${month}/${year}`;


    let info_archive;

    switch (id_archivage) {
        case "cpu":
            info_archive = temp_cpu;
            break;

        case "memory":
            info_archive = temp_memory;
            break;
        case "disk":
            info_archive = temp_disk;
            break;
        case "uptime":
            info_archive = temp_uptime;
            break;
        case "network":
            info_archive = temp_network;
            break;
        case "log_api_td":
            info_archive = temp_log_api_td;
            break;
        case "log_api_wk":
            info_archive = temp_log_api_wk;
            break;
        case "log_apache_td":
            info_archive = temp_log_apache_td;
            break;
        case "log_apache_wk":
            info_archive = temp_log_apache_wk;
            break;

    }
    console.log(info_archive);
    console.log(temp_cpu);

    localStorage.setItem("archive_" + id_archivage + "_" + formattedDate, info_archive);

    console.log("Donnée ajouter aux localstorage");

}

function put_archive_alert(event) {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // Fonction qui demande une confirmation avant d'archiver les données
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    console.log("=======put_archive_alert=======");
    console.log("Event : " + event.target.id);

    event_archive = event.target.id;

    navigator.notification.confirm(
        "Confirmez l'archivage de ces donnée?",  // message
        callback_archive,  // callback
        'Archive',  // title
        ['Oui', 'Non']  // buttonName
    );
}

function callback_archive(buttonIndex) {
    // ------------------------------------------------------------
    // Fonction callback pour l'alerte d'archivage
    // ------------------------------------------------------------
    console.log("=======callback_archive=======");
    console.log("Choix fait =  " + buttonIndex + " " + event_archive);

    if (buttonIndex === 1) {
        put_archive(event_archive);

        navigator.notification.alert(
            "Données bien archivé",  // message
            callback_reponse,  // callback
            'Archive',  // title
            'Ok' // buttonName
        );
    }
    if (buttonIndex === 2) {

        navigator.notification.alert(
            "Données non pas été archivé",  // message
            callback_reponse,  // callback
            'Archive',  // title
            'Ok' // buttonName
        );
    }
}

function callback_reponse() {
    // ------------------------------------------------------------
    // callback pour fermer l'alerte
    // ------------------------------------------------------------

    console.log("Alerte fermée");
}