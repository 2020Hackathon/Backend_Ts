import express from 'express';
import signup from './user/signup';
import signin from './user/signin';
import token from './user/token';
import searchByDate from './post/searchByDate';

const router = express.Router();

router.use('/signUp', signup);
router.use('/signIn', signin);
router.use('/token', token);

router.use('/post', searchByDate);

export default router;
