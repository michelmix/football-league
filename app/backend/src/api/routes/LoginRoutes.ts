import { Router } from 'express';
import LoginValidation from '../../middlewares/loginValidation';
// import tokenValidation from '../../middlewares/tokenValidation';
import LoginController from '../controllers/LoginController';

const router = Router();

const loginController = new LoginController();

const loginValidation = new LoginValidation();

router.post('/', loginValidation.checkCredentials, (req, res) => loginController.login(req, res));

// router.get('/role', tokenValidation, (req, res) => loginController.findRole(req, res));

export default router;
