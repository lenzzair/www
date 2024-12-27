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

const UPDATE_TB_NFC = document.getElementById("Tb_nfc");
const UPDATE_TB_QRCODE = document.getElementById("Tb_qrcode");

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

UPDATE_TB_NFC.addEventListener("click", get_nfc);
// UPDATE_TB_QRCODE.addEventListener("click", get_qrcode);

document.getElementById("nfcDialogCloseButton").addEventListener("click", close_nfc);

/**************************************/
/** Functions                         */
/**************************************/
function onDeviceReady() {
    console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
    console.log("onDeviceReady");

    let tb_btn = document.getElementById("tableau_de_bord");
    tb_btn.style.display = "block";

    document.getElementById("utilisateur").style.display = "block";


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
function callback_alert() {
    console.log("Alerte fermée");
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
        callback_alert,            // callback
        'Etat Connexion',            // title
        'Ok'                  // buttonName
    );
}


function onOnline() {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // Réponse si du plugin si l'utilisateur est connecté
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    console.log("=======Appelle Online========");

    TO_UPDATE_TB_NETWORK.innerHTML = "Vous êtes Online";
    UPDATE_TB_NETWORK.style.color = "green";
    UPDATE_TB_NETWORK.style.border = "2px solid green";

}

function onOffline() {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // Réponse si du plugin si l'utilisateur est déconnecté
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    console.log("=======Appelle Offline=======");
    TO_UPDATE_TB_NETWORK.innerHTML = "Vous êtes offline";
    UPDATE_TB_NETWORK.style.color = "red";
    UPDATE_TB_NETWORK.style.border = "2px solid red";
}

function get_etat_serveur() {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Fonction qui permet de connaitre l'etat du serveur en faisant un appel a l'API et vérifie si il y a une réponse
    // Utilise le plugin cordova-plugin-dialogs -> qui va crée une alerte
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    console.log("=========Appelle Serveur========");
    get("https://cheveux-bleus.fr:16800/docs");

}

function get(url) {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Fonction pour effectuer une requête HTTP GET vers une URL donnée.
    // Paramètres d'entrée :
    // - url (string) : L'URL de la ressource à laquelle effectuer la requête.
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    console.log("=========Appelle GET========");
    const XHR_srv = new XMLHttpRequest();
    XHR_srv.onreadystatechange = statechange_server;
    XHR_srv.open("HEAD", url);
    XHR_srv.send();
}

function statechange_server(event) {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Fonction qui vérifie l'état de la requête HTTP.
    // Paramètres d'entrée :
    // - event (Event) : L'événement déclencheur de la fonction.
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    const XHR_srv = event.target;
    switch (XHR_srv.readyState) {

        case 0: console.log("Requête non initialisée"); break;
        case 1: console.log("Connexion établie avec le serveur"); break;
        case 2: console.log("Requête reçue"); break;
        case 3: console.log("Requête en cours de traitement"); break;
        case 4:
            console.log("Requête terminée et réponse prête");
            if (XHR_srv.status == 200) {
                console.log("Traitement local de la réponse");

                navigator.notification.alert(
                    'Le serveur est accessible !',  // message
                    callback_alert,            // callback
                    'Etat serveur',            // title
                    'Etat serveur'                  // buttonName
                );
                TO_UPDATE_TB_SERVER.innerHTML = "Serveur accessible";
                UPDATE_TB_SERVER.style.color = "green";
                UPDATE_TB_SERVER.style.border = "2px solid green";

            } else {
                navigator.notification.alert(
                    'Impossible de joindre le serveur !',  // message
                    callback_alert,            // callback
                    'Etat serveur',            // title
                    'Etat serveur'                  // buttonName
                );
                UPDATE_TB_SERVER.style.color = "red";
                UPDATE_TB_SERVER.style.border = "2px solid red";
                TO_UPDATE_TB_SERVER.innerHTML = "Serveur inaccessible";
            }
            break;
    }
}

/************************************************************************************************************************************/
/** ARCHIVE                                                                                                                         */
/************************************************************************************************************************************/

