const mongoose = require("mongoose") ;
const { Schema } = mongoose;




const usuariosSchema = new Schema({

    nombre:{
        type:String,
        trim:true
    },
    appelidos:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        trim:true
    },
    passwordRepeat:{
        type:String,
        trim:true
    }
    
    


});



module.exports = mongoose.model("usuarios",usuariosSchema);