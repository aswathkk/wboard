const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const routes = require('./routes');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/client'));

app.use(routes);

io.on('connect', socket => {
    // Adding user to a room
    socket.on('connection', data => socket.join(data.room));
    
    socket.on('draw start', data => socket.to(data.room).emit('draw start', data));
    socket.on('draw', data => socket.to(data.room).emit('draw', data));
    socket.on('erase start', data => socket.to(data.room).emit('erase start', data));
    socket.on('erase', data => socket.to(data.room).emit('erase', data));
    socket.on('text', data => socket.to(data.room).emit('text', data));
});

server.listen(port, () => console.log('Server listening on port ' + port));