function put_archive() {
    // ============================================================
    // Fonction qui permet d'archiver les informations de l'utilisateur grâce a la gestion du localstorage
    // Parse les information du localstorage pour crée un button et un div pour chaque archive
    // ============================================================

    console.log("========Appelle put_archive========");


    let a, div;
    let i = 1;
    let div_parent = document.getElementById("col1");
    let div_parent_2 = document.getElementById("col2");

    let dico_localStorage = localStorage;


    while (div_parent.firstChild) {
        div_parent.removeChild(div_parent.firstChild);
        div_parent_2.removeChild(div_parent_2.firstChild);

    }

    for (let [key, value] of Object.entries(dico_localStorage)) {

        a = document.createElement("a");
        a.href = "#list-" + i;
        a.innerHTML = key;
        a.classList.add("list-group-item");
        a.classList.add("list-group-item-action");
        a.id = "list-" + i + "-list";
        a.dataset.bsToggle = "list";
        a.role = "tab";
        a.setAttribute("aria-controls", "list-" + i);

        div = document.createElement("div");
        div.classList.add("tab-pane");
        div.classList.add("fade");
        div.classList.add("show");
        div.id = "list-" + i;
        div.role = "tabpanel";
        div.setAttribute("aria-labelledby", "list-" + i + "-list");


        let value_obj = JSON.parse(value);


        for (let [index, val] of Object.entries(value_obj)) {


            if (typeof val === 'object') {
                div.innerHTML += `<strong>${index}</strong> : <br>`;
                for (let [subDicoIndex, subDicoVal] of Object.entries(val)) {
                    div.innerHTML += `<strong> - ${subDicoIndex}</strong> :  ${subDicoVal} <br>`;
                }
            } else {
                div.innerHTML += `<strong>${index}</strong> :  ${val} <br>`;
            }
        }



        document.getElementById("col1").append(a);
        document.getElementById("col2").append(div);

        i++;
    }
}

function get_archive_active() {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // Fonction qui permet de récupérer l'archive active
    // Verifie les boutun et text qui on la class .actif et recupère le titre de l'archive qui est un id

    // returne: le titre de l'archive et l'élément HTML de l'archive
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    console.log("========Appelle get_archive_active========");

    let archives_active = document.querySelectorAll(".active");

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

   
    let [titre_localstorage, archives_a_supprimer] = get_archive_active();

    if (titre_localstorage && archives_a_supprimer.length > 0) {

        localStorage.removeItem(titre_localstorage);

        archives_a_supprimer.forEach(archive => {
            archive.classList.remove("active");
            archive.remove();
        });

        navigator.notification.alert(
            "L'archive a été supprimée !",  // message
            callback_alert,  // callback
            'Archive',                      // titre
            'OK'                            // nom du bouton
        );
    } else {
        console.error("Pas d'éléments actifs à supprimer.");
    }
}


// ****************************************************************************************************************************************************************
// FONCTION MAIL
// ****************************************************************************************************************************************************************

let email_contact;

function send_mail(contact, archive_title, archive_content) {
    // ============================================================
    // Fonction qui envoie un mail
    // Utilise le plugin cordova-plugin-email
    // Paramètres d'entrée :
    // - contact (string) : L'adresse mail du destinataire.
    // - archive_title (string) : Le titre de l'archive à envoyer.
    // - archive_content (string) : Le contenu de l'archive à envoyer.
    // ============================================================

    console.log("========Appelle SendMail========");

    let contact_to_send = contact;
    //Verifie si contact_to_send est une chaine de caractère et si elle est vide
    if (typeof contact_to_send !== 'string' || contact_to_send.trim() === '') {

        contact_to_send = 'sonikpi.log@gmail.com';
        console.log("Contact par défaut");
    }
    
    date_ajd = new Date().toISOString().split('T')[0];

    cordova.plugins.email.open({
        to: contact_to_send, // email addresses for TO field
        cc: '', // email addresses for CC field
        subject: '! URGENCE SERVEUR !  ' + archive_title, // subject of the email
        body: 'Rapport Serveur du ' + date_ajd + ":\n\n\n" + archive_content, // email body

    }, callback_mail);

}

function callback_mail(result) {
    // ------------------------------------------------------------
    // CALLBACK de l'envoi de mail
    // ------------------------------------------------------------

    if (result === "OK") {
        navigator.notification.alert(
            'Email Fonctionne correctement',  // message
            callback_alert,            // callback
            'Etat mail',            // title
            'Ok'                  // buttonName
        );
    } else if (result === 'CANCELLED') {
        console.log('Envoi annulé par l\'utilisateur.');
        navigator.notification.alert(
            'Impossible d envoyer un mail !',  // message
            callback_alert,            // callback
            'Etat mail',            // title
            'Ok'                  // buttonName
        );
    } else {
        console.error('Erreur ou état inconnu :', result);
    }

}


