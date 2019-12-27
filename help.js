const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");
const prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
    
    if(args[0] == "help") return message.channel.send(`Simply request ${prefix}help instead, sir.`);
    
    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command)) {
            command = bot,commands.get(command);
            var SHembed = new Discord.RichEmbed()
                .setColor(colors.green_light)
                .setAuthor("HUGO HELP", message.guild.iconURL)
                .setThumbnail(bot.user.displayAvatarURL)
                .setDescription(`HUGO's prefix is ${prefix}\n\n**Command:** ${command.config.name}\n**Description:** ${command.config.description} || "No Description}\n**Usage:** ${command.config.usage || "No Usage"}\n**Accessible by:** ${command.config.accessableby || "Members"}\n**Aliases:** ${command.config.noalias || command.config.aliases}`)

            message.channel.send(SHembed);
        }    
    }

    if(!args[0]) {
        message.delete();
        let embed = new Discord.RichEmbed()
            .setAuthor(`Help Command!`, message.guild.iconURL)
            .setColor(colors.red_dark)
            .setDescription(`${message.author.username}, please check your dms!`)

        let Sembed = new Discord.RichEmbed()
            .setColor(colors.green_dark)
            .setThumbnail(bot.user.displayAvatarURL)
            .setTimestamp()
            .setDescription(`These are the available commands for HUGO!\nThe prefix for HUGO is: ${prefix}`)
            .addField(`Commands:`, "``help`` ``serverinfo`` ``userinfo``")
            .setFooter("HUGO 2019-2020", bot.user.displayAvatarURL)

        message.channel.send(embed).then(m => m.delete(10000));
        message.author.send(Sembed);
    }
}

module.exports.config = {
    name: "help",
    description: "Provides a list of available commands for HUGO.",
    usage: "!help",
    accessableby: "Members",
    aliases: ["h", "help"]
}