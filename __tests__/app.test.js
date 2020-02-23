const { logger, errLogger } = require('../logger.js');
const mockfs = require('../__mocks__/fs.js');
const util = require('util');
const mockRead = util.promisify(mockfs.readFile);
const mockWrite = util.promisify(mockfs.writeFile);
const testFile = `${__dirname}/files/test-scratch.txt`;
const testString = 'The quick brown fox jumped over the lazy dogs.';
const { upperCaseContents } = require('../alter-file.js');

describe('logger', () => {
  it('can display the event, time, and payload', () => {
    jest.spyOn(global.console, 'log');
    const testFile = `${__dirname}/files/test-scratch.txt`;
    const res = logger('save', testFile);

    expect(console.log).toHaveBeenCalled();
    expect(res.event).toBe('save');;
    expect(res.payload).toBe(testFile);
    expect(!!res.time).toBe(true);
  });

  it('can catch an error', () => {
    jest.spyOn(global.console, 'error');
    const expectedRes = `error writing to file: ${testFile}`;
    const res = errLogger('error', testFile);

    expect(console.error).toHaveBeenCalled();
    expect(res).toBe(expectedRes);
  });
});

describe('alterFile', () => {
  it('can properly uppercase contents', () => {
    mockRead(testFile)
      .then(upperCaseContents)
      .then(buffer => {
        expect(buffer).toEqual(Buffer.from(buffer.toString().trim().toUpperCase()));
        mockWrite(testFile, buffer, (err, data) => {
          expect(data).toEqual(testString.trim().toUpperCase());
          expect(!!err).toBe(false);
        });
      });
  });
})
