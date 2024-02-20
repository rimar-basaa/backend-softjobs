const express = require('express');
const router =express.Router();
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const validarCampos = require('../middleware/validarCampos');
const verificarCredencial = require('../middleware/verificarCredencial');
const verificarToken = require('../middleware/verificarToken');
const usuarioUnico = require('../middleware/usuarioUnico');
const { traerUsuario, registrarUsuario } = require('../consultas/consultas');

// ***** Registrar usuario
router.post("/usuarios", 
    [body('email') 
        .not().isEmpty().withMessage('email NO puede estar vacío')
        .trim().isEmail().withMessage('Formato de correo es invalido')
        .optional(),
    body('password')
        .not().isEmpty().withMessage('password NO puede estar vacío')
        .optional(),
    body('rol')
        .not().isEmpty().withMessage('rol NO puede estar vacío')
        .optional(),
    body('lenguage')
        .not().isEmpty().withMessage('lenguage NO puede estar vacío')
        .optional(), validarCampos],
usuarioUnico, async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body;
        await registrarUsuario(email, password, rol, lenguage);
        res.json({ message: "Se agrego nuevo usuario"});

    } catch (error) {
        res.status(500).json({ message: error.message});
    };    
});


// ***** Inicio sesion
router.post("/login",
    [body('email') 
        .not().isEmpty().withMessage('email NO puede estar vacío')
        .trim().isEmail().withMessage('Formato de correo es invalido')
        .optional(),
    body('password')
        .not().isEmpty().withMessage('password NO puede estar vacío')
        .optional(), validarCampos],
async (req, res) => {
    try {
        const { email, password } = req.body;
        await verificarCredencial(email, password);
        const token = jwt.sign({ email }, process.env.SECRET, {expiresIn: "1m"});
        res.json({token});

    } catch (error) {
        res.status(400).json({ message: "Email o contraseña es incorrecta"});
    };    
});


// ***** Traer data para perfil
router.get("/usuarios", verificarToken, async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { email } = jwt.decode(token);
        const rows = await traerUsuario(email);
        res.json(rows);
        console.log(`
        ************************************************
        Por seguridad el campo [password] NO se devuelve
        ************************************************`);

    } catch (error) {
        res.status(500).json({ message: error.message});
    };
    
});


module.exports = router;