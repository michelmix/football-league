import UserService from '../services/UsersService';

export default class UserController {
  constructor(private userService = new UserService()) {}
}
