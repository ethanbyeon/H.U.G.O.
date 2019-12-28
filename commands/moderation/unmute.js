const { RichEmbed } = require("discord.js");
const { red_light } = require("../../colors.json");

module.exports = {

    config: {
        name: "unmute",
        description: "Unmutes a member from the guild.",
        usage: "!unmute <@user> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["unm", "speak"]
    },

    run: async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You are not authorized to use this command.");
    if(!message.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Sir, I am not authorized to manage roles.");

    let mutee = message.mentions.members.first() || message.guilds.members.get(args[0]);
        if(!mutee) return message.channel.send("Please specify a user, sir.");

    let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason give.";

    let muterole = message.guild.roles.find(r => r.name === "TIMEOUT CORNER");
        if(!muterole) return message.channel.send("Sir, there is no mute role to remove.")

    mutee.removeRole(muterole.id).then(() => {
        message.delete();
        mutee.send(`Hello, you have been unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err));
        message.channel.send(`${mutee.user.username} was unmuted, sir.`);
    });

    let embed = new RichEmbed()
        .setColor("RED")
        .setAuthor(`${member.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "unmute")
        .addField("Mutee:", mutee.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())

            let sChannel = message.guild.channels.find(c => c.name === "general");
            sChannel.send(embed);
    }
    
}