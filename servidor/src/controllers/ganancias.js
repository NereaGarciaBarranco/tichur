import {connect} from '../database';

// Obtiene ganancias por mes
export const getMonthlyProfits = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(   'CALL `tasks_db`.`calculate_month_profit`(?)', [req.params.email]);
    res.json(results[0]);
}