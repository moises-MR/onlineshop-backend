const Cliente = require("../models/Cliente");



// Guardar nuevos clientes
exports.nuevoCliente = async (req,res,next) => {
    
try {
    
const cliente = new Cliente(req.body);
 await cliente.save();
    res.json({
        mensaje:"El registro se guardo correctamente"
    })
} catch (error) {
    res.send(error);
    next();
    
    
}

}

//Actualizar cliente
exports.actualizarCliente = async (req,res,next) =>{

    try {
    const cliente = await Cliente.findByIdAndUpdate({
        _id:req.params.idCliente
    },req.body,{
        new:true
    });
    res.json(cliente);

    } catch (error) {
    res.send(error);
    next();
    }

}


//Eliminar cliente


exports.eliminarCliente = async (req,res,next) =>{

    try {
        await Cliente.findOneAndDelete({
            _id:req.params.idCliente
        });
    res.json({msg:`El cliente se a eliminado`});

    } catch (error) {
        res.send(error);
        next() 
    }
}


// Mostrar todos los clientes 
exports.mostrarClientes = async (req,res,next) =>{

    try {

        const clientes = await Cliente.find();
        res.json(clientes);
        
    } catch (error) {
        res.send(error);
        next();
    }

}


// Mostrar cliente por ID

exports.mostrarCliente = async (req,res,next) => {

    try {
       const cliente = await Cliente.findById(req.params.idCliente);
       res.json(cliente); 

    } catch (error) {
        res.send(error);
        next();
    }

}