import express from 'express';
import { postComment, getComments } from './comment.controller';

const commentRouter = express.Router();

commentRouter.post('/', postComment);
commentRouter.get('/', getComments);

export default commentRouter;