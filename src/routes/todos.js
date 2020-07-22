import express from 'express';

import { todoReqValidator } from '../modules/reqValidators';
import TodoService from '../services/todoService';

const router = express.Router();
const result = {
  err: null,
  msg: null
};

router.get('/', async (req, res, next) => {

  try {
    const todos = await TodoService.getTodos();

    if (!(Array.isArray(todos) && todos.length > 0)) {
      res.status(204);
    }

    result.success = true;
    res.json({...result, todos});
  } catch (err) {

    return next(err);
  }
});


router.post('/',
todoReqValidator,
async (req, res, next) => {
  const {task, status} = req.body;

  try {
    const todo = await TodoService.createTODO(task, status);

    result.success = true;
    result.msg = 'TODO created successfully!';
    res.status(201)
    .json({
      ...result,
      todo
    });
  } catch (err) {

    return next(err);
  }
});


router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundTodo = await TodoService.getByID(id);

    res.status(200)
    .json({
      ...result,
      todo: foundTodo
    });
  } catch (err) {

    return next(err);
  }
});


router.put('/:id', async (req, res, next) => {

});

export default router;