require("dotenv").config(); // Load environment variables from .env file
const axios = require("axios"); // Import axios

async function main(prompt) {
  console.log("Prompt:", prompt);
  console.log("Model:", process.env.MODEL_NAME);

  try {
    // Construct the request payload
    const payload = {
      question: prompt,
      chat_history: [],
      knowledge_source_id: process.env.MODEL_NAME,
    };

    // Set the headers
    const endpoint = process.env.ENDPOINT; // Ensure endpoint is defined
    if (!endpoint) {
      throw new Error("Endpoint is not defined in the environment variables.");
    }

    const headers = {
      "x-api-key": process.env.FLOCK_API_KEY, // Ensure API key is set in .env
    };

    // Send POST request using axios
    const response = await axios.post(
      `${endpoint}/chat/conversational_rag_chat`,
      payload,
      {
        headers,
      }
    );

    // Output the response data
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example call to the main function
main("What is Solana?");
