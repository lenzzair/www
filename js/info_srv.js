/**************************************/
/**  VARIABLES                           */
/**************************************/
const TO_UPDATE = document.getElementById("to_update");
const UPDATE = document.getElementById("update");



/**************************************/
/** Event Listeners                   */
/**************************************/

UPDATE.addEventListener("click", update);



/**************************************/
/** Appelle API                       */
/**************************************/

function update(){
    console.log("Update appelle");
    get("https://cheveux-bleus.fr:16800/system/cpu");
    
}

function get(url)
{
    console.log("URL appelle");
    const XHR = new XMLHttpRequest();
    XHR.onreadystatechange = statechange ;
    XHR.open ("GET", url);
    // XHR.withCredentials = true;
    // XHR.setRequestHeader("Accept", "application/json");
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
                console.log(XHR.responseText);
                let reponse = XHR.responseText;
                TO_UPDATE.innerHTML = XHR.responseText;
            }
    
        }


}