import express from 'express';
import validator from "../../middleware/validator";
import schema from '../../schema/user';
import asyncHandler from "../../middleware/asyncHandler";
import {RoleRequest} from "app-request";
import userRepo from '../../database/repository/UserRepo';
import {BadRequestError, NotFoundError} from "../../core/apiError";
import bcrypt from 'bcrypt';
import {SuccessResponse, userCrashErrorResponse} from "../../core/apiResponse";
import _ from "lodash";

const router = express.Router();

router.post("/basic",
    asyncHandler(async (req: RoleRequest, res) => {
        const user = await userRepo.findById(req.body.id);
        if (user) throw new BadRequestError('ID already exists');

        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const createdUser = await userRepo.createUser(
            req.body.name,
            req.body.id,
            passwordHash,
            req.body.userinfo
        );
        console.log(createdUser)

        new SuccessResponse('Signup Successful', {
            user: _.pick(createdUser, [
                'id',
                'userinfo',
                'name',
            ]),
        }).send(res);
    })
);

export default router;
