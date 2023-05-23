import { ModelStatic } from 'sequelize';
import TeamsModel from '../../database/models/TeamsModel';
import MatchesModel from '../../database/models/MatchesModel';
// import IMatches from '../interfaces/IMatch';

export default class MatchesService {
  private _matchesModel: ModelStatic<MatchesModel> = MatchesModel;

  public async getAll(): Promise<MatchesModel[]> {
    const matches = await this._matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  public async getMatchesInProgress(inProgress: boolean | undefined): Promise<MatchesModel[]> {
    const matches = await this._matchesModel.findAll({
      where: { inProgress },
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  public async finishedMatch(id: number) {
    await this._matchesModel.update(
      { inProgress: 'false' },
      { where: { id } },
    );
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this._matchesModel.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );
  }

  //   public async createMatch(match : Omit<IMatches, 'id' | 'inProgress'>) {
  //     const matchCreated = await this._matchesModel.create({
  //       ...match,
  //       inProgress: true,
  //     });
  //     return matchCreated;
  //   }
  // }
}
