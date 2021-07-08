const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const productosModelo = new Schema({

    nombreProducto : {
        type:String,
        trim:true
    },
    caracteristicas : {
        type:String,
        trim:true
    },
    imagen:{
        type:String,

    },
    inventario:{
        type:String
   },
    precio:{
        type:String
    }



});


module.exports = mongoose.model("productos",productosModelo);