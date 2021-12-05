const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    id = uuidv4(),
    title = 'TASK',
    order = 0,
    description = 'DESCRIPTION',
    userId = uuidv4(),
    boardId = uuidv4(),
    columnId = uuidv4(),
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  setProperty(property) {
    this.title = property.title ?? this.title;
    this.order = property.order ?? this.order;
    this.description = property.description ?? this.description;
    this.userId = property.userId ?? this.userId;
    this.boardId = property.boardId ?? this.boardId;
    this.columnId = property.columnId ?? this.columnId;
  }

  toResponse() {
    const { id, title, order, description, userId, boardId, columnId } = this;

    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
