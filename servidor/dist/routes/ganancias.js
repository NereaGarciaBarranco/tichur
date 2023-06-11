"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _ganancias = require("../controllers/ganancias");
var router = (0, _express.Router)();

/**
 * @swagger
 * /tasks:
 * get:
 *  summary: Obtiene todas las sesiones de la BD
 */

// Obtener ganancias por mes

router.get('/ganancias/monthly/:email', _ganancias.getMonthlyProfits);
var _default = router;
exports["default"] = _default;