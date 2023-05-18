import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
// import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamsController {
  private teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamsService.getAll();
    res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamsService.getById(+id);
    res.status(200).json(team);
  };
}

// export default class TeamsController {
//   private teamsService: TeamsService;

//   constructor() {
//     this.teamsService = new TeamsService();
//   }

//   async getAll(_req: Request, res: Response) {
//     const result = await this.teamsService.getAll();
//     return res.status(200).json(result);
//   }

//   async getById(req: Request, res: Response) {
//     const { id } = req.params;
//     const team = await this.teamsService.getById(+id);
//     return res.status(200).json(team);
//   }
// }
