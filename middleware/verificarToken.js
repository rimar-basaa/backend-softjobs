const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => { 
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ mensaje: 'Token NO existe' });
    };

    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET);
        next();

    } catch (error) {
        res.status(400).json({ mensaje: 'Token NO es valido o Tiempo expirado' });
    };
};

module.exports = verificarToken;
