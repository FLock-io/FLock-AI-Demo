import { main } from "./flock-api.js";
import {
  Client,
  ChannelType,
  SlashCommandBuilder,
  REST,
  Routes,
} from "discord.js";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
});

const chatHistories = [];

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

const commands = [
  new SlashCommandBuilder()
    .setName("chatbot")
    .setDescription("Chat with the bot")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("Prompt for the chatbot")
        .setRequired(true)
    )
    .toJSON(),
];

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "chatbot") {
    // Reply with a non-ephemeral message
    const message = await interaction.reply({
      content: "Preparing your personal thread...",
      fetchReply: true,
      ephemeral: false, // This message needs to be non-ephemeral to start a thread
    });

    // Get the prompt from the user
    const prompt = interaction.options.getString("prompt");
    const user = interaction.user;
    console.log(user);

    // Starting a thread from the bot's message
    const thread = await message.startThread({
      name: prompt,
      autoArchiveDuration: 60,
      type: ChannelType.PrivateThread,
      reason: "Needed a separate thread for food",
    });

    // Send a message to the thread
    // thread.send(`Hello, ${user.globalName}`);

    const chatHistory = chatHistories || [];

    const response = await main(prompt, chatHistory);

    // Update chat history

    chatHistories.push(response);

    // Optionally, you can inform the user that the thread has been created with an ephemeral follow-up message
    await interaction.followUp({
      content: `Your personal thread ${prompt} is ready!`,
      ephemeral: true,
    });

    // // Reply in the thread
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(response.answer);
    } else {
      await interaction.reply(response.answer);
    }
  }
});