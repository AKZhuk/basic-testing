import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Add })).toBe(8)
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Subtract })).toBe(2)

  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Multiply })).toBe(15)
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Divide })).toBe(2)
  }
  );

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Exponentiate })).toBe(216)
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: 'unknownAction' })).toBeNull()

  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 6, b: '12', action: Action.Divide })).toBeNull()
  });
});
