import ILeaderboard from '../api/interfaces/ILeaderboard';
import IMatch from '../api/interfaces/IMatch';

const goalsFavorCalculator = (matches: IMatch[]) => {
  const goalsFavor = matches.reduce((goals, match) => goals + match.homeTeamGoals, 0);
  return goalsFavor;
};

const goalsOwnCalculator = (matches: IMatch[]) => {
  const goalsOwn = matches.reduce((goals, match) => goals + match.awayTeamGoals, 0);
  return goalsOwn;
};

const victoriesCalculator = (matches: IMatch[]) => {
  const victories = matches.reduce((victory, match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return victory + 1;
    }
    return victory;
  }, 0);
  return victories;
};

const calculatorLosses = (matches: IMatch[]) => {
  const losses = matches.reduce((loss, match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      return loss + 1;
    }
    return loss;
  }, 0);
  return losses;
};

const calculatorDraws = (matches: IMatch[]) => {
  const draws = matches.reduce((draw, match) => {
    if (match.awayTeamGoals === match.homeTeamGoals) {
      return draw + 1;
    }
    return draw;
  }, 0);
  return draws;
};

const pointsCalculator = (draws: number, victories: number) => {
  const points = victories * 3 + draws;
  return points;
};

const goalsBalanceCalculator = (goalsFavor: number, goalsOwn: number) => {
  const balance = goalsFavor - goalsOwn;
  return balance;
};

const efficiencyCalculator = (points: number, matches: number) => {
  const efficiency = Number(((points / (matches * 3)) * 100).toFixed(2));
  return efficiency;
};

export const homeTeamInfo = (teamName:string, matches: IMatch[]) => {
  const totalGames = matches.length;
  const totalVictories = victoriesCalculator(matches);
  const totalDraws = calculatorDraws(matches);
  const totalLosses = calculatorLosses(matches);
  const goalsFavor = goalsFavorCalculator(matches);
  const goalsOwn = goalsOwnCalculator(matches);
  const totalPoints = pointsCalculator(totalDraws, totalVictories);

  return {
    name: teamName,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
  };
};

export const homeTeamPerformance = (leadboard: ILeaderboard) => {
  const goalsBalance = goalsBalanceCalculator(leadboard.goalsFavor, leadboard.goalsOwn);
  const efficiency = efficiencyCalculator(leadboard.totalPoints, leadboard.totalGames);
  const leadboardPerformance = { ...leadboard, goalsBalance, efficiency };
  return leadboardPerformance;
};
