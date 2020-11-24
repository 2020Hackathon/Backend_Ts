import express from 'express';
import validator from '../../middleware/validator';
import { SuccessResponse } from '../../core/apiResponse';
import schema from '../../schema/user';
import asyncHandler from '../../middleware/asyncHandler';
import { RoleRequest } from 'app-request';
import userRepo from '../../database/repository/UserRepo';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import _ from 'lodash';
import { environment } from '../../config';
import { createTokens } from '../../auth/authUtils';
import {
  BadRequestError,
  AuthFailureError,
  NotFoundError,
} from '../../core/apiError';

const router = express.Router();

router.post(
  '/basic',
  validator(schema.userCredential),
  asyncHandler(async (req: RoleRequest, res) => {
    const user = await userRepo.findById(req.body.id);
    if (!user) throw new AuthFailureError('Authentication failure');

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new AuthFailureError('Authentication failure');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    userRepo.UserKeyUpdate(user.id, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);

    new SuccessResponse('Login Success', {
      user: _.pick(user, [
        'id',
        'userinfo',
        'name',
      ]),
      tokens: tokens,
    }).send(res);
  }),
);

export default router;
