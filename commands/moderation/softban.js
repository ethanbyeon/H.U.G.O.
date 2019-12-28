const { RichEmbed } = require("discord.js");
const { red_dark } = require("../../colors.json");

module.exports = {

    config: {
        name: "softban",
        description: "Softbans a user from the guild.",
        usage: "!softban",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["sb", "sbanish", "sremove"]
    },
    
    run: async (bot, message, args) => {
    
        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You are not authorized to perform this command.");
        if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Sir, I am not authorized to perform this command.");

        let banMember = message.mentions.members.first() || message.guild.members.get(args[0]);
            if(!banMember) return message.channel.send("Please specify a user, sir.");

        let reason = args.slice(1).join(" ");
            if(!reason) reason = "No reason given.";   

        banMember.send(`Hello, you have been temporarily banned from ${message.guild.name} for: ${reason}`).then(() =>
        message.guild.ban(banMember, { days: 1, reason: reason})).then(() => message.guild.unban(banMember.id, { reason: "Softban"})).catch(err => console.log(err));

        message.channel.send(`**${banMember.user.tag}** has been temporarily banned, sir.`).then(m => m.delete(5000));

        let embed = new RichEmbed()
            .setColor(red_dark)
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
            .addField("Moderation:", "Softban")
            .addField("Member:", banMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())
        
        let sChannel = message.guild.channels.find(c => c.name === "general");
        sChannel.send(embed);
    }

}