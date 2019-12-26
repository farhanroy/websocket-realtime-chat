const express = require('express');
const socket = require('socket.io');

var app = express();

var server = app.listen(4000, () => {
    console.log('listening to server port 4000');
});

// akses file dari folder public

app.use(express.static('public'));

// socket.io

var io = socket(server);
// koneksi websocket
io.on('connection', (socket) => {
    console.log('make socket connection', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
});