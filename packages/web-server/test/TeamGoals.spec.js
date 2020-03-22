const router = require('../endpoints/TeamGoals');
const model = require('../models/TeamGoals');
jest.mock('fs');

describe('TeamGoals', () => {

  describe('Router', () => {
    const routesToValidate = [
      {
        method: 'get',
        url: '/team-goals'
      },
      {
        method: 'get',
        url: '/team-goals/:team'
      },
      {
        method: 'post',
        url: '/team-goals'
      },
      {
        method: 'put',
        url: '/team-goals/:team'
      },
      {
        method: 'delete',
        url: '/team-goals/:team'
      },
      {
        method: 'post',
        url: '/team-goals/batch'
      }
    ];

    routesToValidate.forEach(routeToValidate => {
      it(`should validate that '${routeToValidate.method}' '${routeToValidate.url}' route is enabled`, () => {
        expect(router.stack.find(layer => layer.route.path === routeToValidate.url && layer.route.methods[routeToValidate.method] === true));
      });
    })



  });

  describe('Model', () => {


    const mockTeamGoals = {
      equipo: 'rojo',
      metas: [
        {
          nivel: 'A',
          goles_minimos: 5
        },
        {
          nivel: 'B',
          goles_minimos: 10
        }
      ]
    };

    beforeEach(() => {
      // require('fs').__setMockFiles(MOCK_FILE_INFO);
    });

    it('should return model info', () => {
      const info = model(mockTeamGoals).getInfo();
      expect(info.equipo).toEqual('rojo');
      expect(info.metas.length).toEqual(2);
    });

    it('validation should return success', () => {
      expect(model(mockTeamGoals).validate().valid).toBeTruthy();
    });

    it('validation should fail if missing properties', () => {
      let invalidMock = null;
      
      invalidMock = {
        metas: mockTeamGoals.metas
      }
      expect(model(invalidMock).validate().valid).toBeFalsy();

      invalidMock = {
        equipo: mockTeamGoals.equipo,
      }
      expect(model(invalidMock).validate().valid).toBeFalsy();

      invalidMock = {
        equipo: mockTeamGoals.equipo,
        metas: [
          {
            goles_minimos: 6

          }
        ]
      }
      expect(model(invalidMock).validate().valid).toBeFalsy();

      invalidMock = {
        equipo: mockTeamGoals.equipo,
        metas: [
          {
            nivel: 'A'
          }
        ]
      }
      expect(model(invalidMock).validate().valid).toBeFalsy();
    });

    it('validation should fail if invalid data types', () => {
      let invalidMock = null;
      
      invalidMock = {
        equipo: 123,
        metas: mockTeamGoals.metas
      }
      expect(model(invalidMock).validate().valid).toBeFalsy();

      invalidMock = {
        equipo: '',
        metas: {}
      }
      expect(model(invalidMock).validate().valid).toBeFalsy();

      invalidMock = {
        equipo: '',
        metas: [
          {
            nivel: 123,
            goles_minimos: 123
          }
        ]
      }
      expect(model(invalidMock).validate().valid).toBeFalsy();

      invalidMock = {
        equipo: '',
        metas: [
          {
            nivel: 'abc',
            goles_minimos: '123'
          }
        ]
      }
      expect(model(invalidMock).validate().valid).toBeFalsy();
    });





  });

});