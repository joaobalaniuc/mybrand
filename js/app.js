//--------------------------------------------
// INICIAR DISPOSITIVO
//--------------------------------------------
function start() {

    // App config
    var version = '1.0.0';

    // Server
    localStorage.server = "http://www.feirafree.com.br/mybrand/";

}

var app = {
// Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("online", onOnline, false);
        function onOnline() {
            sessionStorage.online = true;
        }
        document.addEventListener("offline", onOffline, false);
        function onOffline() {
            sessionStorage.online = false;
        }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        console.log("ready0");
        app.receivedEvent('deviceready');

        StatusBar.overlaysWebView(true);
        alert(StatusBar.overlaysWebView);
        
        StatusBar.styleBlackTranslucent();

        // SPLASHSCREEN (CONFIG.XML BUGFIX)
        setTimeout(function () {
            navigator.splashscreen.hide();
        }, 1000);
        start();

        console.log("ready1");
    }
    ,
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        /*var parentElement = document.getElementById(id);
         var listeningElement = parentElement.querySelector('.listening');
         var receivedElement = parentElement.querySelector('.received');
         listeningElement.setAttribute('style', 'display:none;');
         receivedElement.setAttribute('style', 'display:block;');*/
        console.log('Received Event: ' + id);
    }
};
