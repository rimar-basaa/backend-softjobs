const pool = require('../db/config');
const bcrypt = require('bcryptjs');

const traerUsuario = async (email) => {
    const consulta = "SELECT id, email, rol, lenguage FROM usuarios WHERE email = $1";
    const values = [email];
    const res = await pool.query(consulta, values);
    return res.rows;
};

const registrarUsuario = async (email, password, rol, lenguage) => {
    const passwordEncriptada = bcrypt.hashSync(password);
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)";
    const values = [email, passwordEncriptada, rol, lenguage];
    await pool.query(consulta, values);
};

module.exports = { traerUsuario, registrarUsuario };

 