import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: "./.env" }); // Make sure the path is correct

export async function main(prompt, chatHistory) {
  try {
    // Construct the request payload
    const payload = {
      question: prompt,
      chat_history: chatHistory,
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
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
