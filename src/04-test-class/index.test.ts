import lodash from 'lodash';
import { BankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';

describe('BankAccount', () => {
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(500)
    jest.mock('lodash')
  })
  test('should create account with initial balance', () => {
    expect(account).toEqual({ "_balance": 500 })
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(1000)).toThrowError(new InsufficientFundsError(500))
  });

  test('should throw error when transferring more than balance', () => {
    const secondAccount = getBankAccount(100)
    expect(() => account.transfer(1000, secondAccount)).toThrowError(new InsufficientFundsError(500))

  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(1000, account)).toThrowError(new TransferFailedError())

  });

  test('should deposit money', () => {
    expect(account.deposit(1000)).toEqual({ "_balance": 1500 })

  });

  test('should withdraw money', () => {
    expect(account.withdraw(100)).toEqual({ "_balance": 400 })

  });

  test('should transfer money', () => {
    const secondAccount = getBankAccount(100)
    expect(account.transfer(100, secondAccount)).toEqual({ "_balance": 400 })
    expect(secondAccount.getBalance()).toBe(200)

  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn().mockReturnValueOnce(1000).mockReturnValueOnce(0.8)
    expect(await account.fetchBalance()).toBe(1000)


  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn().mockReturnValueOnce(1000).mockReturnValueOnce(0.8)
    await account.synchronizeBalance()
    expect(account.getBalance()).toBe(1000)

  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodash.random = jest.fn().mockReturnValueOnce(1000).mockReturnValueOnce(0)
    expect(async () => await account.synchronizeBalance()).rejects.toThrowError(new SynchronizationFailedError())
  });
});
