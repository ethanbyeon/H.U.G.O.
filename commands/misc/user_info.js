const { RichEmbed } = require("discord.js");
const { blue_light } = require("../../colors.json");

module.exports = {
    
    config: {
        name: "userinfo",
        description: "Provides your user information or the information of a specified user.",
        usage: "!userinfo (@mention)",
        category: "misc",
        accessableby: "Members",
        aliases: ["ui", "uinfo", "useri"]
    },

    run: async (bot, message, args) => {
    
        let uEmbed = new RichEmbed()
                .setColor(blue_light)
                .setTitle("User Info:")
                .setThumbnail(message.guild.iconURL)
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
                .addField("**Username:**", `${message.author.username}`, true)
                .addField("**Discriminator:**", `${message.author.discriminator}`, true)
                .addField("**ID:**", `${message.author.id}`, true)
                .addField("**Status:**:", `${message.author.presence.status}`, true)
                .addField("**Creatd At:**", `${message.author.createdAt}`, true)
                .setFooter(`HUGO | Footer`, bot.user.displayAvatarURL);

        message.channel.send(uEmbed);
    }

}