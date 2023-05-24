import { Router } from 'express';
import teamRouter from './TeamsRoutes';
import matchesRouter from './MatchesRoutes';
import loginRouter from './LoginRoutes';
import leaderboardRouter from './LeaderboardRoutes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
