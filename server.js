//Array con los usuarios
const users = [{
    usuario: "maxi",
    clave: "12345"
}];

const express = require('express');
const path = require('path');
const app = express();


const PUERTO = 3000;

// Middleware para poner el contenido de un form post en req.body
app.use(express.urlencoded({
    extended: true
}));
// Middleware para archivos de imagen, css, scripts, etc ("recursos estáticos")
app.use(express.static(__dirname + "/client"));


//Pantalla de inicio cuando escriben el dominio
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "client/login.html"));
})

//Una vez que se realiza el submit de iniciar sesión
app.post("/login", function (req, res) {
    //Guarda los datos del formulario en constantes
    let formValido = false;
    const usuario = req.body.usuario;
    const clave = req.body.password;

    for (let i = 0; i < users.length; i++) {
        if (usuario === users[i].usuario && clave === users[i].clave) {
            formValido = true;  //Recorre los usuarios registrados y si coincide cambia el valor de la bandera
        }
    }

    if(formValido){
        res.sendFile(path.join(__dirname, "client/bienvenida.html"));
    } else {
        res.sendFile(path.join(__dirname, "client/login.html"));    //Si no coincide 
    }
})

//Redirige al formulario de registro
app.get("/registro", function(req,res){
    res.sendFile(path.join(__dirname, "client/registro.html"));
})

//Una vez que se realiza el submit del registro
app.post("/registro", function (req, res) {
    //Guarda los datos del formulario en constantes
    let usuarioRepetido = false;
    const usuario = req.body.usuario;
    const clave = req.body.password;
    const reclave = req.body.repassword;

    for (let i = 0; i < users.length; i++) {
        if (usuario === users[i].usuario || clave !== reclave ){
            usuarioRepetido = true;
        } 
    }

    if(usuarioRepetido){
        res.sendFile(path.join(__dirname, "client/registro.html")); //Si el usuario ya existe o las contraseñas no coinciden vuelve a la pantalla de registro
    } else {
        //Si el usuario no esta repetido guardamos en el array de usuarios y redirigimos al login
        users.push({usuario: usuario, clave : clave});
        res.sendFile(path.join(__dirname, "client/login.html"));
    }

})

app.listen(PUERTO, function () {
    console.log("Conectado al servidor");
})