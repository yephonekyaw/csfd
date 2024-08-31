import { Router } from 'express';
import { signin } from '../controllers/auth/signin.js';
import { signout } from '../controllers/auth/signout.js';

const authRouter = Router();

authRouter.post('/signin', signin);
authRouter.get('/signout', signout);

export { authRouter };
