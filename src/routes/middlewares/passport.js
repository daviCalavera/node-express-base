import config from '../../../config/server';

class Passport {
  constructor() {

    this.config = config;

    this.authAPIToken = this.authAPIToken.bind(this);
  }

  authAPIToken(req, res, next) {
    const { access_key } = this.config;
    const { headers } = req;

    if (!headers || headers.authorization !== `Bearer ${access_key}`) {
      const error = new Error('Token de acceso inválido.');

      return res.status(401)
      .json({
        error: {
          message: error.message,
          code: 'ACCESS_DENIED'
        }
      }).end();
    }

    req.user = {
      system: true,
      key: config.access_key
    };

    next();
  }

}

export default new Passport();