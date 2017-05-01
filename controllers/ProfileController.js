var Profile = require('../models/Profile');
var Promise = require('bluebird');

module.exports = {
    get: function(params) {
        return new Promise(function(resolve, reject) {
            Profile.find(params, function(err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    },

    getById: function(id) {
        return new Promise(function(resolve, reject) {
            Profile.findById(id, function(err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
        });
    },

    post: function(body) {
        return new Promise(function(resolve, reject) {
            Profile.create(body, function(err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
}