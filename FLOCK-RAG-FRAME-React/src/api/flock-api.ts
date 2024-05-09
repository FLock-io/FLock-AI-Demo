import axios from "axios";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config(); // Make sure the path is correct

async function chatFLockBot(prompt: string, modelId: string) {
  console.log("Prompt:", prompt);

  try {
    // Construct the request payload
    const payload = {
      question: prompt,
      chat_history: [],
      knowledge_source_id: modelId, // replace with your model id
    };

    // Set the headers
    const headers = {
      "x-api-key": process.env.FLOCK_BOT_API_KEY, // Ensure API key is set in .env
    };

    // Send POST request using axios
    const response = await axios.post(
      `${process.env.FLOCK_BOT_ENDPOINT}/chat/conversational_rag_chat`,
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

export default chatFLockBot;
