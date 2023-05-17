import { Router } from 'express';
import loginValidation from '../middlewares/loginValidation';
import validateToken from '../middlewares/validateToken';
import LoginController from '../controllers/LoginController';

const router = Router();
const loginController = new LoginController();

router.post('/', (req, res) => loginController.login(req, res));

router.get('/role', validateToken, (req, res) => loginController.findRole(req, res));

export default router;