function send_mail_archive() {
    // ============================================================
    // Fonction qui envoie un mail et envoie en pièce jointe l'archive active
    // Utilise le plugin cordova-plugin-email
    // Appelle la fonction get_archive_active
    // ============================================================

    console.log("========Appelle send_mail_archive========");

    date_ajd = new Date().toISOString().split('T')[0];
    
    [titre_localstorage, archives_a_envoyer] = get_archive_active();

    id_valeur = archives_a_envoyer[1].id;
    let archive_content;

    if (titre_localstorage && archives_a_envoyer.length > 0) {

        archive_content = document.getElementById(id_valeur).textContent;

    }
    let contact = 'sonikpi.log@gmail.com'
    send_mail(contact, titre_localstorage, archive_content);
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

    console.log("========Appelle search_contact========");
    let prenom_nom = document.getElementById("floatingInput").value;
    let options = new ContactFindOptions();

   
    options.filter = prenom_nom;
    options.multiple = true;
    let fields = ["displayName", "name", "phoneNumbers", "emails"];
    navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts) {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // Réponse du plugin si il trouve des contacts
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    console.log("========Appelle onSuccess========");
    
    for (let i = 0; i < contacts.length; i++) {
        
        if (contacts[i].phoneNumbers) {

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

    console.log("========Appelle callback_confirm========");
   
    if (buttonIndex === 1) {
        send_mail(email_contact);
    } else {
        console.log("Annulé");
    }

}


// ****************************************************************************************************************************************************************
// FONCTION NFC
// ****************************************************************************************************************************************************************




function get_nfc() {
    // ============================================================
    // Fonction qui permet de lire une puce NFC
    // Utilise le plugin cordova-plugin-nfc
    // ============================================================

    console.log("=========get_nfc=========");

    document.getElementById("para_nfc_dialog").innerHTML = 'Approchez votre carte';
    document.getElementById("gif_dialog").src = './img/nfc_anime2.gif';
    document.getElementById("nfcDialogCloseButton").style.display = "none";


    nfc.addTagDiscoveredListener(callback_nfc, onSuccess_nfc, onFailure_nfc);
}

function onSuccess_nfc() {
    console.log("NFC listener ajouté avec succès");
    document.getElementById('nfcDialog').style.display = 'flex';
}

function onFailure_nfc(error) {
    console.log("Erreur lors de l'ajout du listener NFC : " + JSON.stringify(error));
}

function callback_nfc(nfcEvent) {
    // ------------------------------------------------------------
    // CALLBACK de l'alerte NFC
    // ------------------------------------------------------------

    console.log("=======callback_nfc=======");

    let tag_nfc = nfcEvent.tag;
    let ndefId = nfc.bytesToHexString(tag_nfc.id);

    tag_nfc_scanner = ndefId;
    build_account();
    verif_sessionStorage(tag_nfc_scanner);

    UPDATE_TB_NFC.style.color = "green";
    UPDATE_TB_NFC.style.border = "2px solid green";
}

function close_nfc() {
    // ------------------------------------------------------------
    // Fonction qui permet de fermer le listener NFC
    // ------------------------------------------------------------
    console.log("=======close_nfc=======");
    nfc.removeTagDiscoveredListener(callback_close_nfc);
    document.getElementById('nfcDialog').style.display = 'none';
}

function callback_close_nfc() {
    // ------------------------------------------------------------
    // CALLBACK de la fermeture du listener NFC
    // ------------------------------------------------------------
    console.log("Listener NFC fermé");
}

function verif_sessionStorage(tag) {
    let valeur_key = [];

    for (let i = 0; i < sessionStorage.length; i++) {
        valeur_key.push(sessionStorage.key(i));
    }

    if (valeur_key.includes(tag)) {
        document.getElementById("para_nfc_dialog").innerHTML = "Vôtre carte est déjà enregistrée";
        document.getElementById("gif_dialog").src = './img/nfc_error.gif';
        document.getElementById("nfcDialogCloseButton").style.display = 'block';
    } else {
        document.getElementById("para_nfc_dialog").innerHTML = "Vôtre carte n'est pas enregistrée; appelle du serveur !";
        document.getElementById("gif_dialog").src = './img/nfc_loading.gif';
        post_nfc(tag);
    }
}
function post_nfc(tag) {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Fonction qui permet de récupérer les information de la puce NFC
    // Appelle API /nfc/verify
    // Paramètres d'entrée :
    // - tag (string) : L'identifiant de la puce NFC.
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    console.log("=======post_nfc=======");
    post("https://cheveux-bleus.fr:16800/nfc/verify", tag);
}

function post(url, tag) {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Fonction pour effectuer une requête HTTP POST vers une URL donnée.
    // Paramètres d'entrée :
    // - url (string) : L'URL de la ressource à laquelle effectuer la requête.
    // La fonction utilise un objet XMLHttpRequest pour envoyer la requête.
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    console.log("=======post=======");

    let payload = JSON.stringify({ "id_nfc": tag });

    const XHR = new XMLHttpRequest();
    XHR.onreadystatechange = statechange;
    XHR.open("POST", url, true);
    XHR.setRequestHeader("Content-Type", "application/json");  // Envoi en JSON
    XHR.setRequestHeader("Accept", "application/json");

    XHR.send(payload);
}

function statechange(event) {



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

                document.getElementById("para_nfc_dialog").innerHTML = "Carte Trouvé !";
                document.getElementById("gif_dialog").src = './img/nfc_success.gif';
                document.getElementById("nfcDialogCloseButton").style.display = 'block';


                let response = JSON.parse(XHR.responseText);

                sessionStorage.setItem(tag_nfc_scanner, JSON.stringify(response));

                document.getElementById("para_nfc_title").innerHTML = tag_nfc_scanner;

                document.getElementById("para_nfc_name").innerHTML = response.name;
                document.getElementById("para_nfc_status").innerHTML = response.status;
                document.getElementById("para_nfc_date").innerHTML = response.date;

                build_account();
            } else if (XHR.status == 404) {
                console.log("Erreur 404");
                document.getElementById("para_nfc_dialog").innerHTML = "Carte non enregistrée";
                document.getElementById("gif_dialog").src = './img/nfc_error.gif';
                document.getElementById("nfcDialogCloseButton").style.display = 'block';
            } else {
                console.error("Erreur lors de la requête : " + XHR.status);
            }
            break;
    }
}



