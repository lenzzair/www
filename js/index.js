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
UPDATE.addEventListener("click", update);



/**************************************/
/** MAIN                              */
/**************************************/



/**************************************/
/** Functions                         */
/**************************************/
function onDeviceReady() {
    console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
    console.log("onDeviceReady");
    document.getElementById("deviceready").style.display= "block";

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


/**************************************/
/** Appelle API                       */
/**************************************/

function update(){
    console.log("Update appelle");
    get("http://88.126.180.103:16800/system/cpu");
    
}

function get(url)
{
    console.log("URL appelle");
    const XHR = new XMLHttpRequest();
    XHR.onreadystatechange = statechange ;
    XHR.open ("GET", url);
    XHR.send();
}
function statechange(event)
{
	const XHR = event.target;
	
	switch(XHR.readyState)
	{
		case 0: console.log("Requête non initialisée"); break
		case 1: console.log("Connexion établie avec le serveur"); break;
		case 2: console.log("Requête reçue"); break;
		case 3: console.log("Requête en cours de traitement"); break;
		case 4:
			console.log("Requête terminée et réponse prête");

            if(XHR.status == 200)
            {
                console.log("Traitement local de la réponse");
                console.log(XHR.reponseText);

                TO_UPDATE.innerHTML = XHR.reponseText;
            }
    
        }


}