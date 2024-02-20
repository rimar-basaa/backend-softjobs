const pool = require('../db/config');

const usuarioUnico = async (req, res, next) => {
        const { email } = req.body;
        const consulta = "SELECT * FROM usuarios WHERE email = $1";
        const values = [email];
        const { rowCount } = await pool.query(consulta, values);

        if (!rowCount){
            next();
        } else {
            res.status(500).json({ message: "Este Usuario Ya existe"});
        };
};

module.exports = usuarioUnico;