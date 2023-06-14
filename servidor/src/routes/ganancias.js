import {Router} from 'express';
import { getActualProfit, getMonthlyProfits } from '../controllers/ganancias'
const router = Router()

/**
 * @swagger
 * /tasks:
 * get:
 *  summary: 
 */

// Obtener ganancias por mes
router.get('/ganancias/monthly/:email', getMonthlyProfits)

// Obtiene las ganancias del mes actual
router.get('/ganancias/actualProfit/:email', getActualProfit)

export default router