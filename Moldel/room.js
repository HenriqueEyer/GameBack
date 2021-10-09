class Room {
  constructor(name) {
    this.name = name,
      this.users = [],
      this.status = 'open'
  }

  addUser(user) {
    const isUserExist = this.getUserByUsername(user.username);
    if (isUserExist) {
      isUserExist.online = true;
    } else {
      this.users = [...this.users, { ...user }];
    }
    console.log(this)
  }

  getUserByUsername(username) {
    return this.users.find((user) => user.username === username);
  }
}

module.exports = Room;