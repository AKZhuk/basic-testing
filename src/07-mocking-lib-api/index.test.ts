import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  let axiosClient: any

  beforeEach(() => {
    axiosClient = {
      "get": jest.fn(async (path) => {
        console.log(path);

        return Promise.resolve({ data: 'response data' })
      })
    }
    axios.create = jest.fn().mockReturnValue(axiosClient as unknown as AxiosInstance)
  })

  beforeAll(() => {
    jest.mock("axios");
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/users')
    jest.runOnlyPendingTimers()
    expect(
      axios.create).toBeCalledWith({ "baseURL": "https://jsonplaceholder.typicode.com" })
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/users')
    jest.runOnlyPendingTimers()

    expect(
      axiosClient.get).toBeCalledWith("/users")
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi('/users')
    jest.runOnlyPendingTimers()
    expect(
      response).toBe("response data")
  });
});


