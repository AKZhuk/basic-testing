import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 6, b: 3, action: Action.Exponentiate, expected: 216 },
  { a: 6, b: 3, action: 'unknownAction', expected: null },
  { a: 6, b: '12', action: Action.Divide, expected: null }
];

describe('simpleCalculator', () => {
  test.each(testCases)('should work correctly for %s testCase', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a: a, b: b, action: action });

    expect(result).toEqual(expected);
  })
})
