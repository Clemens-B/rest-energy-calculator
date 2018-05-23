const EnergyModel = require('../models/energy.model');
const ApiError = require('../config/apiErrors');
const httpStatus = require('http-status');


/* 
Export functions come in here ------------------------------------------------------------------------------
*/

function getAll(req, res, next) {
    EnergyModel.find({})
        .then(items => res.json(items))
        .catch(err => next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR)));
};

function getTotalNumber(req, res, next) {
    EnergyModel.count({})
        .then(count => res.json(count))
        .catch(err => next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR)));
};

function getById(req, res, next) {
    EnergyModel.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => next(new ApiError("No such ID found", httpStatus.NOT_FOUND)))
}

function deleteById(req, res, next) {

    EnergyModel.findOne({ _id: req.params.id }, function (err, item) {
        if (err) { return next(new ApiError("No such ID found", httpStatus.NOT_FOUND)) }
        else {
            EnergyModel.remove({ _id: req.params.id }, function (err, item) {
                if (err) {
                    return next(new ApiError("Error deleting", httpStatus.INTERNAL_SERVER_ERROR))
                }
                else {
                    res.json(`Item ${req.params.id} deleted`);
                }
            });
        }

    });
}

function createNew(req, res, next) {

    req.body.co2RefValue = 36.59079 + 0.08987 * req.body.weight;
    req.body.energyClass = (req.body.co2-(req.body.co2RefValue))/req.body.co2RefValue*100;

    let newEnergy = EnergyModel(req.body);
   
    newEnergy.save(function (err) {
        if (err) {
            return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
        }
        res.status(201).send(newEnergy);
    });
}

function updateById(req, res, next) {

    EnergyModel.findOne({ _id: req.params.id }, function (err, item) {
        if (err) {
            return next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else {
            const tempItem = item;

            //Assign body to Model
            //it's easier to assign everything new than to search in an array of objects...(means you need to send the whole entry)
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    tempItem[key] = req.body[key];
                }
            }

            EnergyModel.findByIdAndUpdate(req.params.id, tempItem, { new: true, runValidators: true }, function (err, item) {
                if (err) {
                    return next(err);
                }
                else {
                    res.json(`Item ${req.params.id} updated`);
                }
            });
        }
    })
}


module.exports = { getAll, getById, createNew, deleteById, updateById, getTotalNumber }
