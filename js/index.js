/**************************************/
/**  VARIABLES                           */
/**************************************/
const TO_UPDATE = document.getElementById("to_update");
const UPDATE = document.getElementById("update");
const TO_UPDATE_TB_NETWORK = document.getElementById("para_network");
const UPDATE_TB_NETWORK = document.getElementById("Tb_network");
const UPDATE_TB_SERVER = document.getElementById("Tb_server");

/**************************************/
/** Event Listeners                   */
/**************************************/
document.addEventListener("deviceready", onDeviceReady);
document.addEventListener("pause", onPause);
document.addEventListener("resume", onResume);
document.addEventListener("backbutton", onBackButton);
UPDATE_TB_NETWORK.addEventListener("click", get_etat_network);
UPDATE_TB_SERVER.addEventListener("click", get_etat_serveur);

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
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}
	

function onOnline() {
	console.log("Online");
	
	TO_UPDATE_TB_NETWORK.innerHTML = "Vous êtes Online";
}

function onOffline(){
	console.log("Offline");
	TO_UPDATE_TB_NETWORK.innerHTML = "Vous êtes offline";
}

function get_etat_serveur() {
    console.log("Appelle etat serveur");

    // URL du serveur à vérifier
    const url = "https://cheveux-bleus.fr:16800/docs";

    // Effectuer une requête pour vérifier l'état du serveur
    fetch(url, { method: "HEAD" }) // Utilise HEAD pour vérifier si le serveur répond sans récupérer tout le contenu
        .then((response) => {
            if (response.ok) {
                document.getElementById("para_serveur").innerHTML = "Le serveur est Connecté";
                console.log("Serveur accessible");
            } else {
                document.getElementById("para_serveur").innerHTML = "Le serveur répond mais retourne une erreur";
                console.log("Erreur du serveur, code:", response.status);
            }
        })
        .catch((error) => {
            document.getElementById("para_serveur").innerHTML = "Le serveur n'est pas Connecté";
            console.error("Impossible de joindre le serveur:", error);
        });
}
