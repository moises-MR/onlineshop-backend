const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const clientesModelo = new Schema({

    nombres:{
        type:String,
        trim:true
    },
    apellidos:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,

    },
    password:{
        type:String,
        trim:true
    },
    passwordRepeat:{
        type:String,
        trim:true
    },
    rol:{
        type:String,
        trim:true
    }    


});


module.exports = mongoose.model("clientes",clientesModelo);