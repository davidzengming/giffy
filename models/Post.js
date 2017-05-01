var mongoose = require('mongoose');

var PostSchema = {
    username: {type: String, default: ''},
    image: {type: String, default: ''},
    caption: {type: String, default: ''},
    geo: {
        type: [Number],
        index: '2d'
    },
    timestamp: {type: Date, default: Date.now}
};

module.exports = mongoose.model('PostSchema', PostSchema);