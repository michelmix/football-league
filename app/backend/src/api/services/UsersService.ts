import { ModelStatic } from 'sequelize';
import UsersModel from '../../database/models/UsersModel';
import ILogin from '../interfaces/ILogin';

class UsersService {
  private _usersModel: ModelStatic<UsersModel> = UsersModel;

  public async login(user: ILogin) {
    const { email } = user;
    const result = await this._usersModel.findOne({
      where: { email },
    });
    return result;
  }
}

export default UsersService;
