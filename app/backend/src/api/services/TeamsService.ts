import { ModelStatic } from 'sequelize';

import Teams from '../../database/models/TeamsModel';
import IServiceTeam from '../interfaces/IServiceTeam';
import ITeam from '../interfaces/ITeam';

export default class TeamsService implements IServiceTeam {
  protected model: ModelStatic<Teams> = Teams;

  async getAll(): Promise<ITeam[]> {
    const allTeams = await this.model.findAll();
    if (!allTeams) throw new Error('Falha ao buscar todos os times');
    return allTeams;
  }

  async getById(id: number): Promise<ITeam> {
    const team = await this.model.findByPk(id);
    if (!team) throw new Error('Falha ao buscar time by id');
    return team;
  }
}
