
const createRoom = (data, socket) => {
  const { room, rooms } = data;

  if (rooms.has(room)) {
    socket.emit('error_message', 'Sala já existe');
  } else {
    rooms.set(room, { status: 'open', users: [] });
    socket.emit('joined_room', { goRoom: true, name: room });
  }
}

const joinRoom = (data, socket) => {
  const { room, rooms, username } = data;
  if (!rooms.has(room)) {
    socket.emit('error_message', 'Sala não existe');
    return;
  }

  if (rooms.get(room).status !== 'open') {
    socket.emit('error_message', 'Sala fechada');
    return;
  }

  const user = {
    username
  }

  socket.join(room);

  const newRoom = rooms.get(room);
  newRoom.users.push({ ...user });
  rooms.set(room, { ...newRoom });
  socket.to(room).emit('new_user', newRoom.users);
  socket.emit('logged', { users:newRoom.users });
}

module.exports = {
  createRoom,
  joinRoom
}