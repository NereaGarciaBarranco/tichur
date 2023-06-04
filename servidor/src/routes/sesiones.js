import {Router} from 'express';
import {saveSesion, getSesion, getSesionCount, getSesiones, getSesionesToday, getSesionesByDate, 
    getSesionesByGroup, getSesionesByDateAndGroup, deleteSesion, updateSesion, getSesionAnterior, getSesionPosterior} from '../controllers/sesiones'
const router = Router()

/**
 * @swagger
 * /tasks:
 * get:
 *  summary: Obtiene todas las sesiones de la BD
 */

// Busca la sesion anterior a la proporcionada del mismo grupo
router.get('/sesiones/anterior/id/:id', getSesionAnterior)

// Busca la sesion posterior a la proporcionada del mismo grupo
router.get('/sesiones/posterior/id/:id', getSesionPosterior)

// Busca sesiones por email ordenadas por fecha y hora_inicio ASC
router.get('/sesiones/email/:email', getSesiones)

// Busca sesiones de hoy por email ordenadas por hora_inicio ASC
router.get('/sesiones/today/email/:email', getSesionesToday)

// Busca sesiones por fecha y por email ordenadas por hora_inicio ASC
router.get('/sesiones/date/:date/email/:email', getSesionesByDate)

// Busca sesiones por grupo y por email ordenadas por hora_inicio ASC
router.get('/sesiones/group/:idGroup/email/:email', getSesionesByGroup)

// Busca sesiones por fecha, por grupo y por email ordenadas por hora_inicio ASC
router.get('/sesiones/date/:date/group/:idGroup/email/:email', getSesionesByDateAndGroup)

// Contar las sesiones
router.get('/sesiones/count', getSesionCount)

// Busqueda de una sesion por id
router.get('/sesiones/:id', getSesion)

// Creacion de sesion nueva en la BD
router.post('/sesiones', saveSesion)

// Borrar por id
router.delete('/sesiones/:id', deleteSesion)

// Actualizar una sesion por id
router.put('/sesiones/:id', updateSesion)

export default router