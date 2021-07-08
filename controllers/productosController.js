const Producto = require("../models/Productos");
const multer = require("multer");
const shortid = require("shortid");



// Configuracion para subir imagenes con multer
const configuracionMulter = {
    storage:fileStorage = multer.diskStorage({
        destination:(req,res,next) => {
            next(null,__dirname+"../../uploads");
        },
        filename: (req,file,next) => {
            const extension = file.mimetype.split("/")[1];
            next(null,`${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,next)  {
        if(file.mimetype === "image/jpeg" || file.mimetype ==="image/png"){
            next(null,true);
        }else{
            next(new Error ("Formato no valido"));
        }
    }
}


//Pasar la configuracion y el campo
const upload = multer(configuracionMulter).single("imagen");


// Subir un archivo imagen

exports.subirImagen =  (req,res,next) => {


    upload(req,res, (error) =>{
            if(error){
                res.json({mensaje:error});
            }
            return next();
    });

}






// Agregando nuevo producto
exports.nuevoProducto = async (req,res,next) =>{


    const producto = new Producto(req.body);


    try {

        if(req.file.filename){
            producto.imagen = req.file.filename;
        }


        
        await  producto.save();

        res.json({mensaje:"El producto se guardo correctamente"});

    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}



// Actualizar producto por ID


exports.actualizarProducto = async (req,res,next) => {

    try {

        let nuevoProducto = req.body;
        
        if(req.file){
            nuevoProducto.imagen = req.file.filename;

        }else{
            let productoAnterior = await Producto.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }


        const productoActualizado = await Producto.findByIdAndUpdate({
            _id:req.params.idProducto
        },req.body,{
            new:true
        });
        //   res.json(productoActualizado);
        res.json({mesnaje:"se actualizo"});
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }

}

// Eliminar producto por ID


exports.eliminarProducto = async (req,res,next) =>{


    try {
     await Producto.findByIdAndDelete({_id:req.params.idProducto});
        res.json({mensaje:"El registro se a eliminado"});

    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }

}

// Mostrar todos los productos

exports.mostrarProductos = async (req,res,next) => {

    try {
    const producto = await Producto.find();
    res.json(producto);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }


}


// Mostrar producto por ID


exports.mostrarProducto = async (req,res,next) => {

    try {
        const producto = await Producto.findById(req.params.idProducto);
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }

}