const Room = require('../Moldel/room');
const User = require('../Moldel/user');
const Label = require('../Labels');
const { v4: uuidv4 } = require('uuid');

const createRoom = (data, socket) => {
  const { room, rooms } = data;
  if (rooms.has(room)) {
    socket.emit('error_message', Label.MESSAGE_ERRORS.ROOM_EXIST);
  } else {
    const newRoom = new Room(room);
    rooms.set(room, newRoom);
    socket.emit('joined_room', { goRoom: true, name: room });
  }
}

const joinRoom = (data, socket) => {
  const { room, rooms, username } = data;

  const error = validateRoom(rooms, room);

  if (error.status) {
    socket.emit('error_message', error.message);
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

const validateRoom = (rooms, room) => {
  if (!rooms.has(room)) {
    return {
      status: true,
      message: Label.MESSAGE_ERRORS.ROOM_NOT_EXIST
    };
  }

  if (rooms.get(room).status !== 'open') {
    return {
      status: true,
      message: Label.MESSAGE_ERRORS.CLOSED_ROOM
    };
  }

  return {
    status: false,
    message: ''
  };
}

module.exports = {
  createRoom,
  joinRoom
}