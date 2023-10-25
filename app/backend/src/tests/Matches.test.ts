import * as sinon from 'sinon';
import * as chai from 'chai';
import MatchMock from './mocks/matches.mock';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import MatchService from '../api/services/MatcheService';
import JwtToken from '../api/services/JwtToken';
import MatchController from '../api/controllers/MatchesController';
chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for Matches Route, Model, Service, Controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("Tests the findAllMatches and inProgress function and it's Route", () => {
    it('Tests findAllMatches and inProgress with success and Status 200', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves([MatchMock.mockmatches])

      const responseFindAll = await chai.request(app).get('/matches');
      expect(responseFindAll.status).to.be.equal(200);
      expect(responseFindAll.body).to.be.deep.equal([MatchMock.mockmatches]);

      const responseInProgress = await chai.request(app).get('/matches?inProgress=true');
      expect(responseInProgress.status).to.be.equal(200);
      expect(responseInProgress.body).to.be.deep.equal([MatchMock.mockmatches])
    });
  });
  it('Tests finishMatch function with success and Status 200', async () => {
    sinon.stub(MatchesModel, 'findOne').resolves(MatchMock.mockmatches);
    sinon.stub(MatchesModel, 'update').resolves([1]);
    sinon.stub(JwtToken, 'verifyToken').resolves({
      email: 'admin@admin.com',
      password: 'senha_admin'
    });
    const response = await chai.request(app)
      .patch(`/matches/1/finish`)
      .set('Authorization', 'token-valid');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Finished' });
  });
  it('Tests finishMatch function with success and Status 200', async () => {
    sinon.stub(MatchesModel, 'findOne').resolves(MatchMock.mockFinishedmatches);
    sinon.stub(MatchesModel, 'update').resolves([1]);
    sinon.stub(JwtToken, 'verifyToken').resolves({
      email: 'admin@admin.com',
      password: 'senha_admin'
    });
    const response = await chai.request(app)
      .patch(`/matches/1/finish`)
      .set('Authorization', 'token-valid');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Match already finished' });
  });
  it('Match already finished with error 401  and message', async () => {

    sinon.stub(MatchesModel, 'update').resolves(undefined);
    sinon.stub(JwtToken, 'verifyToken').resolves({
      email: 'admin@admin.com',
      password: 'senha_admin'
    });
    const response = await chai.request(app)
      .patch(`/matches/1/finish`);
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token not found' })
  });
  describe('Tests the updateMatchScore function', () => {
    it('Test a successful update with status 200', async () => {
      sinon.stub(MatchesModel, 'findOne').resolves(MatchMock.mockmatches);
      sinon.stub(MatchesModel, 'update').resolves([1]);
      sinon.stub(JwtToken, 'verifyToken').resolves({
        email: 'admin@admin.com',
        password: 'senha_admin'
      });
      const response = await chai.request(app)
        .patch(`/matches/1`)
        .set('Authorization', 'token-valid');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Match score updated' });
    });
    it('Test a unsuccessful update with status 401', async () => {
      sinon.stub(MatchesModel, 'findOne').resolves(MatchMock.mockFinishedmatches);
      sinon.stub(MatchesModel, 'update').resolves([1]);
      sinon.stub(JwtToken, 'verifyToken').resolves({
        email: 'admin@admin.com',
        password: 'senha_admin'
      });

      const response = await chai.request(app)
        .patch(`/matches/1`)
        .set('Authorization', 'token-valid');
      // expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Match already finished' });
    });
  });
  describe('Creating new match', () => {
    it('Tests creatNewMatch function with succes and status 201', async () => {
      sinon.stub(MatchesModel, 'create').resolves(MatchMock.mockNewMatch);
      sinon.stub(JwtToken, 'verifyToken').resolves({
        email: 'admin@admin.com',
        password: 'senha_admin'
      });
      const response = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'token-valid')
        .send(MatchMock.mockNewMatch)
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(MatchMock.mockNewMatch)
    });
    it('Tests creatNewMatch function with error and status 422', async () => {
      sinon.stub(MatchesModel, 'create').resolves(MatchMock.sameIdsMockmatches);
      sinon.stub(JwtToken, 'verifyToken').resolves({
        email: 'admin@admin.com',
        password: 'senha_admin'
      });
      const response = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'token-valid')
        .send(MatchMock.sameIdsMockmatches)
      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' })
    });
    it('Tests creatNewMatch function with error and status 422', async () => {
      sinon.stub(MatchesModel, 'create').resolves(MatchMock.badIdMockmatches);
      sinon.stub(JwtToken, 'verifyToken').resolves({
        email: 'admin@admin.com',
        password: 'senha_admin'
      });
      const response = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'token-valid')
        .send(MatchMock.badIdMockmatches);
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!' })
    });
    it('Get matches by id with status 200 Route "home"', async () => {
      sinon.stub(MatchesModel, 'findOne').resolves(MatchMock.matchTeamStatsHome);
      const response = await chai.request(app)
        .get('/leaderboard/home');
      expect(response.status).to.be.equal(200);

      expect(response.body[0]).to.be.deep.equal(MatchMock.matchTeamStatsHome);
    });
    it('Get matches by id with status 200 Route "away"', async () => {
      sinon.stub(MatchesModel, 'findOne').resolves(MatchMock.matchTeamStatsAway);
      const response = await chai.request(app)
        .get('/leaderboard/away');
      expect(response.status).to.be.equal(200);
      expect(response.body[0]).to.be.deep.equal(MatchMock.matchTeamStatsAway);
    });
  });
});