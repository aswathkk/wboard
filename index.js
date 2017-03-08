const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/client'));

io.on('connect', socket => {
    socket.on('draw start', data => socket.broadcast.emit('draw start', data));
    socket.on('draw', data => socket.broadcast.emit('draw', data));
});

server.listen(port, () => console.log('Server listening on port ' + port));
