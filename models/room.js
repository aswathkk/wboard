const mongoose = require('mongoose');
const randstr = require('js-randstr');

// Generate random string with length 6
const randUrl = () => {
    return randstr(6);
}

const roomSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: randUrl,
        unique: true
    },
    name: String,
    members: [{
        name: String
    }]
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
