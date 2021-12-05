const { v4: uuidv4 } = require('uuid');

class Board {
  constructor({ id = uuidv4(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = this.setColumns(columns);
  }

  setColumns(columns) {
    this.setColumns.bind(this);

    const result = [];

    columns.forEach((column) => {
      if (!column.id) {
        const newColumn = column;
        newColumn.id = uuidv4();

        return result.push(newColumn);
      }

      return result.push(column);
    });

    return result;
  }

  setProperty(property) {
    this.title = property.title ?? this.title;
    this.columns = property.columns
      ? this.setColumns(property.columns)
      : this.columns;
  }

  toResponse() {
    const { id, title, columns } = this;

    return { id, title, columns };
  }
}

module.exports = Board;
