import { Request, Response } from 'express';
import ILogin from '../interfaces/ILogin';
import LoginService from '../services/LoginService';
import UsersService from '../services/UsersService';
import IRequestWithUser from '../interfaces/IRequestWithUser';

export default class TeamController {
  constructor(
    private _loginService = new LoginService(),
    private _userService = new UsersService(),
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body as ILogin;

    const token = await this._loginService.login({ email, password });

    return res.json({ token });
  }

  async findRole(req: IRequestWithUser, res: Response) {
    const { id } = req.user || { id: 0 };

    const { role } = await this._userService.findById({ id });

    return res.json({ role });
  }
}
