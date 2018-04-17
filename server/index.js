const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const routes = require('./routes');

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;

mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/api', routes);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

mongoose.connect('mongodb://localhost/wboard')
.then(() => console.log('connected to DB'), err => console.log(err));

io.on('connect', socket => {
    // Adding user to a room
    socket.on('connection', data => socket.join(data.room));

    socket.on('draw start', data => {socket.to(data.room).emit('draw start', data);console.log(data)});
    socket.on('draw', data => socket.to(data.room).emit('draw', data));
    socket.on('erase start', data => socket.to(data.room).emit('erase start', data));
    socket.on('erase', data => socket.to(data.room).emit('erase', data));
    socket.on('text', data => socket.to(data.room).emit('text', data));
});

server.listen(port, () => console.log(`🌏 Server listening on port ${port}`));
