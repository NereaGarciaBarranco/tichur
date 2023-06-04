import {Router} from 'express';
import {saveUser, getUser} from '../controllers/users'
const router = Router()

// Creacion de un nuevo usuario
router.post('/users', saveUser)

// Busqueda de un usuario por email
router.get('/users/:email', getUser)

export default router