import express from 'express';
import { 
    authenticate, 
    isAdmin, 
} from '../../middleware/authMiddleware';
import { 
    getAllUsers,
    getUserById,
    getMyProfile,
    updateMyProfile,
    updateMyPassword,
    deleteMe,
    updateUser,
    updateUserRole,
    deleteUser,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', authenticate, isAdmin, getAllUsers);
userRouter.get('/get-user/:userId', authenticate, isAdmin, getUserById);
userRouter.get('/profile/get-my-profile', authenticate, getMyProfile);
userRouter.patch('/profile/update-my-profile', authenticate, updateMyProfile);
userRouter.patch('/profile/update-my-password', authenticate, updateMyPassword);
userRouter.delete('/profile/delete-me', authenticate, deleteMe);
userRouter.patch('/update-user/:userId', authenticate, isAdmin, updateUser);
userRouter.patch('/update-user-role/:userId', authenticate, isAdmin, updateUserRole);
userRouter.delete('/delete-user/:userId', authenticate, isAdmin, deleteUser);

export default userRouter;
