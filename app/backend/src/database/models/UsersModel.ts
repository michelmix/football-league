import { Model, DataTypes } from 'sequelize';
import db from '.';

class User extends Model {
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'users',
  timestamps: false,
});

export default User;
