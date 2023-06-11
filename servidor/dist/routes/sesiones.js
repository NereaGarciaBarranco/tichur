"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _sesiones = require("../controllers/sesiones");
var router = (0, _express.Router)();

/**
 * @swagger
 * /tasks:
 * get:
 *  summary: Obtiene todas las sesiones de la BD
 */

// Busca la sesion anterior a la proporcionada del mismo grupo
router.get('/sesiones/anterior/id/:id', _sesiones.getSesionAnterior);

// Busca la sesion posterior a la proporcionada del mismo grupo
router.get('/sesiones/posterior/id/:id', _sesiones.getSesionPosterior);

// Busca sesiones por email ordenadas por fecha y hora_inicio ASC
router.get('/sesiones/email/:email', _sesiones.getSesiones);

// Busca sesiones de hoy por email ordenadas por hora_inicio ASC
router.get('/sesiones/today/email/:email', _sesiones.getSesionesToday);

// Busca sesiones por fecha y por email ordenadas por hora_inicio ASC
router.get('/sesiones/date/:date/email/:email', _sesiones.getSesionesByDate);

// Busca sesiones por grupo y por email ordenadas por hora_inicio ASC
router.get('/sesiones/group/:idGroup/email/:email', _sesiones.getSesionesByGroup);

// Busca sesiones por fecha, por grupo y por email ordenadas por hora_inicio ASC
router.get('/sesiones/date/:date/group/:idGroup/email/:email', _sesiones.getSesionesByDateAndGroup);

// Contar las sesiones
router.get('/sesiones/count', _sesiones.getSesionCount);

// Busqueda de una sesion por id
router.get('/sesiones/:id', _sesiones.getSesion);

// Cancelar una sesion en la BD
router.post('/sesiones/cancelSesion/:idSesion', _sesiones.cancelSesion);

// Creacion de sesiones regular en la BD
router.post('/sesiones/regular/:fechaFin', _sesiones.saveRegularSesion);

// Creacion de sesion nueva en la BD
router.post('/sesiones', _sesiones.saveSesion);

// Borrar por id
router["delete"]('/sesiones/:id', _sesiones.deleteSesion);

// Actualizar una sesion por id
router.put('/sesiones/:id', _sesiones.updateSesion);
var _default = router;
exports["default"] = _default;