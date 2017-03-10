const randstr = require('js-randstr');
const router = require('express').Router();

router.get('/', (req, res) => {
    return res.redirect('/' + randstr(6));
});

router.get('/:room', (req, res) => {
    const room = req.params.room;
    if(room.length != 6)
        return res.redirect('/404.html');
    res.sendFile(__dirname + '/client/home.html');
});

module.exports = router;
