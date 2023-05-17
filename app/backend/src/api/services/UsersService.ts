// import IEmail from '../interfaces/IEmail';
import { StatusCodes } from 'http-status-codes';
import User from '../../database/models/UsersModel';
import UserModel from '../../models/UserModel';
import IId from '../interfaces/IId';
import ApiError from '../../utils/Error';

export default class UsersService {
  constructor(private _userModel = new UserModel()) {}

  async findById({ id }: IId) {
    const user = await this._userModel.findById(id) as User;

    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');

    return user;
  }
}
