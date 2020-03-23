/**
 * Core Node 'fs' module mock
 * Even if it no custom mocking is set, JEST is able to pick the original 'fs' module by:
 * 
 *    jest.genMockFromModule('fs');
 * 
 * After that, the local fs variable will have set a Spy for every function that the orignal 'fs' module contains
 * 
 */
const fs = jest.genMockFromModule('fs');

const fsAsyncMockFn = (a, b, callback) => {
  callback();
};
fs.writeFile = jest.fn().mockImplementation(fsAsyncMockFn);


module.exports = fs;
