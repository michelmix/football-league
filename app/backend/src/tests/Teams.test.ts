import { expect } from "chai";
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from "sinon";
import ITeam from '../api/interfaces/ITeam'
import { app } from "../app";
import * as chai from 'chai';
// import Team from "../database/models/TeamModel";
// import { Model } from "sequelize";
chai.use(chaiHttp)

describe('Test Service Teams', () => {
  afterEach(function () {
    Sinon.restore()
  })
  // const app = new App()

  it('Retorna todos os times corretamente', async function () {
    const mock: ITeam[] = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      {
        "id": 4,
        "teamName": "Corinthians"
      },
      {
        "id": 5,
        "teamName": "Cruzeiro"
      },
      ]
    const allTeams = await chai.request(app).get('/teams').send(mock);
    expect(allTeams.status).to.be.equal(200);
  })
})
