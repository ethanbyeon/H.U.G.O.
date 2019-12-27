const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {
    
    let sEmbed = new Discord.RichEmbed()
            .setColor(colors.blue_light)
            .setTitle("Server Info.")
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.guild.name} Info.`, message.guild.iconURL)
            .addField("**Guild Name:**", `${message.guild.name}`, true)
            .addField("**Guild Owner:**", `${message.guild.owner}`, true)
            .addField("**Member Count:**", `${message.guild.memberCount}`, true)
            .addField("**Role Count**:", `${message.guild.roles.size}`, true)
            .setFooter(`HUGO | Footer`, bot.user.displayAvatarURL);

        message.channel.send({embed: sEmbed});
}

module.exports.config = {
    name: "serverinfo",
    aliases: ["si", "serverdesc"]
}