const mongoose = require('mongoose');
const randstr = require('js-randstr');

const roomSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: randstr(6),
        unique: true
    },
    name: String,
    members: [{
        name: String
    }]
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
