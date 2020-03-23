const v = require('../../utils/Validators');

describe('Validators', () => {

  it('should validate if value is defined', () =>{
    expect(v.isDefined({test: 'Hello'})).toBeTruthy();
  });

  it('should fail if value is NOT defined', () =>{
    expect(v.isDefined(undefined)).toBeFalsy();
  });

  it('should get Is Not Defined Error obj', () => {
    const errorObj = v.getIsNotDefinedError('test');
    expect(errorObj.message).toContain('is not defined');
    expect(errorObj.message).toContain('test');
  });

  it('should validate if value is string', () =>{
    expect(v.isString('test')).toBeTruthy();
  });

  it('should fail if value is NOT string', () =>{
    expect(v.isString(true)).toBeFalsy();
  });

  it('should get Is Not String Error obj', () => {
    const errorObj = v.getIsNotStringError('test');
    expect(errorObj.message).toContain('must be a string');
    expect(errorObj.message).toContain('test');
  });

  it('should validate if value has min length', () =>{
    expect(v.hasMinLength(3, 'test')).toBeTruthy();
  });

  it('should fail if value has  NOT min length', () =>{
    expect(v.hasMinLength(2, 'a')).toBeFalsy();
  });

  it('should get Is Not String Error obj', () => {
    const errorObj = v.getHasNotMinLengthError('test', 5);
    expect(errorObj.message).toContain(`'test' must be at least 5`);
  });

  it('should validate if value is Array', () =>{
    expect(v.isArray([])).toBeTruthy();
  });

  it('should fail if value is NOT array', () =>{
    expect(v.isArray('a')).toBeFalsy();
  });

  it('should get Is Not Array Error obj', () => {
    const errorObj = v.getIsNotArrayError('test');
    expect(errorObj.message).toContain(`'test' must be an Array`);
  });

  it('should validate if value is number', () =>{
    expect(v.isNumber(2)).toBeTruthy();
  });

  it('should fail if value is NOT number', () =>{
    expect(v.isNumber('a')).toBeFalsy();
  });

  it('should get Is Not Number Error obj', () => {
    const errorObj = v.getIsNotNumberError('test');
    expect(errorObj.message).toContain(`'test' must be a number`);
  });



});