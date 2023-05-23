import { Router, Request, Response } from 'express';
import checkToken from '../../middlewares/tokenValidation';
import MatchesController from '../controllers/MatchesController';

const matchesRoutes = Router();
const matchesController = new MatchesController();

matchesRoutes.get('/', (req: Request, res: Response) => matchesController.getAll(req, res));
matchesRoutes.patch('/:id/finish', checkToken, matchesController.finishedMatch);
matchesRoutes.patch('/:id', checkToken, matchesController.updateMatch);

export default matchesRoutes;
