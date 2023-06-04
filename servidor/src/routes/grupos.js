import {Router} from 'express';
import {getGrupos, getGrupo, updateGrupo, deleteGrupo, saveGrupo} from '../controllers/grupos'
const router = Router()

/**
 * @swagger
 * /tasks:
 * get:
 *  summary: Obtiene todas las sesiones de la BD
 */

// Modificar por id
router.put('/grupos/:id', updateGrupo)

// Borrar por id
router.delete('/grupos/:id', deleteGrupo)

// Busqueda de una sesion por id
router.get('/grupos/:id', getGrupo)

// Creacion de grupo nuevo en la BD
router.post('/grupos', saveGrupo)

// Busca grupos por email 
router.get('/grupos/email/:email', getGrupos)


export default router