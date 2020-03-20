const v = require('../utils/Validators');

describe('Validators', () => {

  it('should validate if value is defined', () =>{
    expect(v.isDefined({test: 'Hello'})).toBeTruthy();
  });

  it('should fail if value is NOT defined', () =>{
    expect(v.isDefined(undefined)).toBeFalsy();
  });

  it('should get Is Not Defined Error obj', () => {
    const errorObj = v.getIsNotDefinedError();
    expect(errorObj.message).toContain('is not defined');
  });



});