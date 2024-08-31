import { Router } from 'express';
import getMembers from '../controllers/house/getMembers.js';

const houseRouter = Router();

houseRouter.get('/:house', getMembers);

export default houseRouter;