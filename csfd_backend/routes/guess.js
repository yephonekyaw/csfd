import { Router } from 'express';
import { getAllGuessInfo } from '../controllers/guess/getAllGuessInfo.js';
import { verifyGuessCode } from '../controllers/guess/verifyGuessCode.js';
import { getSeniorData } from '../controllers/guess/getSeniorData.js';

const guessRouter = Router();

guessRouter.get('/', getAllGuessInfo);
guessRouter.put('/', verifyGuessCode);
guessRouter.get('/senior', getSeniorData);

export { guessRouter };
