const {v4: uuidv4} = require('uuid');

class User {
  constructor({id = uuidv4(), name = 'USER', login = 'user', password = 'P@55w0rd'} = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  };

  setProperty(property) {
    this.name = property.name ?? this.name;
    this.login = property.login ?? this.login;
    this.password = property.password ?? this.password;
  };

  toResponse() {
    const { id, name, login } = this;

    return { id, name, login };
  };

}

module.exports = User;
