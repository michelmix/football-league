import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/TeamsModel';

import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  protected model: ModelStatic<Teams> = Teams;

  async getAll(): Promise<ITeam[]> {
    const allTeams = await this.model.findAll();
    // if (!allTeams) throw new Error('Falha ao buscar todos os times');
    return allTeams;
  }

  async getById(id: string): Promise<ITeam | null> {
    const team = await this.model.findOne({
      where: { id },
    });
    return team;
  }
}
