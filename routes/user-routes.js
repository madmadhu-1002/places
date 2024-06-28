import express from 'express';
import {getUsers, getUserById, addUser} from '../controllers/user-contoller.js';
const router = express.Router();

router.get('/', getUsers);

router.get('/:id',getUserById);

router.post('/signup',addUser);

export default  router;