const router = require('express').Router();

const Room = require('./models/room');

router.get('/', (req, res) => {
    let room = new Room();
    room.save((err, data) => {
        res.redirect('/' + data._id);
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
