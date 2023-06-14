import {connect} from '../database';

// Obtiene ganancias por mes
export const getMonthlyProfits = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(   'CALL `tasks_db`.`calculate_month_profit`(?)', [req.params.email]);
    res.json(results[0]);
}

// Obtiene ganancias por cada grupo del mes actual
export const getActualProfit = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(   'CALL `tasks_db`.`obtain_actual_profit_by_email`(?)', [req.params.email]);
    res.json(results[0]);
}