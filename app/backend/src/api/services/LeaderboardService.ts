import { ModelStatic } from 'sequelize';
import MatchesModel from '../../database/models/MatchesModel';
import TeamsModel from '../../database/models/TeamsModel';
import { ILeaderboardPerformance } from '../interfaces/ILeaderboardPerformance';
import ITeam from '../interfaces/ITeam';
import IMatch from '../interfaces/IMatch';
import { homeTeamInfo, homeTeamPerformance } from '../../middlewares/calculateLeaderboardHome';

class LeaderboardService {
  protected teamsModel: ModelStatic<TeamsModel> = TeamsModel;
  protected matchesModel: ModelStatic<MatchesModel> = MatchesModel;

  private async getTeams() {
    const result = await this.teamsModel.findAll();
    const teams = result.map((data) => data.dataValues);
    return teams;
  }

  private async getAllMatches() {
    const result = await this.matchesModel.findAll({
      where: { inProgress: false },
    });
    const matches = result.map((data) => data.dataValues);
    return matches;
  }

  private static teamHomePerformanceCalculator(team: ITeam, matches: IMatch[]):
  ILeaderboardPerformance {
    const homeTeam = matches.filter((match) => match.homeTeamId === team.id);

    const teamInfoHome = homeTeamInfo(team.teamName, homeTeam);
    const teamPerformance = homeTeamPerformance(teamInfoHome);

    return teamPerformance;
  }

  public static sortLeaderboard(leaderboard: ILeaderboardPerformance[]) {
    const resultOrder = leaderboard.sort((b, a) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            return a.goalsFavor - b.goalsFavor;
          }
          return a.goalsBalance - b.goalsBalance;
        }
        return a.totalVictories - b.totalVictories;
      }
      return a.totalPoints - b.totalPoints;
    });
    return resultOrder;
  }

  public async getHomeLeaderboard(): Promise <ILeaderboardPerformance[]> {
    const matches = await this.getAllMatches();
    const teams = await this.getTeams();
    const leaderboard: ILeaderboardPerformance[] = [];
    teams.forEach((team) => {
      const data = LeaderboardService.teamHomePerformanceCalculator(team, matches);
      leaderboard.push(data);
    });
    const leaderboardOrdered = LeaderboardService.sortLeaderboard(leaderboard);

    return leaderboardOrdered;
  }
}

export default LeaderboardService;
