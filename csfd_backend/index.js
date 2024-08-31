import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from './middleware/logger.js';
import { corsConfig } from './config/corsConfig.js';
import { verifyAccessToken } from './middleware/jwtHandler.js';
import { authRouter } from './routes/auth.js';
import { profileRouter } from './routes/profile.js';
import { feedRouter } from './routes/feed.js';
import { hintsRouter } from './routes/hints.js';
import { guessRouter } from './routes/guess.js';
import houseRouter from './routes/house.js';

// initialization
const app = express();
const port = process.env.PORT || 3000;

// logger middleware
app.use(logger);

// cookie parser middleware
app.use(cookieParser());

// cors middleware
app.use(cors(corsConfig));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// json middleware
app.use(express.json());

// routing
app.use('/api/auth', authRouter);

app.use(verifyAccessToken);
app.get('/api/authorize', (req, res) => {
  return res.status(200).json({
    condition: 'success',
    data: req.role,
    message: 'Authorized',
  });
});
app.use('/api/profile', profileRouter);
app.use('/api/feed', feedRouter);
app.use('/api/hints', hintsRouter);
app.use('/api/guess', guessRouter);
app.use('/api/house', houseRouter);

app.listen(port, () =>
  console.log(`Application started on port ${process.env.HOSTNAME}:${port}`)
);
