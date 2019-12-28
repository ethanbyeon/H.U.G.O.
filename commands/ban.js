const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");


module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You are not authorized to perform this command.");
    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Sir, I am not authorized to perform this command.");

    let banMember = message.mentions.members.first() || message.guilds.members.get(args[0]);
        if(!banMember) return message.channel.send("Please specify a user, sir.");

    let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given.";

    message.delete();

    banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() => 
    message.guild.ban(banMember, {days: 1, reason: reason})).catch(err => console.log(err));

    message.channel.send(`**${banMember.user.username}** has been terminated, sir.`);

    let embed = new Discord.RichEmbed()
        .setColor(colors.red_dark)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "ban")
        .addField("Mutee:", banMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())
    
    let sChannel = message.guild.channels.find(c => c.name === "general")
    sChannel.send(embed);

}

module.exports.config = {
    
    name: "ban",
    description: "Bans a user from the guild.",
    usage: "!ban <@user> <reason>",
    accessableby: "Administrator",
    aliases: ["b", "banish", "poof", "skidoosh", "adios", "remove"]

}