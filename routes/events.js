/*
    Rutas de Usuarios / Events
    host + /api/events
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


const router = Router();
router.use(validarJWT);


router.get('/', getEventos);

router.post(
    '/',
    [
        check('title', 'El título debe ser necesario').not().isEmpty(),
        check('start', 'Fecha inicio obligatoria').custom( isDate ),
        check('end', 'Fecha fin obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
    );

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);


module.exports = router;