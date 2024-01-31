const axios = require("axios");
const AxiosMockAdapter = require("axios-mock-adapter");
const main = require("../src/main.js");

// Mocking environment variables
process.env.MODEL_NAME = "test-model";
process.env.ENDPOINT = "http://localhost";
process.env.FLOCK_API_KEY = "test-api-key";

describe("main function", () => {
  it("should make an API call and log the response", async () => {
    const mock = new AxiosMockAdapter(axios);

    const mockedResponse = { data: "mocked data" };
    mock
      .onPost("http://localhost/chat/conversational_rag_chat")
      .reply(200, mockedResponse);

    const consoleLogSpy = jest.spyOn(console, "log");

    await main("What is Solana?");

    expect(consoleLogSpy).toHaveBeenCalledWith("Prompt:", "What is Solana?");
    expect(consoleLogSpy).toHaveBeenCalledWith("Model:", "test-model");
    expect(consoleLogSpy).toHaveBeenCalledWith(mockedResponse);

    consoleLogSpy.mockRestore();
    mock.restore();
  });

  it("should log an error if the API call fails", async () => {
    const mock = new AxiosMockAdapter(axios);
    mock.onPost("http://localhost/chat/conversational_rag_chat").networkError();

    const consoleErrorSpy = jest.spyOn(console, "error");

    await main("What is Solana?");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error:")
    );

    consoleErrorSpy.mockRestore();
    mock.restore();
  });
});
