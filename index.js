const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let listUsers = {};
let rooms = [];


io.on('connection', (socket) => {
  console.log(listUsers)

  socket.on('login', ({ username }) => {
    const randomNumber = Math.random();
    listUsers[randomNumber] = {
      name: username,
    }
    io.emit('success-login', { message: 'Login realizado com sucesso', number: randomNumber });
  })

  socket.on('disconnect', () => {
    io.emit('adeus', { message: 'Poxa, fica mais, vai ter bolo :)' });
  });
});

server.listen(4555, () => {
  console.log('listening on *:4555');
});

