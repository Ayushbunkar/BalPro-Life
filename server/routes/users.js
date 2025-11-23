import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/users.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;