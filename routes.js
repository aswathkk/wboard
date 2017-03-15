const router = require('express').Router();
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const Room = require('./models/room');

// Create room with random URL
const createRoom = async (() => {
    let room = new Room();
    let data;
    try {
        data = await (room.save());
    } catch(err) {
        return createRoom();
    }
    return data;
});

router.get('/', (req, res) => {
    createRoom().then((room) => {
        return res.redirect('/' + room._id);
    });
});

router.get('/:room', (req, res) => {
    const room = req.params.room;
    if(room.length != 6)
        return res.redirect('/404.html');
    Room.findById(room, (err, data) => {
        if(err || !data)
            return res.redirect('/404.html');
        else
            return res.sendFile(__dirname + '/client/home.html');
    });
});

module.exports = router;
