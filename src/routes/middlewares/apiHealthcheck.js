import expressHealthcheck from 'express-healthcheck';
import mongoose from 'mongoose';

const apiStatus = () => {
  return {
     state: 'up',
     dbState: mongoose.STATES[mongoose.connection.readyState]
  };
};

export default expressHealthcheck({
  healthy: apiStatus
});