import express from 'express';
import {
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
} from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts); // no need for auth to see posts
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.patch('/:id/likePost', auth, likePost);
router.delete('/:id', auth, deletePost);

export default router;
