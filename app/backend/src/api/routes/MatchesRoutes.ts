import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRoutes = Router();

const matchesController = new MatchesController();

matchesRoutes.get('/', (req: Request, res: Response) => matchesController.getAll(req, res));

export default matchesRoutes;
