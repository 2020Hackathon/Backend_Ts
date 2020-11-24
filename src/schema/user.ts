import Joi from '@hapi/joi';
import { JoiAuthBearer } from '../middleware/validator';

export default {
  userCredential: Joi.object().keys({
    id: Joi.string().required().min(6),
    password: Joi.string().required().min(6),
  }),
  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  signup: Joi.object().keys({
    name: Joi.string().required().min(2),
    id: Joi.string().required().min(6),
    password: Joi.string().required().min(6),
    userinfo: Joi.string().required(),
  }),
};
