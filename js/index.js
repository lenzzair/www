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
