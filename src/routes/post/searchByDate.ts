import express from "express";
import {ProtectedRequest} from "app-request";
import asyncHandler from "../../middleware/asyncHandler";
import postRepo from '../../database/repository/PostRepo';
import {Post, postInfo} from "../../database/model/Post";
import _ from "lodash";
import LikesRepository from "../../database/repository/LikesRepo";
import authentication from "../../auth/authentication";
import {SuccessResponse} from "../../core/apiResponse";
import PostRepository from "../../database/repository/PostRepo";
import Recruitment from "../../database/model/Recruitment";
import RecruitmentRepository from "../../database/repository/RecruitmentRepo";

const router = express.Router();

router.use('/', authentication);

router.get(
    '/dateSearch',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const post = await postRepo.findAllByPostinfo(req.query.postinfo.toString());

        const posts = post.map(value => {
            const likes = LikesRepository.findAllByUser_idAndPost_id(req.user.id, value.id);
            if (likes) value.likes = true;

            return _.pick(value, [
                "id",
                "user_id",
                "title",
                "description",
                "like",
                "postinfo",
                "end_date",
                "likes",
                "createdAt"
            ])
        });

        res.status(200).json({ posts })
    })
);

router.get(
    '/likeSearch',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const post = await postRepo.findAllByPostinfo(req.query.postinfo.toString());

        const posts = post.map(value => {
            const likes = LikesRepository.findAllByUser_idAndPost_id(req.user.id, value.id);
            if (likes) value.likes = true;

            return _.pick(value, [
                "id",
                "title",
                "description",
                "postinfo",
                "end_date",
                "likes",
                "createdAt"
            ])
        });

        res.status(200).json({ posts })
    })
);

router.get(
    '/postDetail',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const post: any = await PostRepository.findByPost_id(Number(req.query.id));
        const recruitment = await RecruitmentRepository.findByPost_id(Number(req.query.id));
        const likes = LikesRepository.findAllByUser_idAndPost_id(req.user.id, Number(req.query.id));
        if (likes) post.likes = true;

        post.recruitment = recruitment

        new SuccessResponse('postDetail  Success', {
            post: _.pick(post, [
                "id",
                "title",
                "description",
                "likes",
                "recruitment"
            ])
        }).send(res);
    })
)

router.post(
    '/like',
    asyncHandler(async (req: ProtectedRequest, res) => {
        await LikesRepository.createLike(req.user.id, Number(req.query.id));
        const post = await PostRepository.findByPost_id(Number(req.query.id));

        await PostRepository.likeUpdate(Number(req.query.id), ++post.like)

        new SuccessResponse('like Success', {}).send(res);
    })
)

router.delete(
    '/unlike',
    asyncHandler(async (req: ProtectedRequest, res) => {
        await LikesRepository.deleteLike(req.user.id, Number(req.query.id));
        const post = await PostRepository.findByPost_id(Number(req.query.id));

        await PostRepository.likeUpdate(Number(req.query.id), --post.like);

        new SuccessResponse('like Delete success', {}).send(res);
    })
)

export default router;
