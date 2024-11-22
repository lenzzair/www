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


/**************************************/
/** COOKIES                           */
/**************************************/
let connected;
try {
    
} catch (error) {
    
}

/**************************************/
/** Event Listeners                   */
/**************************************/

UPDATE_CPU.addEventListener("click", get_cpu);;
UPDATE_MEMORY.addEventListener("click", get_memory);
UPDATE_DISK.addEventListener("click", get_disk);
UPDATE_UPTIME.addEventListener("click", get_uptime);

/**************************************/
/** Functions                         */
/**************************************/
function get_cpu() {
    console.log("CPU Appelle");
    param = "CPU"
    get("https://cheveux-bleus.fr:16800/system/cpu", param);
}

function get_memory(){
   console.log("MEMORY appelle");
   param = "MEMORY"
   get("https://cheveux-bleus.fr:16800/system/memory", param); 
}

function get_disk()
{
    console.log("DISK appelle");
    param = "DISK";
    get("https://cheveux-bleus.fr:16800/system/disk", param);
}

function get_uptime(){
    console.log("UPTIME Appelle");
    param = "UPTIME";
    get("https://cheveux-bleus.fr:16800/system/uptime", param);
}


/**************************************/
/** Appelle API                       */
/**************************************/


function get(url, param)
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
                        for (let [index, nom] of Object.entries(reponse_objet)){
                             
                            // On affiche l'index et le nom
                            TO_UPDATE_MEMORY.innerHTML += `<strong>${index} : </strong> ${nom}<br>`;
                        }
                        break;

                    case "DISK":
                        console.log("Reponse DISK" + XHR.param);

                        TO_UPDATE_DISK.innerHTML = "";

                        for (let [index, nom] of Object.entries(reponse_objet)){

                            TO_UPDATE_DISK.innerHTML += `<strong>${index} : </strong> ${nom}<br>`;
                        }
                        break
                    
                    case "UPTIME":
                        console.log("Reponse UPTIME" + XHR.param);
                        TO_UPDATE_UPTIME.innerHTML = "";

                        for (let [key, valeur] of Object.entries(reponse_objet)){
                            
                            TO_UPDATE_UPTIME.innerHTML += `<strong>${key} : </strong> ${valeur}<br>`;
                        }
                }



            }

    }


}