const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");

module.exports.run = async (bots, message, args) => {

    if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You are not authorized to perform this command.");
    if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Sir, I am not authorized to perform this.");

    let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!kickMember) return message.channel.send("Please specify a member, sir.");

    let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given.";

    kickMember.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`).then(() =>
    kickMember.kick()).catch(err => console.log(err));

    message.channel.send(`**${kickMember.user.username}** has been successfully kicked, sir.`);

    let embed = new Discord.RichEmbed()
        .setColor(colors.red_dark)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "kick")
        .addField("Mutee:", kickMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())
    
    let sChannel = message.guild.channels.find(c => c.name === "general")
    sChannel.send(embed);

}

module.exports.config = {
    
    name: "kick",
    description: "Kicks a user from the guild.",
    usage: "!kick <@user> <reason>",
    accessableby: "Moderator",
    aliases: ["k", "boot"]

}