function build_account() {
    //     ============================================================
    //      Fonction qui permet de changer de compte sur les carte scanner pendant la session
    //      ============================================================

    console.log("=======Build account=======");

    const LISTE_CARDS_ENRGISTRE = document.getElementById("liste_card");
    let input, label;

    while (LISTE_CARDS_ENRGISTRE.firstChild) {
        LISTE_CARDS_ENRGISTRE.removeChild(LISTE_CARDS_ENRGISTRE.firstChild);
    }
    let contenue_session_storage = sessionStorage;
    let i = 0;
    for (let [key, value] of Object.entries(contenue_session_storage)) {


        name_card = JSON.parse(value);


        input = document.createElement("input");
        input.type = "radio";
        input.id = "card_nfc" + i;
        input.name = "vbtn-radio";
        input.classList.add("btn-check");
        input.autocomplete = "off";

        if (tag_nfc_scanner == key) {
            input.checked = true;
        }

        label = document.createElement("label");
        label.htmlFor = "card_nfc" + i;
        label.classList.add("btn");
        label.classList.add("btn-outline-primary");
        label.classList.add("btn-lg");
        label.classList.add("me-2");
        label.innerHTML = key + "<br> (" + name_card["name"] + ")";


        LISTE_CARDS_ENRGISTRE.append(input);
        LISTE_CARDS_ENRGISTRE.append(label);

        document.getElementById("card_nfc" + i).addEventListener("change", change_account);

        i++;
    }



}

function change_account(event) {
    //     ============================================================
    //      Fonction qui permet de changer de compte sur les carte scanner pendant la session
    //      ============================================================

    console.log("=======Change account=======");

    let card_nfc = event.target.id;
    let card_nfc_value = document.getElementById(card_nfc).nextElementSibling.innerHTML.split("<br>")[0];
    console.log(card_nfc_value);
    let response = JSON.parse(sessionStorage.getItem(card_nfc_value));

    document.getElementById("para_nfc_title").innerHTML = card_nfc_value;

    document.getElementById("para_nfc_name").innerHTML = response.name;
    document.getElementById("para_nfc_status").innerHTML = response.status;
    document.getElementById("para_nfc_date").innerHTML = response.date;

}


// ****************************************************************************************************************************************************************
// FONCTION QRCODE
// ****************************************************************************************************************************************************************

// function get_qrcode() {
//     ============================================================
//      Fonction qui permet de lire un QRCode
//      Utilise le plugin cordova-plugin-qrscanner
//      ============================================================

//     console.log("========= get_qrcode =========");

//     cordova.plugins.barcodeScanner.scan(
//         function (result) {
//             alert("We got a barcode\n" +
//                   "Result: " + result.text + "\n" +
//                   "Format: " + result.format + "\n" +
//                   "Cancelled: " + result.cancelled);
//         },
//         function (error) {
//             alert("Scanning failed: " + error);
//         }
//      );
// }