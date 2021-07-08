const Usuario = require("../models/Usuarios") ;
const jsonWebTkn = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// crear un nuevo usuario
exports.crearUsuario = async (req,res,next) =>{

    const usuario = new Usuario(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    usuario.passwordRepeat = await bcrypt.hash(req.body.password, 12);
    try {
        
        await usuario.save();
        res.json({
            mensaje:"Usuario creado"
        })

    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }


}


// Al inicar sesion utilizar jsonwebtoken
exports.inicarSesion = async (req,res,next) => {

    const{email,password} = req.body;
       

    const usuario = await Usuario.findOne({email});
    if(!usuario){
        // Si el eusuario no existe

        await res.json({
            mensaje:"El usuario no existe",
            id:401,
            mensaje2:"registrate"
        });
        next();
    }else{
        // El usuario si existe validar el password
        if(!bcrypt.compareSync(password,usuario.password)){
                await res.json({
                    mensaje:"Password incorrecto",
                    id:401,
                    mensaje2:"¿Olvidaste tu contraseña?"
                });
            
                next();
        }else{
            // El usuario si existe y la contraseña es correcta
            
            // token JsonWebToken
         
            const token = jsonWebTkn.sign({
                email:usuario.email,
                nombre:usuario.nombre,
                id:usuario._id

                

            },"LLAVESECRETA",{
                expiresIn: "20min",

            });

            //retornar el token

            res.json({token,id:200});
        }
        

    }

}


exports.mostrarUsers = async (req,res,next) =>{


   try {

    const usuarios = Usuario.find();
    res.json(usuarios);
       
   } catch (error) {
       console.log(error);
       req.send(error);
       next();
   }

}