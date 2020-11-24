import Joi from '@hapi/joi';
import { JoiAuthBearer } from '../middleware/validator';

export default {
  auth: Joi.object().keys({
    authorization: JoiAuthBearer().required(),
  }),
};
