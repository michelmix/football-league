import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/TeamsController';
// import TeamsService from '../services/TeamsService';

const teamsRoutes = Router();

const teamsController = new TeamsController();

teamsRoutes.get('/', (req: Request, res: Response) => teamsController.getAll(req, res));
teamsRoutes.get('/:id', (req: Request, res: Response) => teamsController.getById(req, res));

export default teamsRoutes;
