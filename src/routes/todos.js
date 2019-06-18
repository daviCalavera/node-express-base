import express from 'express';

import { todoReqValidator } from '../modules/reqValidators';
import TodoService from '../services/todoService';

const router = express.Router();
const result = {
  err: null,
  mesg: null
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

  const data = req.body;
});


router.get('/:id', async (req, res, next) => {

});


router.put('/:id', async (req, res, next) => {

});

export default router;