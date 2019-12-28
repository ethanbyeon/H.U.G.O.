const { RichEmbed } = require("discord.js");
const { blue_light } = require("../../colors.json");

module.exports = {
    
    config: {
        name: "serverinfo",
        description: "Provides information about the server.",
        usage: "!serverinfo",
        category: "misc",
        accessableby: "Members",
        aliases: ["si","sinfo", "serveri"]    
    },

    run: async (bot, message, args) => {
    
    let sEmbed = new RichEmbed()
            .setColor(blue_light)
            .setTitle(`${message.guild.name} Info:`)
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL)
            .addField("**Guild Name:**", `${message.guild.name}`, true)
            .addField("**Guild Owner:**", `${message.guild.owner}`, true)
            .addField("**Member Count:**", `${message.guild.memberCount}`, true)
            .addField("**Role Count**:", `${message.guild.roles.size}`, true)
            .setFooter(`HUGO | Footer`, bot.user.displayAvatarURL);

    message.channel.send(sEmbed);
    }
    
}