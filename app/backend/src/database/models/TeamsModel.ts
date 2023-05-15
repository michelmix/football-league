import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

export default class Teams extends Model {
  declare readonly id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING(255),
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'teams',
});
