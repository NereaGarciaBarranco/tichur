import {connect} from '../database';

// Este metodo guarda un usuario en la BD tras recoger sus datos de Google
export const saveUser = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query('INSERT INTO users(name, email) VALUES (?,?)', 
    [   
        req.body.name, 
        req.body.email
    ]);
    res.json({
        id: results.insertId,
        ...req.body,
    });
}

// Este metodo devuelve un usuario en formato JSON buscado a traves de su email
export const getUser = async (req, res) => {
    console.log(req.params.email);
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [req.params.email])
    res.json(rows[0]);
}