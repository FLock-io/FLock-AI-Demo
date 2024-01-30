import dotenv from "dotenv/config";
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

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

const IGNORE_PREFIX = "!";
const CHANNEL_ID = "979734128054394960";

const commands = [
  new SlashCommandBuilder()
    .setName("chatbot")
    .setDescription("Chat with the bot")
    .toJSON(),
];

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.APP_ID, "977918915948728390"),
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

    // Starting a thread from the bot's message
    const thread = await message.startThread({
      name: "your question",
      autoArchiveDuration: 60,
      type: ChannelType.PrivateThread,
      reason: "Needed a separate thread for food",
    });

    // Send a message to the thread
    thread.send("Hello world!");

    // Optionally, you can inform the user that the thread has been created with an ephemeral follow-up message
    await interaction.followUp({
      content: "Your personal thread 'food-talk' is ready!",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
