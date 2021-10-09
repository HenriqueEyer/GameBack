const Room = require('../Moldel/room');
const User = require('../Moldel/user');
const { v4: uuidv4 } = require('uuid');

const createRoom = (data, socket) => {
  const { room, rooms } = data;
  console.log(socket.id)
  if (rooms.has(room)) {
    socket.emit('error_message', 'Sala já existe');
  } else {
    const newRoom = new Room(room);
    rooms.set(room, newRoom);
    socket.emit('joined_room', { goRoom: true, name: room });
  }
}

const joinRoom = (data, socket) => {
  const { room, rooms, username } = data;
  console.log(socket.id)
  if (!rooms.has(room)) {
    socket.emit('error_message', 'Sala não existe');
    return;
  }

  if (rooms.get(room).status !== 'open') {
    socket.emit('error_message', 'Sala fechada');
    return;
  }

  const generateKey = uuidv4();

  const user = new User(
    username,
    generateKey,
    socket.id
  )

  socket.join(room);

  const newRoom = rooms.get(room);

  newRoom.addUser(user);

  socket.to(room).emit('new_user', newRoom.users);
  socket.emit('logged', { users: newRoom.users, user });
}

// const disconnectRoom = (data, socket) => {
//   const { room, rooms, username } = data;

//   if (rooms.has(room)) {
//     return;
//   } else {
//     socket.to(room).emit('new_user', newRoom.users);
//   }
// }


module.exports = {
  createRoom,
  joinRoom
}