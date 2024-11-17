import {Router} from 'express';
import {index, show, store, update, destroy} from './user.controller';
import { authenticateToken } from '../../middleware/jwt';

const userRouter = Router();

userRouter.get('/', index);
userRouter.get('/:id', show);
userRouter.post('/', store);
userRouter.put('/:id', update);
userRouter.delete('/:id', destroy);


export default userRouter;
