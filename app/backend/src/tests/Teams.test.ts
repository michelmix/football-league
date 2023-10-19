import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel, { TeamAtributes } from '../database/models/TeamsModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Router', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('GET /teams', () => {
    let chaiHttpResponse: Response;
    it('Deve retornar 200 e os times', async () => {
      sinon.stub(TeamModel, 'findAll').resolves([
        {
          id: 1,
          teamName: "Avaí/Kindermann"
        },
      ] as TeamModel[])

      chaiHttpResponse = await chai.request(app)
          .get('/teams');

        // assert => espero um resultado
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal([
          {
            id: 1,
            teamName: "Avaí/Kindermann"
          },
        ]);
    });
  });
    describe('GET /teams:id', () => {
      let chaiHttpResponse: Response;
      it('Deve retornar 404 e uma mensagem de error', async () => {
        sinon.stub(TeamModel, 'findOne').resolves(undefined)

        chaiHttpResponse = await chai.request(app)
            .get('/teams/99');

          // assert => espero um resultado
          expect(chaiHttpResponse.status).to.be.equal(404);
          expect(chaiHttpResponse.body).to.be.deep.equal(
            {
              message: "Team not found!"
            },
          );
      });

      it('Deve retornar 200 e o time', async () => {
        sinon.stub(TeamModel, 'findOne').resolves(
          {
            id: 1,
            teamName: "Avaí/Kindermann"
          } as TeamModel)

        chaiHttpResponse = await chai.request(app)
            .get('/teams/1');

          // assert => espero um resultado
          expect(chaiHttpResponse.status).to.be.equal(200);
          expect(chaiHttpResponse.body).to.be.deep.equal(
            {
              id: 1,
              teamName: "Avaí/Kindermann"
            },
          );
      });
  })
});