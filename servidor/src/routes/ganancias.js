import {Router} from 'express';
import { getMonthlyProfits } from '../controllers/ganancias'
const router = Router()

/**
 * @swagger
 * /tasks:
 * get:
 *  summary: Obtiene todas las sesiones de la BD
 */

// Obtener ganancias por mes

router.get('/ganancias/monthly/:email', getMonthlyProfits)

export default router