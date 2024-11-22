/**************************************/
/**  VARIABLES                           */
/**************************************/
const TO_UPDATE = document.getElementById("to_update");
const UPDATE = document.getElementById("update");



/**************************************/
/** Event Listeners                   */
/**************************************/
document.addEventListener("deviceready", onDeviceReady);
document.addEventListener("pause", onPause);
document.addEventListener("resume", onResume);
document.addEventListener("backbutton", onBackButton);



/**************************************/
/** MAIN                              */
/**************************************/



/**************************************/
/** Functions                         */
/**************************************/
function onDeviceReady() {
    console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
    console.log("onDeviceReady");
    

}
          
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function onPause()
{
	console.log("onPause");
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function onResume()
{
	console.log("onResume");
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function onBackButton()
{
	console.log("onBackButton");
}


function post_token() {
    console.log("POST token Appelle");
    fetch("https://cheveux-bleus.fr:16800/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        body: new URLSearchParams({
            grant_type: "password",
            username: "lenzzair_admin",
            password: "Lenbenapi_access1406!",
            scope: "",
            client_id: "string",
            client_secret: "string"
        }).toString()
    })
    .then(response => response.json())
    .then(data => {
        console.log("Réponse du serveur :", data);
    })
    .catch(error => {
        console.error("Erreur :", error);
    });
}