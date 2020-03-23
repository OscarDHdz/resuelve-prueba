const router = require('../endpoints/TeamGoals');
const model = require('../models/TeamGoals');
jest.mock('fs');

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

    let fsRef = null;

    beforeEach(() => {
      fsRef = require('fs');
      fsRef.readFileSync.mockReturnValue(JSON.stringify([mockTeamGoals]));
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

    it('should get all records', async () => {
      const allRecords = await model.getAll();
      // Make sure it is returning the mocked data (beforeEach)
      expect(allRecords.length).toEqual(1);
      expect(allRecords[0].equipo).toEqual(mockTeamGoals.equipo);
    });

    it('should get team goals from the given team', async () => {
      const data = await model.getByTeam(mockTeamGoals.equipo);

      // Make sure it is returning the mocked data (beforeEach)
      expect(data.equipo).toEqual(mockTeamGoals.equipo);
      expect(data.metas[0].nivel).toEqual(mockTeamGoals.metas[0].nivel);
    });

    it('should fail getting team goals if team does not exist', async () => {
      try {
        await model.getByTeam('TestTeam');
      } catch (err) {
        expect(err.code).toEqual(404);
      }
    });

    it('should save new data', async () => {
      await model.save({...mockTeamGoals, equipo: 'azul'});
      expect(fsRef.writeFile).toHaveBeenCalled();
    });

    it('save should fail if data already exists', async () => {
      try {
        await model.save(mockTeamGoals);
      } catch (err) {
        expect(err.code).toEqual(409);
      }
    });

    it('delete should resolve', async () => {
      await model.delete(mockTeamGoals.equipo);
      expect(fsRef.writeFile).toHaveBeenCalled();
    });

    it('delete should fail it the given team does not exist', async () => {
      try {
        await model.delete('azul')
      } catch (err) {
        expect(err.code).toEqual(404);
      }
    });

    it('update should resolve', async () => {
      const data = await model.update(mockTeamGoals.equipo, [{nivel: 'TEST', goles_minimos: 100}]);
      expect(data.metas[0].nivel).toEqual('TEST');
      expect(data.metas[0].goles_minimos).toEqual(100);
      expect(fsRef.writeFile).toHaveBeenCalled();
    });

    it('update should fail if the given team does not exist', async () => {
      try {
        await model.update('azul', [{nivel: 'TEST', goles_minimos: 100}])
      } catch (err) {
        expect(err.code).toEqual(404);
      }
    });

    it('saveBatch should resolve', async () => {
      model.save = jest.fn();
      await model.saveBatch([{...mockTeamGoals, equipo: 'azul'}])
      expect(model.save).toHaveBeenCalledTimes(1);
    });

    it('saveBatch should resolve but give a failing input message', async () => {
      model.save = jest.fn().mockImplementation(() => { throw new Error() });
      const data = await model.saveBatch([mockTeamGoals])
      expect(model.save).toHaveBeenCalledTimes(1);
      expect(data.failedToAdd).toBeDefined();
    });

  });

});