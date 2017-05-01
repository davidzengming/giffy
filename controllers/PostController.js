var Post = require('../models/Post');
var Promise = require('bluebird');

module.exports = {
    get: function(params) {
        return new Promise(function(resolve, reject) {
            // check the params for lat and lng
            if (params.lat!=null && params.lng!=null){
                // geo spatial query:
                var range = 50/6371 // 6371 is radius of earth in KM
                params['geo'] = {
                    $near: [params.lat, params.lng],
                    $maxDistance: range
                }

                delete params['lat'];
                delete params['lng'];
            }

            var filters = {
                sort: {
                    timestamp: -1
                }
            }
            Post.find(params, null, filters, function(err, res) {
                if (err) {
                    reject(err);
                }
                var list = []
                    res.forEach(function(post, i){
                        list.push(post)
                    })
                resolve(list)
            });

        });
    },

    post: function(body) {
        return new Promise(function(resolve, reject) {
            Post.create(body, function(err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
}

