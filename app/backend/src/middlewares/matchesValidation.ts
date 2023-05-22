// import { NextFunction, Request, Response } from 'express';
// import TeamsService from '../api/services/TeamsService';

// export default class MatchesValidation {
//   private teamsService: TeamsService;

//   constructor() {
//     this.teamsService = new TeamsService();
//   }

//   public checkParams = async (req: Request, res: Response, next: NextFunction) => {
//     const { homeTeamId, awayTeamId } = req.body;
//     if (homeTeamId === awayTeamId) {
//       return res.status(422).json({
//         message: 'It is not possible to create a match with two equal teams' });
//     }
//     const homeTeam = await this.teamsService.getTeamById(homeTeamId);
//     const awayTeam = await this.teamsService.getTeamById(awayTeamId);

//     if (!homeTeam || !awayTeam) {
//       return res.status(404).json({ message: 'There is no team with such id!' });
//     }
//     next();
//   };
// }
