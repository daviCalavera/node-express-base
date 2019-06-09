import base from './base';
import system from './system';

export default (api) => {
  api.use('/', base);
  api.use('/system', system);
};