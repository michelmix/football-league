import { expect } from "chai";
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from "sinon";
import ITeam from '../api/interfaces/ITeam'
import { app } from "../app";
import * as chai from 'chai';
import Team from "../database/models/TeamsModel";
// import { Model } from "sequelize";
chai.use(chaiHttp)

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

describe('Test Service Teams', () => {
  beforeEach(() => {
    sinon
      .stub(Team, "findAll")
      .resolves(mock as unknown as Team[]);
  });
  afterEach(function () {
    Sinon.restore()
  })
  // const app = new App()

  it('Retorna todos os times corretamente', async function () {

    const allTeams = await chai.request(app).get('/teams').send(mock);
    expect(allTeams.status).to.be.equal(200);
  })

  it('Responde com status 200 e um array de times', async () => {
    const { body, status } = await chai
      .request(app).get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.an('array');
    expect(body).to.be.deep.equal(mock);
  });
});

describe('Testa a rota GET /teams/:id', async () => {
  it('Se responde com status 200 e um time', async () => {
      sinon
        .stub(Team, "findByPk")
        .resolves(mock[1] as unknown as Team);

    const { body, status } = await chai
      .request(app).get('/teams/2');

    expect(status).to.be.equal(200);
    expect(body).to.be.an('object');
    expect(body).to.be.deep.equal(mock[1]);
  });

  // it('Ao passar um id inválido response com status 404 e Team not found', async () => {
  //   sinon
  //     .stub(Team, "findByPk")
  //     .resolves(null);

  //   const { body, status } = await chai
  //     .request(app).get('/teams/3');

  //   expect(status).to.be.equal(404);
  //   expect(body).to.be.an('object');
  //   expect(body).to.be.deep.equal({ message: 'Team not found' });
  // })
  // afterEach(sinon.restore)
});


