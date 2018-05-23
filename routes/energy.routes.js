const router = require('express').Router();
const energyController = require('../controller/energy.controller');
const ApiError = require('../config/apiErrors');
const config = require('../config/config');
const httpStatus = require('http-status');


router.route('/')

    .get(energyController.getAll)
    .post(energyController.createNew)

    .all((req, res, next) => {
        let err = new ApiError('this method is not allowed at ' + req.originalUrl, httpStatus.METHOD_NOT_ALLOWED);
        next(err);
    });


router.route('/:id')

    .get(energyController.getById)
    .put(energyController.updateById)
    .delete(energyController.deleteById)

    .all((req, res, next) => {
        let err = new ApiError('this method is not allowed at ' + req.originalUrl, httpStatus.METHOD_NOT_ALLOWED);
        next(err);
    });



module.exports = router;