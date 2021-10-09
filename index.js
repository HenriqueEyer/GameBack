const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { createRoom, joinRoom } = require('./Controller/rooms');

const rooms = new Map();

io.on('connection', (socket) => {
  console.log('connection',socket.id)
  socket.on('create_room', (data) => {
    console.log('init_create_room')
    createRoom({ ...data, rooms }, socket)
    console.log(io.sockets.adapter.rooms)
    console.log('end_create_room')
  })

  socket.on('join_room', (data) => {
    console.log('init_join_room')
    joinRoom({ ...data, rooms }, socket)
    console.log(io.sockets.adapter.rooms)
    console.log('end_join_room')
  })

  socket.on('disconnect', () => {
    console.log('disconnect', socket.id)
    io.emit('adeus', { message: 'Poxa, fica mais, vai ter bolo :)' });
  });
});

server.listen(4555, () => {
  console.log('listening on *:4555');
});
