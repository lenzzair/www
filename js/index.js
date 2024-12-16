// LEGENDE DES COMMENTAIRES

// ============================================================   FONCTION PRINCIPALE

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::   FONCTION SECONDAIRE / REPONSE PLUGIN ASHYNCHRONE

// ------------------------------------------------------------   FONCTION CALLBACK

// ************************************************************   COMPARTIMENTAGE DU CODE

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   FONCTION LIER A CORDOVA

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   FONCTION APPELLE D'API



/**************************************/
/**  VARIABLES                           */
/**************************************/

const TO_UPDATE_TB_NETWORK = document.getElementById("para_network");
const UPDATE_TB_NETWORK = document.getElementById("Tb_network");

const UPDATE_TB_SERVER = document.getElementById("Tb_server");
const TO_UPDATE_TB_SERVER = document.getElementById("para_serveur");

const TO_UPDATE_TB_MAIL = document.getElementById("para_mail");
const UPDATE_TB_MAIL = document.getElementById("Tb_mail");

const TO_UPDATE_TB_ARCHIVE = document.getElementById("para_archive");
const UPDATE_TB_ARCHIVE = document.getElementById("Tb_archive");

const BTN_SUPP = document.getElementById("btn-supp");
const BTN_MAIL = document.getElementById("btn-mail");

const BTN_CONTACT = document.getElementById("btn-contact");
const TO_UPDATE_CONTACT_NUM = document.getElementById("para_contact_num");
const TO_UPDATE_CONTACT_MAIL = document.getElementById("para_contact_mail");

/**************************************/
/** Event Listeners                   */
/**************************************/
document.addEventListener("deviceready", onDeviceReady);
document.addEventListener("pause", onPause);
document.addEventListener("resume", onResume);
document.addEventListener("backbutton", onBackButton);

document.addEventListener("online", onOnline, false);
document.addEventListener("offline", onOffline, false);

UPDATE_TB_NETWORK.addEventListener("click", get_etat_network);
UPDATE_TB_SERVER.addEventListener("click", get_etat_serveur);
UPDATE_TB_MAIL.addEventListener("click", send_mail);
UPDATE_TB_ARCHIVE.addEventListener("click", put_archive);

BTN_SUPP.addEventListener("click", del_archive);
BTN_MAIL.addEventListener("click", send_mail_archive);
BTN_CONTACT.addEventListener("click", search_contact);

