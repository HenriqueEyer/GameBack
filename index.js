const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { createRoom, joinRoom } = require('./Controller/rooms');

const rooms = new Map();

io.on('connection', (socket) => {

  socket.on('create_room', (data) => {
    createRoom({ ...data, rooms}, socket)
    console.log('create_room', io.sockets.adapter.rooms)
  })

  socket.on('join_room', (data) => {
    joinRoom({ ...data, rooms}, socket)
    console.log('join_room', io.sockets.adapter.rooms)
  })

  socket.on('disconnect', () => {
    io.emit('adeus', { message: 'Poxa, fica mais, vai ter bolo :)' });
  });
});

server.listen(4555, () => {
  console.log('listening on *:4555');
});
