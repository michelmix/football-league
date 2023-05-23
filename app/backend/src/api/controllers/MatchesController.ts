import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const matches = await this.matchesService.getAll();
      return res.status(200).json(matches);
    }
    const matches = await this.matchesService.getMatchesInProgress(inProgress === 'true');
    return res.status(200).json(matches);
  };

  public finishedMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.finishedMatch(+id);
    res.status(200).json({ message: 'Finished' });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateMatch(+id, homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'Match updated!' });
  };

  public creatingMatch = async (req: Request, res: Response) => {
    const matchCreated = await this.matchesService.creatingMatch(req.body);
    res.status(201).json(matchCreated);
  };
}
