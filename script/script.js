const mainContainer = document.getElementById("mainContainer");

let passwdForm = `
    <div id="passwdFormContainer">
        <div id="passwdForm">
            <input id="wordForPasswd" type="text" autocomplete="off" placeholder="Escriba aquí"> 
            <button id="passwdBtn">Crear</button>
            <button id="tooltip">?</button>
        </div>
        <div id="password">
            <p id="passwdShowed"></p>
            <p id="passwdCopiedMsg"><i>Contraseña creada y copiada</i></p>
        </div>
        <p id="lengthAlert">
            Se ingresaron menos de 6 letras/caracteres, por favor inténtelo de nuevo.
        </p>
        <p id="tooltipMsg">
            Escriba una palabra o palabras clave, no se preocupe por mayúsculas o minúsculas, el programa agregará letras mayúsculas de forma aleatoria. Recuerde que la palabra que utilice <i><b>no</b></i> debe ser información personal (fecha de nacimiento, nombre, apellidos, domicilio, apodos, NIP de banco u otras aplicaciones, etc.).
            <br>
            En general nada que pueda relacionarse a usted o a sus cercanos, complicando que puedan obtener sus accesos.
            <br><br>
            No utilice sólo números, porque el programa no hará ninguna modificación.
            <br><br>
            Deben al menos ser 6 letras/caracteres, pero tampoco recomiendo palabras muy largas porque pueden salir contraseñas un tanto... extensas.
            <br><br>
            Si le es posible activar la autenticación de dos factores donde utilizará ésta contraseña, se lo recomiendo ampliamente.
            <br><br>
            Recuerde, su información vale mucho, protéjala.
        </p>
    </div>
`;

//Adding content to the main container
mainContainer.innerHTML = passwdForm;

//Declaring variables
let wordForPasswd = document.getElementById("wordForPasswd");
let tooltip = document.getElementById("tooltip")
let tooltipMsg = document.getElementById("tooltipMsg");
let passwdBtn = document.getElementById("passwdBtn");
let lengthAlert = document.getElementById("lengthAlert");
let password = document.getElementById("password");
let passwdShowed = document.getElementById("passwdShowed");
let copyBtn = document.getElementById("copyBtn");

//Turning off the outline of the input 
wordForPasswd.style.outline = "none";

//Turning off the length alert and password display
lengthAlert.style.display = "none";
password.style.display = "none";

//Tooltip msg display on/off
let tooltipMsgDisplay = () => {
    if(tooltipMsg.style.display == "none") {
        tooltipMsg.style.display = "block";
    }
    else {
        tooltipMsg.style.display = "none";
    }
};

//Tooltip click event
tooltip.addEventListener('click', () => {
    tooltipMsgDisplay();
});

let aCoinFlip = (data) => {
    let coin = Math.random();
    if(coin > 0.5) {
        return data = data.toUpperCase();
    }
    else {
        return data;
    }
};

let isVocal = (data) => {

    const symbols = ["!","¡","¿","?","¿?","¡!","*","**",".",":",";","!;","¡:","¿.","?**","¿?¡!"];

    let randomNumber = parseInt(Math.random()*10);

    let symbolSelection = parseInt(Math.random()*(symbols.length-1));

    let randomSymbol = symbols[symbolSelection];
    
    //Uppercase or lowercase?, lets do a coin flip
    return (aCoinFlip(data) + randomNumber + randomSymbol);
};

let showPasswd = (data) => {
    password.style.display = "flex";
    passwdShowed.innerHTML = data;

    //Copying the passwd
    navigator.clipboard.writeText(data);
};

let createPasswd = (data) => {
    let password = "";

    for(let i=0; i<=data.length-1; i++){
        if(data.charAt(i) == "a" || 
        data.charAt(i) == "e" || 
        data.charAt(i) == "i" || 
        data.charAt(i) == "o" || 
        data.charAt(i) == "u")
        {
            password += isVocal(data.charAt(i));
        }
        else {
            password += data.charAt(i);
        }
    };

    showPasswd(password);
};

let isItLengthEnough = () => {
    let data = wordForPasswd.value;

    if(data.length < 6) {
        lengthAlert.style.display = "block";
    }
    else {
        lengthAlert.style.display = "none";

        //Deleting any space character
        data = data.replaceAll(" ", "");

        createPasswd(data);
    }
};

passwdBtn.addEventListener('click', () => {
    isItLengthEnough();
});