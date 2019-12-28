const { Client, Collection } = require("discord.js");
require('dotenv').config();

const bot = new Client();
const token = process.env.API_KEY;

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find(channel => channel.name == "general");
    if(!channel) return;

    channel.send(`Welcome, ${member}.`);

});

bot.login(token);