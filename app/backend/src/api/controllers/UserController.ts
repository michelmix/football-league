import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/Authorization';
import UsersService from '../services/UsersService';

class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const user = await this.usersService.login({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const matchPassword = bcrypt.compareSync(password, user?.password || '');

    if (!matchPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    return res.status(200).json({ token });
  };

  public loginRole = async (req: Request, res: Response): Promise<Response> => {
    const { role } = req.body.userToken.user;

    return res.status(200).json({ role });
  };
}

export default UsersController;
