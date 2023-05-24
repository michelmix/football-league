import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public getHomeTeams = async (_req: Request, res: Response) => {
    const leadboard = await this.leaderboardService.getHomeLeaderboard();
    res.status(200).json(leadboard);
  };
}

export default LeaderboardController;
