import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: "./.env" }); // Make sure the path is correct

export async function main(prompt) {
  console.log("Prompt:", prompt);
  console.log("Model:", process.env.model_name);

  try {
    // Construct the request payload
    const payload = {
      question: prompt,
      chat_history: [],
      knowledge_source_id: "string", // Replace with actual ID if needed
    };

    // Set the headers
    const endpoint = process.env.endpoint; // Ensure endpoint is defined
    if (!endpoint) {
      throw new Error("Endpoint is not defined in the environment variables.");
    }

    const headers = {
      "x-api-key": process.env.api_key, // Ensure API key is set in .env
    };

    // Send POST request using axios
    const response = await axios.post(endpoint, payload, { headers });

    // Output the response data
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);

    return {
      answer: "Sorry, I don't know.",
      score: 0,
    };
  }
}
