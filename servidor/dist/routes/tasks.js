"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tasks = require("../controllers/tasks");
var router = (0, _express.Router)();

/**
 * @swagger
 * /tasks:
 * get:
 *  summary: Obtiene todas las tareas de la BD
 */
router.get('/tasks', _tasks.getTasks);

// Contar las tareas
router.get('/tasks/count', _tasks.getTaskCount);

// Busqueda de una tarea por id
router.get('/tasks/:id', _tasks.getTask);

// Creacion de tarea nueva en la BD
router.post('/tasks', _tasks.saveTask);

// Borrar por id
router["delete"]('/tasks/:id', _tasks.deleteTask);

// Actualizar una tarea por id
router.put('/tasks/:id', _tasks.updateTask);
var _default = router;
exports["default"] = _default;