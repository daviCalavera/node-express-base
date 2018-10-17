import express from 'express';

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Error:
 *    required:
 *     - code
 *    type: object
 *    properties:
 *     code:
 *       type: string
 *       description: Unique error code
 *     message:
 *       type: string
 *       description:  Error message
 *
 *   SimpleStatus:
 *     required:
 *     - status
 *     type: object
 *     properties:
 *      status:
 *       type: string
 *
 *   SimpleBooleanStatus:
 *     required:
 *     - status
 *     type: object
 *     properties:
 *      status:
 *       type: boolean
*/
router.get('/', (req, res) => {
  res.send({title: 'Rest API'});
});

export default router;