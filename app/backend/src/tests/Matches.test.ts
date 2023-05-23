import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchesModel from '../database/models/MatchesModel';

import { app } from '../app';
import { mockAllMatches, mockAllMatchesInProgress, mockOneMatch, mockAllMatchesNotInProgress } from './mocks/matches.mock';
// import Authorization from '../utils/Authorization';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota /matches', () => {
  let modelMatchStub: sinon.SinonStub;

  afterEach(() => {
    sinon.restore();
  });

  describe('Testes do método GET', () => {
    it('Retorna todas as partidas', async () => {
      modelMatchStub = sinon.stub(MatchesModel, 'findAll')
        .resolves(mockAllMatches as unknown as MatchesModel[]);

      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllMatches);
    });
  });
  describe('Testes do método GET com query', async () => {
    it('Retorna todas as partidas que estão em progresso', async () => {
      modelMatchStub = sinon.stub(MatchesModel, 'findAll')
        .resolves(mockAllMatchesInProgress as unknown as MatchesModel[]);

      const response = await chai.request(app).get('/matches?inProgress=true');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllMatchesInProgress);
    });
  });
  describe('Testes do método GET com query', async () => {
    it('Retorna todas as partidas que não estão em progresso', async () => {
      modelMatchStub = sinon.stub(MatchesModel, 'findAll')
        .resolves(mockAllMatchesNotInProgress as unknown as MatchesModel[]);

      const response = await chai.request(app).get('/matches?inProgress=false');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockAllMatchesNotInProgress);
    });
  });
});
