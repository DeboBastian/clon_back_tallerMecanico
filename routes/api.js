const { checkToken } = require('../helpers/middlewares');


const router = require('express').Router();


router.use('/users', require('./api/users'));
router.use('/clients', checkToken, require('./api/clients'));
router.use('/reparations', checkToken, require('./api/reparations'));
router.use('/cars', checkToken, require('./api/cars'));
router.use('/mechanics', checkToken, require('./api/mechanics'));

module.exports = router;


