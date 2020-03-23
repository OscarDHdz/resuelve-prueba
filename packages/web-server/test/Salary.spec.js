const router = require('../endpoints/Salary');
const model = require('../models/Salary');

jest.mock('../models/TeamGoals');

const mockPlayers = [  
  {  
     nombre: "Juan",
     nivel: "A",
     goles: 6,
     sueldo:  50000,
     bono:  25000,
     sueldo_completo: null,
     equipo: "rojo"
  },
  {  
     nombre: "Pedro",
     nivel: "B",
     goles: 7,
     sueldo:  50000,
     bono:  25000,
     sueldo_completo: null,
     equipo: "rojo"
  },
  {  
     nombre: "Martin",
     nivel: "C",
     goles: 16,
     sueldo:  50000,
     bono:  25000,
     sueldo_completo: null,
     equipo: "rojo"
  },
  {  
     nombre: "Luis",
     nivel: "Cuauh",
     goles: 19,
     sueldo:  50000,
     bono:  10000,
     sueldo_completo: null,
     equipo: "rojo"
  }
]

describe('Salary', () => {
  describe('Router', () => {
    const routesToValidate = [
      {
        method: 'post',
        url: '/salary'
      }
    ];

    routesToValidate.forEach(routeToValidate => {
      it(`should validate that '${routeToValidate.method}' '${routeToValidate.url}' route is enabled`, () => {
        expect(router.stack.find(layer => layer.route.path === routeToValidate.url && layer.route.methods[routeToValidate.method] === true));
      });
    })
  });

  describe('Model', () => {
    it('should return info', () => {
      const data = model(mockPlayers).getInfo();
      expect(data.nombresEquipos).toContain('rojo');
      expect(data.equipos['rojo'].length).toEqual(4);
    });

    it('validation should resolve', () => {
      expect(model(mockPlayers).validate().valid).toBeTruthy();
    });

    it('validation should fail if missing properties', () => {
      let invalidMockPlayers = null;
      // Missin equipo
      invalidMockPlayers = [
        {nombre: '', nivel: '', goles: 1, sueldo: 100, bono: 80}
      ];
      expect(model(invalidMockPlayers).validate().valid).toBeFalsy();
      // Missing bono
      invalidMockPlayers = [
        {nombre: '', nivel: '', goles: 1, sueldo: 100, equipo: 'rojo'}
      ];
      expect(model(invalidMockPlayers).validate().valid).toBeFalsy();
      // Missing sueldo
      invalidMockPlayers = [
        {nombre: '', nivel: '', goles: 1, bono: 80, equipo: 'rojo'}
      ];
      expect(model(invalidMockPlayers).validate().valid).toBeFalsy();
      // Mising goles
      invalidMockPlayers = [
        {nombre: '', nivel: '', sueldo: 100, bono: 80, equipo: 'rojo'}
      ];
      expect(model(invalidMockPlayers).validate().valid).toBeFalsy();
      // Missing nivel
      invalidMockPlayers = [
        {nombre: '', goles: 1, sueldo: 100, bono: 80, equipo: 'rojo'}
      ];
      expect(model(invalidMockPlayers).validate().valid).toBeFalsy();
      // Missing nombre
      invalidMockPlayers = [
        {nivel: '', goles: 1, sueldo: 100, bono: 80, equipo: 'rojo'}
      ];
      expect(model(invalidMockPlayers).validate().valid).toBeFalsy();
    });

    it('validation should fail if invalid data types', () => {
      // Invalid model input
      expect(model({}).validate().valid).toBeFalsy();
      // Missing equipo
      invalidMockPlayers = [
        {nombre: '', nivel: '', goles: 1, sueldo: 100, bono: 80, equipo: null}
      ];
      expect(model(invalidMockPlayers).validate().valid).toBeFalsy();
      // bono
      invalidMockPlayers = [
        {nombre: '', nivel: '', goles: 1, sueldo: 100, bono: null, equipo: ''}
      ];
      expect(model(invalidMockPlayers).validate().valid).toBeFalsy();
      // sueldo
      invalidMockPlayers = [
        {nombre: '', nivel: '', goles: 1, sueldo: null, bono: 80, equipo: ''}
      ];
      expect(model(invalidMockPlayers).validate().valid).toBeFalsy();
      // goles
      invalidMockPlayers = [
        {nombre: '', nivel: '', goles: '', sueldo: 100, bono: 80, equipo: ''}
      ];
      expect(model(invalidMockPlayers).validate().valid).toBeFalsy();
      // nivel
      invalidMockPlayers = [
        {nombre: '', nivel: null, goles: 1, sueldo: 100, bono: 80, equipo: ''}
      ];
      expect(model(invalidMockPlayers).validate().valid).toBeFalsy();
      // nombre
      invalidMockPlayers = [
        {nombre: null, nivel: '', goles: 1, sueldo: 100, bono: 80, equipo: ''}
      ];
      expect(model(invalidMockPlayers).validate().valid).toBeFalsy();

    });

    it('should calculate players salaries', async() => {
      require('../models/TeamGoals').getByTeam.mockReturnValue(
        {
          equipo: "rojo",
          metas: [
            { nivel: "A",goles_minimos: 5 },
            { nivel: "B", goles_minimos: 10 },
            { nivel: "C", goles_minimos: 15 },
            { nivel: "Cuauh", goles_minimos: 20 }
          ]
        }
      );

      const data = await model(mockPlayers).calculateSalaries();
      const playerFullSalary = data.find(player => player.nombre === 'Luis');
      expect(playerFullSalary.sueldo_completo).toEqual(59550);
    });

    it('salaries calculation should fail if goal for level is missing', async () => {
      require('../models/TeamGoals').getByTeam.mockReturnValue(
        {
          equipo: "rojo",
          metas: [
            // Removed level 'A'
            { nivel: "B", goles_minimos: 10 },
            { nivel: "C", goles_minimos: 15 },
            { nivel: "Cuauh", goles_minimos: 20 }
          ]
        }
      );

      try {
        await model(mockPlayers).calculateSalaries();
      } catch (err) {
        expect(err.code).toEqual(404);
      }
    });

    it('salaries calculation should fail if player team goals are missing', async () => {
      require('../models/TeamGoals').getByTeam.mockReturnValue(
        {
          equipo: "azul", // Other team
          metas: [
            { nivel: "A", goles_minimos: 5 },
            { nivel: "B", goles_minimos: 10 },
            { nivel: "C", goles_minimos: 15 },
            { nivel: "Cuauh", goles_minimos: 20 }
          ]
        }
      );

      try {
        await model(mockPlayers).calculateSalaries();
      } catch (err) {
        expect(err.code).toEqual(404);
      }
    });

  });

});