import {Router} from 'express';
import {register, login, profile, refreshToken, check} from './auth.controller';
import { authenticateToken } from '../../middleware/jwt';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/profile', profile);
authRouter.get('/refresh-token', refreshToken);
authRouter.get('/check', authenticateToken, check)

export default authRouter;
