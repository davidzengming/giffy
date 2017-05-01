var express = require('express');
var router = express.Router();
var controllers = require('../controllers/');

router.get('/:action', function(req, res, next) {
    var action = req.params.action;
    if (req.session == null) {
        res.json({
            confirmation: 'success',
            user: null
        });
        return;
    }

    if (req.session.user == null) {
        res.json({
            confirmation: 'success',
            user: null
        });
        return;
    }

    if (action == 'currentuser') {
        controllers.profile
        .getById(req.session.user)
        .then(function(user) {
            res.json({
                confirmation: 'success',
                user: user
            });
        })
        .catch(function(err) {
            res.json({
                confirmation: 'failure',
                message: err
            })
        })
    }

    if (action == 'logout') {
        req.session.reset();
        res.json({
            confirmation: 'success'
        });
    }
});

router.post('/:action', function(req, res, next) {
    var action = req.params.action;

    if (action == 'register') {
        controllers.profile
        .post(req.body)
        .then(function(profile) {
            req.session.user = profile.id;
            res.json({
                confirmation: 'success',
                user: profile
            })
        })
        .catch(function(err) {
            res.json({
                confirmation: 'failure',
                message: err
            });
        });
    }

    if (action == 'login') {
        controllers.profile
        .get({username: req.body.username})
        .then(function(profiles) {
            if (profiles.length == 0) {
                res.json({
                    confirmation: 'failure',
                    message: 'Profile not found'
                });
                return;
            }
            var profile = profiles[0];

            var isPasswordCorrect = (req.body.password == profile.password);
            if (isPasswordCorrect == false) {
                res.json({
                    confirmation: 'failure',
                    message: 'incorrect password'
                });
                return;
            }

            req.session.user = profile._id;
            res.json({
                confirmation: 'success',
                user: profile
            });
        })
        .catch(function(err) {
            res.json({
                confirmation: 'failure',
                message: err
            })
        });
    }
});

module.exports = router;