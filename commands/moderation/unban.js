const { RichEmbed } = require("discord.js")
const { red_dark } = require("../../colors.json");

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
        if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Sir, I am not authorized to perform this command.");

        if(isNaN(args[0])) return message.channel.send("You need to provide an ID, sir.");
        let bannedMember = await bot.fetchUser(args[0]);
            if(!bannedMember) return message.channel.send("Please specify a user, sir.");

        let reason = args.slice(1).join(" ");
            if(!reason) reason = "No reason given.";
        
        try {
            message.guild.unban(bannedMember, reason);
            bannedMember.send(`Hello, you have been unbanned from ${message.guild.name} for: ${reason}`).catch(err => console.log(err));
            message.channel.send(`${bannedMember.tag} has been unbanned, sir.`).then(m => m.delete(5000));
        } catch(e) {
            console.log(e.message);
        }

        let embed = new RichEmbed()
            .setColor(red_dark)
            .setAuthor(`${message.guild.name} NOTICE`, message.guild.iconURL)
            .addField("Moderation:", "Unban")
            .addField("Moderated on:", `${bannedMember.username} (${bannedMember.id})`)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())
        
        let sChannel = message.guild.channels.find(c => c.name === "general");
        sChannel.send(embed);
    }

}