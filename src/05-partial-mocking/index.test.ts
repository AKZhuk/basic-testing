import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => ({
  ...jest.requireActual('./index'),
  mockOne: () => { },
  mockTwo: () => { },
  mockThree: () => { }
})
)
console.log = jest.fn();
//const logSpyOn = jest.spyOn(console, 'log')
describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne()
    mockTwo()
    mockThree()
    expect(console.log).not.toBeCalled()
  });

  test('unmockedFunction should log into console', () => {
    // Write your test here
    unmockedFunction()
    expect(console.log).toBeCalledWith("I am not mocked")
  });
});
