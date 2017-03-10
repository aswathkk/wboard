const router = require('express').Router();

router.get('/', (req, res) => {
    return res.redirect('/abcdef');
});

router.get('/:room', (req, res) => {
    const room = req.params.room;
    if(room.length != 6)
        return res.redirect('/404.html');
    res.sendFile(__dirname + '/client/index.html');
});

module.exports = router;
