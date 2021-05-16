const express = require('express');
const path = require('path');
const app = express();
const users = [
    {
        usuario: "maxi",
        clave: "12345"
    }
];

const PUERTO = 3100;

// Middleware para poner el contenido de un form post en req.body
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos de imagen, css, scripts, etc ("recursos estáticos")
app.use(express.static(__dirname+"/client"));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "client/login.html"));
})

app.post("/login", function(req, res){
    const usuario = req.body.usuario;
    const clave = req.body.password;

    for(let i = 0;i < users.length; i++){
        if(usuario === users[i].usuario && clave === users[i].clave){
            res.sendFile(path.join(__dirname, "client/index.html"));
        }
    }

})

app.listen(PUERTO, function(){
    console.log("Conectado al servidor");
})