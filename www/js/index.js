var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

            /*Informações do Dispositivo na tela do aparelho*/

        document.getElementById("cordova").innerHTML = device.cordova;
        document.getElementById("model").innerHTML = device.model;
        document.getElementById("platform").innerHTML = device.platform;
        document.getElementById("version").innerHTML = device.version;
        document.getElementById("manufacturer").innerHTML = device.manufacturer;
        document.getElementById("isVirtual").innerHTML = device.isVirtual;
        document.getElementById("serial").innerHTML = device.serial;
        document.getElementById("deviceID").innerHTML = device.deviceID;

    },
            /*Funcção para capturar foto do dispositivo*/
    capturePhoto: function(){

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true
        });

        function onSuccess(imageData) {
            var image = document.getElementById('minhaImagem');
            image.style.display = "block";
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

    },



};

function pronto() {

    var titulo = localStorage.getItem('titulo');
    if(titulo){
        var $titulo = document.getElementById('titulo');
        $titulo.innerHTML = titulo;
    }

    var $botao = document.getElementById('salvar');

    $botao.addEventListener('touchend', function (evt) {
        evt.preventDefault();

        var $titulo = document.getElementById('titulo');
        var $campo = document.getElementById('campo');

        $titulo.innerHTML = $campo.value;

        localStorage.setItem('titulo', $campo.value);

    })
};

function facebook() {

    var $logar = document.getElementById('logar');
    var $dados = document.getElementById('dados');

    $logar.addEventListener('click', function (evt) {
        evt.preventDefault();

        $dados.innerHTML = 'clicou';
        facebookConnectPlugin.login(['public_profile','email'], function(sucesso){

            $dados.innerHTML = 'fez login';
            var facebook_id = sucesso.authResponse.userID;

            localStorage.setItem('facebook_id', facebook_id);
            $dados.innerHTML = facebook_id;

            facebookConnectPlugin.api('me', ['public_profile'], function(dados){
                localStorage.setItem('nome', dados.name);
                $dados.innerHTML = JSON.stringify(dados);
            }, function (error){
                console.log('deu errado na api' + erro);
            })
        }, function(erro) {
            console.log('deu errado no login' + erro);
        });
    })
};

function obter_celera() {
    navigator.accelerometer.getCurrentAcceleration(function (celera) {
        document.getElementById('celeraX').innerHTML = celera.x;
        document.getElementById('celeraY').innerHTML = celera.y;
        document.getElementById('celeraZ').innerHTML = celera.z;
        document.getElementById('celeraTS').innerHTML = celera.timestamp;
    });
}

var usuario = [
    {"nome": "Teste"},{"senha":"123@teste"},{"email":"teste@gmail.com"},
    {"nome": "Davi"},{"senha":"vsvbh"},{"email":"davi@gmail.com"},
    {"nome": "Ezequiel"},{"senha":"123456"},{"email":"ebertti@gmail.com"},
    {"nome": "Leonardo"},{"senha":"12340000@"},{"email":"camello@gmail.com"},
    {"nome": "Sergio"},{"senha":"6666@66"},{"email":"ciglione@gmail.com"},
];

window.localStorage.setItem("usuario.nome", usuario.nome);
window.localStorage.setItem("usuario.senha", usuario.senha);
window.localStorage.setItem("usuario.email", usuario.email);


window.localStorage.removeItem("usuario.telefone");


    var email = window.localStorage.getItem("usuario.email");


window.localStorage.clear();
