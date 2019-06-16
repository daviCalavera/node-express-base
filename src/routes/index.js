import base from './base';
import system from './system';
import todos from './todos';

export default (api) => {
  api.use('/', base);
  api.use('/system', system);
  api.use('/todos', todos);
};