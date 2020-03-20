const router = require('../endpoints/Salary');

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

});