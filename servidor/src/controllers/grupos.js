import {connect} from '../database';

// Borra un grupo a traves de su identificador
export const deleteGrupo = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("DELETE FROM grupos WHERE idGrupo = ?", 
    [
        req.params.id
    ]);
    res.sendStatus(204);
}

// Actualiza un grupo a traves del identificador
export const updateGrupo = async (req, res) => {
    const connection = await connect();
    const results = await connection.query("UPDATE grupos SET ? WHERE idGrupo = ?",
    [
        req.body,
        req.params.id
    ]);
    res.sendStatus(204);
}

// Guarda un nuevo grupo traves de la recepcion de un JSON
export const saveGrupo = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(   'INSERT INTO grupos(nombre, nivel, num_alumnos, ' 
                                             + 'comentarios, email, tarifa) VALUES (?,?,?,?,?,?)', 
    [   
        req.body.nombre, 
        req.body.nivel,
        req.body.num_alumnos,
        req.body.comentarios,
        req.body.email,
        req.body.tarifa
    ]);
    res.json({
        id: results.insertId,
        ...req.body,
    });
}

// Devuelve un grupo por su identificador
export const getGrupo = async (req, res) => {
    console.log(req.params.id);
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM grupos WHERE idGrupo = ?', [req.params.id])
    res.json(rows[0]);
}

// Este metodo devuelve todos los grupos por por su email
export const getGrupos = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query(  'SELECT * FROM grupos WHERE email = ?', 
                                            [req.params.email])
    res.json(rows);
}