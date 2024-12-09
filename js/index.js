/**************************************/
/**  VARIABLES                           */
/**************************************/

const TO_UPDATE_TB_NETWORK = document.getElementById("para_network");
const UPDATE_TB_NETWORK = document.getElementById("Tb_network");

const UPDATE_TB_SERVER = document.getElementById("Tb_server");

const TO_UPDATE_TB_MAIL = document.getElementById("para_mail");
const UPDATE_TB_MAIL = document.getElementById("Tb_mail");

const TO_UPDATE_TB_ARCHIVE = document.getElementById("para_archive");
const UPDATE_TB_ARCHIVE = document.getElementById("Tb_archive");
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
        'Vous êtes connecter avec : ' + states[networkState],  // message
        'Etat Connexion',            // title
        'Etat Connexion'                  // buttonName
    );
}


function onOnline() {
    console.log("Online");

    TO_UPDATE_TB_NETWORK.innerHTML = "Vous êtes Online";
}

function onOffline() {
    console.log("Offline");
    TO_UPDATE_TB_NETWORK.innerHTML = "Vous êtes offline";
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
                    'Etat serveur',            // title
                    'Etat serveur'                  // buttonName
                );
            } else {
                navigator.notification.alert(
                    'Impossible de joindre le serveur !',  // message
                    'Etat serveur',            // title
                    'Etat serveur'                  // buttonName
                );
            }
            break;
    }
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
            'Etat mail',            // title
            'Etat mail'                  // buttonName
        );
    } else if (result === 'CANCELLED') {
        console.log('Envoi annulé par l\'utilisateur.');
        navigator.notification.alert(
            'Impossible d envoyer un mail !',  // message
            'Etat mail',            // title
            'Etat mail'                  // buttonName
        );
    } else {
        console.error('Erreur ou état inconnu :', result);
    }

}

/**************************************/
/** ARCHIVE                            */
/**************************************/



