const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");
const productosController = require("../controllers/productosController");
const usuariosController = require("../controllers/usuariosController");
const auth = require("../middleware/auth");




module.exports = () =>{

    //Cliente controllers *rutas*
     router.post("/clientes",clientesController.nuevoCliente);
     router.put("/clientes/:idCliente",clientesController.actualizarCliente);
     router.delete("/clientes/:idCliente",clientesController.eliminarCliente);
     router.get("/clientes",
     auth,
     clientesController.mostrarClientes);
     router.get("/clientes/:idCliente",clientesController.mostrarCliente);

    //Productos Controller *rutas*
     router.post("/productos",
     auth,
     productosController.subirImagen,
     productosController.nuevoProducto);
     router.put("/productos/:idProducto",
     productosController.subirImagen,
     productosController.actualizarProducto);
     router.delete("/productos/:idProducto",productosController.eliminarProducto);
     router.get("/productos",
     productosController.mostrarProductos);
     router.get("/admin/productos",
     auth,
     productosController.mostrarProductos);
     router.get("/productos/:idProducto",productosController.mostrarProducto);

    //Usuarios
    router.post("/crear-usuario",usuariosController.crearUsuario);
    router.post("/iniciar-sesion",usuariosController.inicarSesion);
    router.get("/users",usuariosController.mostrarUsers);






    return router;
}