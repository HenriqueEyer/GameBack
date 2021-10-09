class User {
  constructor(username, idRoom, idSocket) {
    this.username = username,
    this.idRoom = idRoom,
    this.idSocket = idSocket,
    this.online = true
  }
}

module.exports = User;