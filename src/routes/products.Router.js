const express = require('express')

const { Router } = express;
const productosRouter = new Router();

// importamos la clase Container
const ContenedorArchivo = require('../contenedores/ContenedorArchivo');

// Se instancia la clase contenedor
const ProductService = new ContenedorArchivo("./db/dbProductos.json");


// funcion Error
function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`;
    } else {
        error.descripcion = 'no autorizado';
    }
    return error;
}

// Middleware para Administrador
const esAdmin = true;

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin(req.url, req.method));
    } else {
        next();
    }
}

// Endpoints
productosRouter.get('/', soloAdmins,async (req, res) => {
    res.json(await ProductService.listarAll());
})

productosRouter.get('/:id', async (req, res) => {
    res.json(await ProductService.listar(req.params.id));
})

// tiene permisos un admin
productosRouter.post('/', soloAdmins, async (req, res) => {
    const data = req.body;
    res.json(await ProductService.guardar(data));
})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    const data = req.body;
    res.json(await ProductService.actualizar(data, parseInt(req.params.id)))
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    res.json(await ProductService.borrar(req.params.id));
})


module.exports = productosRouter;