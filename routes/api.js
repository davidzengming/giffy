var express = require('express');
var router = express.Router();
var controllers = require('../controllers/');

/* GET users listing. */
router.get('/:resource', function(req, res, next) {
    var resource = req.params.resource;
    var controller = controllers[resource];

    if (controller == null) {
        res.json({
            confirmation: 'failure',
            message: 'Resource not found' 
        });
    }

    controller
    .get(req.query)
    .then(function(results) {
        res.json({
            confirmation: 'success',
            results: results
        });
    })
    .catch(function(err) {
        res.json({
            confirmation: 'failure',
            message: err
        });
    });
});

router.post('/:resource', function(req, res, next) {
    var resource = req.params.resource;
    controller = controllers[resource];
    if (controller == null) {
        res.json({
            confirmation: 'failure',
            message: 'Resource not found'
        });
    } 

    controller
    .post(req.body)
    .then(function(result) {
        res.json({
            confirmation: 'success',
            result: result
        });
    })
    .catch(function(err) {
        res.json({
            confirmation: 'failure',
            message: err
        });
    });
});

module.exports = router;
