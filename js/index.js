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
const TO_UPDATE_CONTACT = document.getElementById("para_contact");
/**************************************/
/** Event Listeners                   */
/**************************************/
document.addEventListener("deviceready", onDeviceReady);
document.addEventListener("pause", onPause);
document.addEventListener("resume", onResume);
document.addEventListener("backbutton", onBackButton);
UPDATE_TB_NETWORK.addEventListener("click", get_etat_network);
UPDATE_TB_SERVER.addEventListener("click", get_etat_serveur);
UPDATE_TB_MAIL.addEventListener("click", send_mail);
UPDATE_TB_ARCHIVE.addEventListener("click", put_archive);

BTN_SUPP.addEventListener("click", del_archive);
BTN_MAIL.addEventListener("click", send_mail_archive);
BTN_CONTACT.addEventListener("click", search_contact);
/**************************************/
/** MAIN                              */
/**************************************/



/**************************************/
/** Functions                         */
/**************************************/
function onDeviceReady() {
    console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
    console.log("onDeviceReady");

    let tb_btn = document.getElementById("tableau_de_bord");
    tb_btn.style.display = "block";

    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);


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
function get_etat_network() {
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

    navigator.notification.alert(
        'Vous êtes connecter avec : ' + states[networkState],// message
        callback_network,  
        'Etat Connexion',            // title
        'Ok'                  // buttonName
    );
}
function callback_network() {
    console.log("Alerte fermée");
}
function onOnline() {
    console.log("Online");

    TO_UPDATE_TB_NETWORK.innerHTML = "Vous êtes Online";
    UPDATE_TB_NETWORK.style.color = "green";
    UPDATE_TB_NETWORK.style.border = "1px solid green";

}

function onOffline() {
    console.log("Offline");
    TO_UPDATE_TB_NETWORK.innerHTML = "Vous êtes offline";
    UPDATE_TB_NETWORK.style.color = "red";
    UPDATE_TB_NETWORK.style.border = "1px solid red";
}


function get_etat_serveur() {
    console.log("Appelle etat serveur");
    get("https://cheveux-bleus.fr:16800/docs");

}

function get(url) {
    console.log("URL appelle");
    const XHR = new XMLHttpRequest();
    XHR.onreadystatechange = statechange;
    XHR.open("HEAD", url);
    XHR.send();
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
    console.log("Alerte fermée");
}




// Function qui envoie un mail pour faire un rapport de l'etat du serveurœ


function send_mail() {

    // Function qui envoie un mail pour faire un rapport de l'etat du serveurœ
    console.log("appelle SendMail");
    date_ajd = new Date().toISOString().split('T')[0];

    cordova.plugins.email.open({
        to: 'sonikpi.log@gmail.com', // email addresses for TO field
        cc: '', // email addresses for CC field
        subject: '! URGENCE SERVEUR !', // subject of the email
        body: 'Rapport Serveur du ' + date_ajd + ":", // email body

    }, callback);

}


function callback(result) {
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
    console.log("Alerte fermée");
}

/**************************************/
/** ARCHIVE                            */
/**************************************/

function put_archive() {
    console.log("Appelle PUT Archive");


    let a, div;
    let i = 1;
    let div_parent = document.getElementById("col1");
    let div_parent_2 = document.getElementById("col2");
    let dico_localStorage = localStorage;

    while (div_parent.firstChild) {
        div_parent.removeChild(div_parent.firstChild);
        div_parent_2.removeChild(div_parent_2.firstChild);
        console.log("supp");
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
        div.innerHTML = value;


        document.getElementById("col1").append(a);
        document.getElementById("col2").append(div);

        i++;
    }
}
function get_archive_active() {
    console.log("Appel de get archive active");

    let archives_active = document.querySelectorAll(".active");
    console.log(archives_active);

    if (archives_active.length > 0) {
        let id_valeur = archives_active[0].id;
        console.log(id_valeur);
        let titre_localstorage = document.getElementById(id_valeur).innerHTML;
        console.log(titre_localstorage);
        return [titre_localstorage, archives_active];
    } 
}

function del_archive() {
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
            callback_archive,  // callback
            'Archive',                      // titre
            'OK'                            // nom du bouton
        );
    } else {
        console.error("Pas d'éléments actifs à supprimer.");
    }
}

function callback_archive() {
    console.log("Alerte fermée");
}

function send_mail_archive() {

    console.log("Appelle SendMail Archive");
    date_ajd = new Date().toISOString().split('T')[0];
    console.log(date_ajd);
    [titre_localstorage, archives_a_envoyer] = get_archive_active();

    id_valeur = archives_a_envoyer[1].id;
    let archive_content ;

    if (titre_localstorage && archives_a_envoyer.length > 0) {
        
        archive_content = document.getElementById(id_valeur).innerHTML;

    }
    cordova.plugins.email.open({
        to: 'sonikpi.log@gmail.com', // email addresses for TO field
        cc: '', // email addresses for CC field
        subject: '! ARCHIVE SERVEUR ->' + titre_localstorage, // subject of the email
        body: 'Archive Serveur du ' + date_ajd + ":\n\n" + archive_content, // email body

    }, callback_archive_mail);
}


function callback_archive_mail(result) {
    console.log("Mail envoyer");

    navigator.notification.alert(
        'Email Fonctionne correctement',  // message
        callback_alert_archive_mail,            // callback
        'Etat mail',            // title
        'Etat mail'                  // buttonName
    );
}
function callback_alert_archive_mail() {
    console.log("Alerte fermée");
}

function search_contact(){
    console.log("Appelle search contact");
    let prenom_nom =  document.getElementById("floatingInput").value ;
    let options = new ContactFindOptions();
    
    // filtrer les contacts par nom
    options.filter = prenom_nom;
    options.multiple = true;
    let fields = ["displayName", "name", "phoneNumbers", "emails"];
    navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts) {
    console.log("Appelle onSuccess");
    console.log(contacts.length + 'contacts trouvés');

    for (let i = 0; i < contacts.length; i++) {
        console.log("Nom = " + contacts[i].displayName);
       
        if (contacts[i].phoneNumbers) {
            console.log("Numéro de téléphone = " + contacts[i].phoneNumbers[0].value);
            TO_UPDATE_CONTACT.innerHTML += "Numéro de téléphone = " + contacts[i].phoneNumbers[0].value + "\n\n";

        }
        if (contacts[i].emails) {
            console.log("Email = " + contacts[i].emails[0].value);
            TO_UPDATE_CONTACT.innerHTML += contacts[i].displayName + "\n" + "Email = " + contacts[i].emails[0].value;
        }
        navigator.notification.alert(
            'Numéro de téléphone = ' + contacts[i].phoneNumbers[0].value + "\n" + contacts[i].emails[0].value,  // message
            callback_contact,            // callback
            'Contact',            // title
            'Contact'                  // buttonName
        );
    }
}

function onError(contactError) {
    console.error("Erreur lors de la recherche de contacts : " + contactError);
}

function callback_contact() {
    console.log("Alerte fermée");
}