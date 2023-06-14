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
 *  summary: 
 */

// Obtener ganancias por mes
router.get('/ganancias/monthly/:email', _ganancias.getMonthlyProfits);

// Obtiene las ganancias del mes actual
router.get('/ganancias/actualProfit/:email', _ganancias.getActualProfit);
var _default = router;
exports["default"] = _default;