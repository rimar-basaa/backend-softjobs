const pool = require('../db/config');
const bcrypt = require('bcryptjs');

const verificarCredencial = async (email, password) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const values = [email];
    const { rows: [usuario], rowCount } = await pool.query(consulta, values);
    const { password: passwordEncriptada } = usuario;
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

    if (!passwordEsCorrecta || !rowCount)
        throw { code: 400, message: "Email o contraseña es incorrecta" };
};

module.exports = verificarCredencial;