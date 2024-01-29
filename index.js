require("dotenv/config");
const { main } = require("./flock-api");

const { Client, ChannelType } = require("discord.js");

const client = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
});

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

const IGNORE_PREFIX = "!";
const CHANNEL_ID = "979734128054394960";

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content === "ping") {
    const thread = await message.startThread({
      name: "food-talk",
      type: ChannelType.PrivateThread,
      reason: "Needed a separate thread for food",
    });
    const reply = await main("What is the best food?");
    // send a message to that thread
    console.log(thread);
    console.log(reply);
    thread.send("Hello world!");
    thread.send(reply.answer);
  }
});

client.login(process.env.DISCORD_TOKEN);
