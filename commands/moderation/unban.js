const { RichEmbed } = require("discord.js")
const { red_light } = require("../colors.json");

module.exports = {
    
    config: {
        name: "unban",
        description: "Unbans a user from the guild.",
        usage: "!unban",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["ub", "unbanish"]
    },
    
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You are not authorized to perform this command.");

	if(isNaN(args[0])) return message.channel.send("You need to provide an ID, sir.");
    let bannedMember = await bot.fetchUser(args[0])
        if(!bannedMember) return message.channel.send("Please specify a user, sir.");

    let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given.";

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Sir, I am not authorized to perform this command.")|
    
    message.delete();
    
    try {
        message.guild.unban(bannedMember, reason);
        message.channel.send(`${bannedMember.tag} has been succesfully unbanned, sir.`);
    } catch(e) {
        console.log(e.message);
    }

    let embed = new RichEmbed()
        .setColor(red_ligth)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "unban")
        .addField("Moderated on:", `${bannedMember.username} (${bannedMember.id})`)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())
    
            let sChannel = message.guild.channels.find(c => c.name === "general");
            sChannel.send(embed);
    }

}