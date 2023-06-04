"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _grupos = require("../controllers/grupos");
var router = (0, _express.Router)();

/**
 * @swagger
 * /tasks:
 * get:
 *  summary: Obtiene todas las sesiones de la BD
 */

// Modificar por id
router.put('/grupos/:id', _grupos.updateGrupo);

// Borrar por id
router["delete"]('/grupos/:id', _grupos.deleteGrupo);

// Busqueda de una sesion por id
router.get('/grupos/:id', _grupos.getGrupo);

// Creacion de grupo nuevo en la BD
router.post('/grupos', _grupos.saveGrupo);

// Busca grupos por email 
router.get('/grupos/email/:email', _grupos.getGrupos);
var _default = router;
exports["default"] = _default;