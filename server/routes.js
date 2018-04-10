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

router.get('/addRoom', (req, res) => {
  createRoom().then((room) => {
    res.send({
      roomid: room._id
    });
  });
});

module.exports = router;
