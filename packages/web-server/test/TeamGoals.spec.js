const router = require('../endpoints/TeamGoals');

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

});