import express from 'express';

import { log } from '../modules/logger';
import apiHealthcheck from './middlewares/apiHealthcheck';

const router = express.Router();

/**
 * @swagger
 * /system/ping:
 *   get:
 *     tags:
 *       - System
 *     summary: System ping
 *     description: ''
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Request was successful
 *         schema:
 *           $ref: '#/definitions/SimpleStatus'
 *       '400':
 *         description: Bad Request
 *         schema:
 *           $ref: '#/definitions/Error'
 *       '401':
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       '404':
 *         description: Not foundv
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.get('/ping', (req, res) => {
  log.debug('ping request');

  res.json({
    date: new Date(),
    ok: true
  });
});

router.get('/uptime', apiHealthcheck);

export default router;