const { response } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let usuario = Usuario.findOne(email);
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        usuario = new Usuario(req.body);
        await usuario.save();

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'F x el registrado'
        });
    }
}

const loginUsuario = (req, res = response) => {
    const { name, email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}
const revalidarToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}