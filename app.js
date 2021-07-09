const express = require("express");
const router = require("./routes/rutas");
const mongoose = require("mongoose")
require("dotenv").config({path:"variables.env"});

//Cors para el inetrcambio de recursos entre servidores
const cors = require("cors");

// Conectar mongodb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.db_URL,
 { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("Conectado a la base de datos"));



// declarando servidor
const app = express();

//Habilitar inputs
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// whiteListe para cors

const whiteList = process.env.FRONTEND_URL

// Definir un dominio para recibir notificaciones
const corsOptions = {

    origin:(origin,callbak)=>{
       
        if(whiteList === origin){
            callbak(null,true)
        }else{
            callbak(new Error("No autorizado"));
        }
    }

}





// Habilitar cors
app.use(cors());

// Definiendo rutas
app.use(router());

// Habilitando carpeta de imagenes a publica
app.use(express.static("uploads"));
 
// iniciando servidor en el puerto 
const port = process.env.PORT || 5600;
const host = process.env.HOST || "0.0.0.0";
app.listen(port,host, ()=>{
    console.log("El servidor esta funcionando");
});
