import { Router } from 'express';
import { getMembersIds } from '../controllers/feed/getMembersIds.js';
import { getMemberDataById } from '../controllers/feed/getMemberDataById.js';

const feedRouter = Router();

feedRouter.get('/:house/:batch', getMembersIds);
feedRouter.get('/:id', getMemberDataById);

export { feedRouter };
