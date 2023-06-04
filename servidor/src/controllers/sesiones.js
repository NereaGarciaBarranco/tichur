import {connect} from '../database';

// Este metodo recibe un idSesion y devuelve la sesion anterior a esta con mismo email y grupo
export const getSesionAnterior = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query(  'SELECT * FROM sesiones WHERE idGrupo = (SELECT idGrupo FROM sesiones WHERE idSesion = ?) AND fecha < (SELECT fecha FROM sesiones WHERE idSesion = ?) ORDER BY fecha DESC LIMIT 1',
                                            [req.params.id, req.params.id])
    res.json(rows[0]);
}

// Este metodo recibe un idSesion y devuelve la sesion posterior a esta con mismo email y grupo
export const getSesionPosterior = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query(  'SELECT * FROM sesiones WHERE idGrupo = (SELECT idGrupo FROM sesiones WHERE idSesion = ?) AND fecha > (SELECT fecha FROM sesiones WHERE idSesion = ?) ORDER BY fecha ASC LIMIT 1',
                                            [req.params.id, req.params.id])
    res.json(rows[0]);
}

// Este metodo devuelve todas las sesiones de un usuario en concreto a traves de su
// email y las devuelve ordenadas por f echa y, ademas, por la hora comienzo.
export const getSesiones = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query(  'SELECT * FROM sesiones WHERE email = ? ORDER BY fecha ASC,' +  
                                            'hora_inicio ASC', 
                                            [req.params.email])
    res.json(rows);
}

// Este metodo devuelve todas las sesiones del dia actual de un usuario en concreto 
// a traves de su  email y las devuelve ordenadas por fecha y, ademas, por la hora comienzo.
export const getSesionesToday = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query(  'SELECT * FROM sesiones WHERE email = ? AND fecha = CURDATE()' +  
                                            'ORDER BY hora_inicio ASC', 
                                            [req.params.email])
    res.json(rows);
}

// Este metodo devuelve todas las sesiones de un usuario concreto a traves de su email,
// y las devuelve ordenadas por fecha y hora de inicio.
export const getSesionesByDate = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query(  'SELECT * FROM sesiones WHERE email = ? AND fecha = ?' + 
                                            'ORDER BY fecha ASC, hora_inicio ASC', 
                                            [req.params.email, req.params.date])
    res.json(rows);
}

// Esta peticion filtra las sesiones de un usuario concreto por nombre de grupo
// y las devuelve ordenadas por fecha y hora de inicio.
export const getSesionesByGroup = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query(  'SELECT * FROM sesiones WHERE email = ? AND idGrupo = ?' + 
                                            'ORDER BY fecha ASC, hora_inicio ASC', 
                                            [req.params.email, req.params.idGroup])
    res.json(rows);
}

// Este metodo gestiona los filtros de la aplicacion, atendiendo peticiones
// en los que se le muestra el usuario todas sus sesiones filtradas por 
// una fecha y/o un grupo de alumnos.
export const getSesionesByDateAndGroup = async (req, res) => {
    const connection = await connect();

    // Si no se ha rellenado ni fecha ni grupo se sacan todas las sesiones
    if (req.params.date == '*' && req.params.group == '*') {
        const [rows] = await connection.query(  'SELECT * FROM sesiones WHERE email = ?' + 
                                                'ORDER BY fecha ASC, hora_inicio ASC', 
                                                [req.params.email])
        res.json(rows);
    } else if (req.params.group == '*') { // Sesiones por fecha
        const [rows] = await connection.query(  'SELECT * FROM sesiones WHERE email = ?' 
                                                + 'AND fecha = ? ORDER BY fecha ASC, hora_inicio ASC', 
                                                [req.params.email, req.params.date])
        res.json(rows);
    } else if (req.params.date == '*') { // Sesiones por grupo
        const [rows] = await connection.query(  'SELECT * FROM sesiones WHERE email = ?' 
                                                + 'AND idGrupo = ? ORDER BY fecha ASC, hora_inicio ASC', 
                                                [req.params.email, req.params.idGroup])
        res.json(rows);
    } else { // Sesiones por fecha y grupo
        const [rows] = await connection.query(  'SELECT * FROM sesiones WHERE email = ?' + 
                                                'AND fecha = ? AND idGrupo = ? ORDER BY hora_inicio ASC', 
                                                [req.params.email, req.params.date, req.params.idGroup])
        res.json(rows);
    }
    // res.json(rows);
}

// Devuelve una sesion por su identificador
export const getSesion = async (req, res) => {
    console.log(req.params.id);
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM sesiones WHERE idSesion = ?', [req.params.id])
    res.json(rows[0]);
}

// Devuelve el numero total de sesiones registradas en la aplicacion
export const getSesionCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT COUNT(*) FROM sesiones');
    res.json(rows[0]["COUNT(*)"]);
}

// Guarda una nueva sesion a traves de la recepcion de un JSON
export const saveSesion = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(   'INSERT INTO sesiones(fecha, hora_inicio, hora_fin, ' 
                                             + 'idGrupo, notas, deberes, email) VALUES (?,?,?,?,?,?,?)', 
    [   
        req.body.fecha, 
        req.body.hora_inicio,
        req.body.hora_fin,
        req.body.idGrupo,
        req.body.notas,
        req.body.deberes,
        req.body.email
    ]);
    res.json({
        id: results.insertId,
        ...req.body,
    });
}

// Borra una sesion a traves de su identificador
export const deleteSesion = async (req, res) => {
    const connection = await connect();
    const result = await connection.query("DELETE FROM sesiones WHERE idSesion = ?", 
    [
        req.params.id
    ]);
    res.sendStatus(204);
}

// Actualiza una sesion a traves del identificador, actualizando la sesion entera
export const updateSesion = async (req, res) => {
    const connection = await connect();
    const results = await connection.query("UPDATE sesiones SET ? WHERE idSesion = ?",
    [
        req.body,
        req.params.id
    ]);
    res.sendStatus(204);
}