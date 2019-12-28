const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");

module.exports.run = async (bots, message, args) => {

    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You are not authorized to use this command.");
    if(!message.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Sir, I am not authorized to manage roles.");

    let mutee = message.mentions.members.first() || message.guilds.members.get(args[0]);
    if(!mutee) return message.channel.send("Please specify a user, sir.");

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason give.";

    let muterole = message.guild.roles.find(r => r.name === "TIMEOUT CORNER");
    if(!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "CONE OF SHAME",
                color: "#514f48",
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false
                });
            });
        }catch(e) {
            console.log(e.stack);
        }
    }

    mutee.addRole(muterole.id).then(() => {
        message.delete();
        mutee.send(`Hello, you have been in ${message.guild.name} for: ${reason}.`);
        message.channel.send(`${mutee.user.username} was succesfully muted, sir.`);
    });

    let embed = new Discord.RichEmbed()
        .setColor(colors.red_dark)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "mute")
        .addField("Mutee:", mutee.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())
    
    let sChannel = message.guild.channels.find(c => c.name === "general")
    sChannel.send(embed);

}

module.exports.config = {
    
    name: "mute",
    description: "Mutes a member.",
    usage: "!mute <@user> <reason>",
    accessableby: "Members",
    aliases: ["m", "nospeak", "mute"]

}