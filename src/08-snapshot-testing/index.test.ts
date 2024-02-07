import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const expected = { "next": { "next": null, "value": null }, "value": 1 }
    expect(generateLinkedList([1])).toStrictEqual(expected)
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 2])).toMatchSnapshot()
  });
});
