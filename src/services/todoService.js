
import Todo from '../models/todo';

class TodoService {

  /**
   * Obtiene todos los TO-DO disponibles
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
  }// getTodos()
}

module.exports = TodoService;