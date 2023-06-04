"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _users = require("../controllers/users");
var router = (0, _express.Router)();

// Creacion de un nuevo usuario
router.post('/users', _users.saveUser);

// Busqueda de un usuario por email
router.get('/users/:email', _users.getUser);
var _default = router;
exports["default"] = _default;