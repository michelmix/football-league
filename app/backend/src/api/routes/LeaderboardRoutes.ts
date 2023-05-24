import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoutes = Router();

const leaderboardController = new LeaderboardController();

leaderboardRoutes.get('/home', leaderboardController.getHomeTeams);

export default leaderboardRoutes;