/**************************************/
/** Functions                         */
/**************************************/
function onDeviceReady() {
    console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
    console.log("onDeviceReady");

    let tb_btn = document.getElementById("tableau_de_bord");
    tb_btn.style.display = "block";
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function onPause() {
    console.log("onPause");
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function onResume() {
    console.log("onResume");
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function onBackButton() {
    console.log("onBackButton");
}

/**************************************/
/** Fonction du Tableau de Bord       */
/**************************************/


function get_etat_network() {
    // ============================================================
    //Fonction qui permet de connaitre l'etat du réseau de l'utilisateur
    // Utilise le plugin cordova-plugin-network-information
    // Et utilise le plugin cordova-plugin-dialogs -> qui va crée une alerte
    // ============================================================
    console.log("Appell etat _network");

    let networkState = navigator.connection.type;

    let states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    // ALERTE
    navigator.notification.alert(
        'Vous êtes connecter avec : ' + states[networkState],// message
        callback_network,
        'Etat Connexion',            // title
        'Ok'                  // buttonName
    );
}
function callback_network() {
    // ------------------------------------------------------------
    // CALLBACK de l'alerte NETWORK
    // ------------------------------------------------------------
    console.log("Alerte fermée");
}

function onOnline() {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // Réponse si du plugin si l'utilisateur est connecté
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    console.log("Online");

    TO_UPDATE_TB_NETWORK.innerHTML = "Vous êtes Online";
    UPDATE_TB_NETWORK.style.color = "green";
    UPDATE_TB_NETWORK.style.border = "1px solid green";

}

function onOffline() {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // Réponse si du plugin si l'utilisateur est déconnecté
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    console.log("Offline");
    TO_UPDATE_TB_NETWORK.innerHTML = "Vous êtes offline";
    UPDATE_TB_NETWORK.style.color = "red";
    UPDATE_TB_NETWORK.style.border = "1px solid red";
}

function get_etat_serveur() {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Fonction qui permet de connaitre l'etat du serveur en faisant un appel a l'API et vérifie si il y a une réponse
    // Utilise le plugin cordova-plugin-dialogs -> qui va crée une alerte
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    console.log("Appelle etat serveur");
    get("https://cheveux-bleus.fr:16800/docs");

}

function get(url) {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Fonction pour effectuer une requête HTTP GET vers une URL donnée.
    // Paramètres d'entrée :
    // - url (string) : L'URL de la ressource à laquelle effectuer la requête.
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    console.log("URL appelle");
    const XHR = new XMLHttpRequest();
    XHR.onreadystatechange = statechange;
    XHR.open("HEAD", url);
    XHR.send();
}
function statechange(event) {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Fonction qui vérifie l'état de la requête HTTP.
    // Paramètres d'entrée :
    // - event (Event) : L'événement déclencheur de la fonction.
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    const XHR = event.target;
    switch (XHR.readyState) {

        case 0: console.log("Requête non initialisée"); break;
        case 1: console.log("Connexion établie avec le serveur"); break;
        case 2: console.log("Requête reçue"); break;
        case 3: console.log("Requête en cours de traitement"); break;
        case 4:
            console.log("Requête terminée et réponse prête");
            if (XHR.status == 200) {
                console.log("Traitement local de la réponse");
                console.log("serveur accessible")

                navigator.notification.alert(
                    'Le serveur est accessible !',  // message
                    callback_server,            // callback
                    'Etat serveur',            // title
                    'Etat serveur'                  // buttonName
                );
                TO_UPDATE_TB_SERVER.innerHTML = "Serveur accessible";
                UPDATE_TB_SERVER.style.color = "green";
                UPDATE_TB_SERVER.style.border = "1px solid green";

            } else {
                navigator.notification.alert(
                    'Impossible de joindre le serveur !',  // message
                    callback_server,            // callback
                    'Etat serveur',            // title
                    'Etat serveur'                  // buttonName
                );
                UPDATE_TB_SERVER.style.color = "red";
                UPDATE_TB_SERVER.style.border = "1px solid red";
                TO_UPDATE_TB_SERVER.innerHTML = "Serveur inaccessible";
            }
            break;
    }
}
function callback_server() {
    // ------------------------------------------------------------
    // CALLBACK de l'alerte SERVER
    // ------------------------------------------------------------

    console.log("Alerte fermée");
}



/**************************************/
/** ARCHIVE                            */
/**************************************/

function put_archive() {
    // ============================================================
    // Fonction qui permet d'archiver les informations de l'utilisateur grâce a la gestion du localstorage
    // ============================================================

    console.log("Appelle PUT Archive");


    let a, div;
    let i = 1;
    let div_parent = document.getElementById("col1");
    let div_parent_2 = document.getElementById("col2");

    // Récupère le localstorage
    let dico_localStorage = localStorage;

    // Supprime les éléments enfants des divs pour réinitialiser les archives a chaque appel
    while (div_parent.firstChild) {
        div_parent.removeChild(div_parent.firstChild);
        div_parent_2.removeChild(div_parent_2.firstChild);
        console.log("supp");
    }

    // Parcours le localstorage pour afficher les archives
    for (let [key, value] of Object.entries(dico_localStorage)) {
        // Création des éléments HTML pour chaque archive; PARTIE BUTTON
        a = document.createElement("a");
        a.href = "#list-" + i;
        a.innerHTML = key;
        a.classList.add("list-group-item");
        a.classList.add("list-group-item-action");
        a.id = "list-" + i + "-list";
        a.dataset.bsToggle = "list";
        a.role = "tab";
        a.setAttribute("aria-controls", "list-" + i);

        // Création des éléments HTML pour chaque archive; PATIE TEXTE
        div = document.createElement("div");
        div.classList.add("tab-pane");
        div.classList.add("fade");
        div.classList.add("show");
        div.id = "list-" + i;
        div.role = "tabpanel";
        div.setAttribute("aria-labelledby", "list-" + i + "-list");
        div.innerHTML = value;


        document.getElementById("col1").append(a);
        document.getElementById("col2").append(div);

        i++;
    }
}

function get_archive_active() {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // Fonction qui permet de récupérer l'archive active
    // returne: le titre de l'archive et l'élément HTML de l'archive
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    console.log("Appel de get archive active");

    let archives_active = document.querySelectorAll(".active");
    // On récupère tous les éléments actifs donc le titre de l'archive et la div qui est liée au titre

    if (archives_active.length > 0) {
        // On récupère l'id du titre actif qui est la clé du localstorage
        let id_valeur = archives_active[0].id;
        let titre_localstorage = document.getElementById(id_valeur).innerHTML;
        
        return [titre_localstorage, archives_active];
    }
}

function del_archive() {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // Fonction qui permet de supprimer l'archive active
    // fait appel a la fonction get_archive_active pour récupérer l'archive active
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    console.log("Appel de supprimer_archive");

    // recupère le titre de l'archive et l'élément HTML de l'archive avec get_archive_active()
    let [titre_localstorage, archives_a_supprimer] = get_archive_active();

    if (titre_localstorage && archives_a_supprimer.length > 0) {

        // suppression de l'archive dans le localstorage
        localStorage.removeItem(titre_localstorage);

        // suppression de l'archive dans le DOM
        archives_a_supprimer.forEach(archive => {
            archive.classList.remove("active");
            archive.remove();
        });

        navigator.notification.alert(
            "L'archive a été supprimée !",  // message
            callback_del_archive,  // callback
            'Archive',                      // titre
            'OK'                            // nom du bouton
        );
    } else {
        console.error("Pas d'éléments actifs à supprimer.");
    }
}

function callback_del_archive() {
    // ------------------------------------------------------------
    // CALLBACK de l'alerte delete ARCHIVE
    // ------------------------------------------------------------

    console.log("Alerte fermée");
}



// ***********************************************************************************************************************
// FONCTION MAIL
// ***********************************************************************************************************************

let email_contact;

function send_mail(contact, archive_title , archive_content) {
    // ============================================================
    // Fonction qui envoie un mail
    // Utilise le plugin cordova-plugin-email
    // Paramètres d'entrée :
    // - contact (string) : L'adresse mail du destinataire.
    // - archive_title (string) : Le titre de l'archive à envoyer.
    // - archive_content (string) : Le contenu de l'archive à envoyer.
    // ============================================================

    console.log(contact)

    let contact_to_send = contact;
    //Verifie si contact_to_send est une chaine de caractère et si elle est vide
    if (typeof contact_to_send !== 'string' || contact_to_send.trim() === '') {
        contact_to_send = 'sonikpi.log@gmail.com';
        console.log("Contact par défaut");
    }
    // Function qui envoie un mail pour faire un rapport de l'etat du serveurœ
    console.log("appelle SendMail");
    date_ajd = new Date().toISOString().split('T')[0];

    cordova.plugins.email.open({
        to: contact_to_send, // email addresses for TO field
        cc: '', // email addresses for CC field
        subject: '! URGENCE SERVEUR !  ' + archive_title, // subject of the email
        body: 'Rapport Serveur du ' + date_ajd + ":\n\n\n" + archive_content , // email body

    }, callback);

}

function callback(result) {
    // ------------------------------------------------------------
    // CALLBACK de l'envoi de mail
    // ------------------------------------------------------------

    if (result === "OK") {
        console.log("Message envoyer");
        navigator.notification.alert(
            'Email Fonctionne correctement',  // message
            callback_mail,            // callback
            'Etat mail',            // title
            'Ok'                  // buttonName
        );
    } else if (result === 'CANCELLED') {
        console.log('Envoi annulé par l\'utilisateur.');
        navigator.notification.alert(
            'Impossible d envoyer un mail !',  // message
            callback_mail,            // callback
            'Etat mail',            // title
            'Ok'                  // buttonName
        );
    } else {
        console.error('Erreur ou état inconnu :', result);
    }

}
function callback_mail() {
    // ------------------------------------------------------------
    // CALLBACK de l'alerte MAIL
    // ------------------------------------------------------------

    console.log("Alerte fermée");
}

function send_mail_archive() {
    // ============================================================
    // Fonction qui envoie un mail et envoie en pièce jointe l'archive active
    // Utilise le plugin cordova-plugin-email
    // Appelle la fonction get_archive_active
    // ============================================================

    console.log("Appelle SendMail Archive");
    date_ajd = new Date().toISOString().split('T')[0];
    console.log(date_ajd);
    [titre_localstorage, archives_a_envoyer] = get_archive_active();

    id_valeur = archives_a_envoyer[1].id;
    let archive_content;

    if (titre_localstorage && archives_a_envoyer.length > 0) {

        archive_content = document.getElementById(id_valeur).innerHTML;

    }
    let contact = 'sonikpi.log@gmail.com'
    send_mail( contact , titre_localstorage, archive_content);
}

// ****************************************************************************************
// FONCTION CONTACT    --AVEC DES APPELLE MAIL--
// ****************************************************************************************


function search_contact() {
    // ============================================================
    // Fonction qui permet de rechercher un contact dans les contact de l'utilisateur
    // Utilise le plugin cordova-plugin-contacts
    // Récupère le numéro de téléphone et l'adresse mail du contact a partie de son nom
    // ============================================================

    console.log("Appelle search contact");
    let prenom_nom = document.getElementById("floatingInput").value;
    let options = new ContactFindOptions();

    // filtrer les contacts par nom
    options.filter = prenom_nom;
    options.multiple = true;
    let fields = ["displayName", "name", "phoneNumbers", "emails"];
    navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts) {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // Réponse du plugin si il trouve des contacts
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    console.log("Appelle onSuccess");
    console.log(contacts.length + 'contacts trouvés');



    for (let i = 0; i < contacts.length; i++) {
        console.log("Nom = " + contacts[i].displayName);

        if (contacts[i].phoneNumbers) {

            console.log("Numéro de téléphone = " + contacts[i].phoneNumbers[0].value);

            TO_UPDATE_CONTACT_NUM.innerHTML = "Numéro de téléphone = " + contacts[i].phoneNumbers[0].value + "\n\n";

        }

        if (contacts[i].emails) {

            console.log("Email = " + contacts[i].emails[0].value);
            TO_UPDATE_CONTACT_MAIL.innerHTML = "Email = " + contacts[i].emails[0].value + "\n\n";

            email_contact = contacts[i].emails[0].value;
        }

        navigator.notification.confirm(
            'Numéro de téléphone = ' + contacts[i].phoneNumbers[0].value + "\n" + contacts[i].emails[0].value + "\n\nEnvoyer un mail ?\n",  // message
            callback_confirm,            // callback
            'Contact',            // title
            ['Envoyer Mail', 'Annulé']                  // buttonName
        );
    }

}

function onError(contactError) {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // Réponse du plugin si il ne trouve pas de contact
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    console.error("Erreur lors de la recherche de contacts : " + contactError);
}

function callback_confirm(buttonIndex) {
    // ------------------------------------------------------------
    // CALLBACK de l'alerte.CONFIRM CONTACT
    // Si l'utilisateur appuie sur le bouton "Envoyer Mail" alors on appelle la fonction send_mail
    // paramètre d'entrée : buttonIndex (int) : l'index du bouton sur lequel l'utilisateur a appuyé
    // Envoie a send_mail() l'adresse mail du contact trouver
    // ------------------------------------------------------------

    console.log("Callback confirm");
    console.log(buttonIndex);
    console.log(email_contact);

    if (buttonIndex === 1) {
        send_mail(email_contact);
    } else {
        console.log("Annulé");
    }

}

