import { Router, Request, Response } from 'express';
import checkToken from '../../middlewares/tokenValidation';
import MatchesController from '../controllers/MatchesController';
import MatchesValidation from '../../middlewares/matchesValidation';

const matchesRoutes = Router();
const matchesController = new MatchesController();
const matchesValidation = new MatchesValidation();

matchesRoutes.get('/', (req: Request, res: Response) => matchesController.getAll(req, res));
matchesRoutes.patch('/:id/finish', checkToken, matchesController.finishedMatch);
matchesRoutes.patch('/:id', checkToken, matchesController.updateMatch);

matchesRoutes.post(
  '/',
  checkToken,
  matchesValidation.verifyParams,
  matchesController.creatingMatch,
);

export default matchesRoutes;
