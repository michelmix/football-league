import ITeam from './ITeam';

export default interface IServiceTeam {
  getAll(): Promise<ITeam[]>
  getById(id: number): Promise<ITeam>
}
