const {ERROR_CODES, HandleError} = require('../utils/ErrorHandler');

describe('Error Handler', () => {
  it('should validate that all ERROR_CODES include a code & message', () => {
    for (const keyCode of Object.keys(ERROR_CODES)) {
      expect(ERROR_CODES[keyCode].code).toBeDefined();
      expect(ERROR_CODES[keyCode].message).toBeDefined();

      expect(typeof ERROR_CODES[keyCode].code).toEqual('number');
      expect(typeof ERROR_CODES[keyCode].message).toEqual('string');
    }
  });

  it('should respons if error has code & message', () => {
    const spy = jest.fn();
    const mockResObj = {
      status: () => ({
        send: spy
      })
    }
    const error = ERROR_CODES[404];
    HandleError(error, mockResObj);
    expect(spy).toHaveBeenCalledWith(error);
  });

  it('should send erro by default', () => {
    const spy = jest.fn();
    const mockResObj = {
      status: () => ({
        send: spy
      })
    }
    const error = null;
    HandleError(error, mockResObj);
    expect(spy).toHaveBeenCalledWith(error);
  });
});