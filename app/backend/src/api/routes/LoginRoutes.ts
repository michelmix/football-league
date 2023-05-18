import { Router } from 'express';
import LoginValidation from '../../middlewares/loginValidation';
// import tokenValidation from '../../middlewares/tokenValidation';
// import LoginController from '../controllers/LoginController';
import UsersController from '../controllers/UserController';

const router = Router();

const usersController = new UsersController();

const loginValidation = new LoginValidation();

router.post('/', loginValidation.checkCredentials, (req, res) => usersController.login(req, res));

// router.get('/role', tokenValidation, (req, res) => loginController.findRole(req, res));

export default router;