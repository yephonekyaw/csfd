import { Router } from 'express';
import { getJuniorIds } from '../controllers/hints/getJuniorIds.js';
import { getHintDataByJuniorId } from '../controllers/hints/getHintDataByJuniorId.js';
import { updateHintData } from '../controllers/hints/updateHintData.js';

const hintsRouter = Router();

hintsRouter.get('/', getJuniorIds);
hintsRouter.get('/:junior_id', getHintDataByJuniorId);
hintsRouter.put('/', updateHintData);

export { hintsRouter };
