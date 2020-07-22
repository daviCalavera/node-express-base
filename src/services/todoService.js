
import Todo from '../models/todo';

class TodoService {

  /**
   * @description Obtiene todos los TO-DO disponibles
   *
   * @static
   * @returns {Promise} Promesa de un objeto con device o error.
   * @memberof TodoService
   */
  static async getTodos() {

    let foundTodos = null;

    try {
      foundTodos = await Todo.find().exec();
    } catch (err) {
      throw err;
    }

    return foundTodos;
  }// getTodos

  /**
   * @description Creates a new TO-DO item.
   *
   * @static
   * @param {string} task
   * @param {string} status
   * @returns
   * @memberof TodoService
   */
  static async createTODO(task, status) {
    const newTODO = new Todo({task, status});

    const err = newTODO.validateSync();
    if (err) {
      throw err;
    }

    try {
      const created = await newTODO.save();

      return created;
    } catch (err) {
      throw err;
    }
  }// createTODO

  static async getByID(todoID) {
    const data = {
      _id: todoID
    };
    let foundTodo = null;

    try {
      foundTodo = await Todo.findOne(data).exec();
    } catch (err) {
      throw err;
    }

    return foundTodo;
  }
}

module.exports = TodoService;