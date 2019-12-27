const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {
    
    let uEmbed = new Discord.RichEmbed()
            .setColor(colors.red_light)
            .setTitle("User Info.")
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.author.name} Info.`, message.author.displayAvatarURL)
            .addField("**Username:**", `${message.author.username}`, true)
            .addField("**Discriminator:**", `${message.author.discriminator}`, true)
            .addField("**ID:**", `${message.author.id}`, true)
            .addField("**Status:**:", `${message.author.presence.status}`, true)
            .addField("**Creatd At:**", `${message.author.createdAt}`, true)
            .setFooter(`HUGO | Footer`, bot.user.displayAvatarURL);

        message.channel.send({embed: uEmbed});
}

module.exports.config = {
    name: "userinfo",
    description: "Provides your user information or the information of a specified user.",
    usage: "!userinfo (@mention)",
    accessableby: "Members",
    aliases: ["ui"]
}