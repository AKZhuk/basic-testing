
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  let cb: jest.Mock

  beforeEach(() => {
    cb = jest.fn()
  })

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, 1000)
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(cb, 1000);

  });

  test('should call callback only after timeout', () => {

    doStuffByTimeout(cb, 1000)
    expect(cb).not.toBeCalled()
    jest.runAllTimers()
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let cb: jest.Mock

  beforeEach(() => {
    cb = jest.fn()
  })

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');


    doStuffByInterval(cb, 2000)
    jest.runOnlyPendingTimers()
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(cb, 2000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(cb, 5000)
    expect(cb).not.toBeCalled()
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'example.txt';

  beforeEach(() => {
    jest.mock('fs')
    fs.promises.readFile = jest.fn().mockResolvedValue(Buffer.from('File content'))

  })

  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join')
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    fs.existsSync = jest.fn().mockReturnValueOnce(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull()
  });

  test('should return file content if file exists', async () => {
    fs.existsSync = jest.fn().mockReturnValueOnce(true);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe('File content');
  });
});
