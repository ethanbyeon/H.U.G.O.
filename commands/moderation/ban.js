const { RichEmbed, Attachment } = require("discord.js");
const { red_dark } = require("../../colors.json");

var GphApiClient = require('giphy-js-sdk-core');
const giphy_token = GphApiClient(process.env.GIPHY_KEY);

module.exports = {

    config: {
        name: "ban",
        description: "Bans a user from the guild!",
        usage: "!ban",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["b", "banish", "poof", "skidoosh", "adios", "remove"]
    },

    run: async (bot, message, args) => {

        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You are not authorized to perform this command.");
        if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Sir, I am not authorized to perform this command.");

        let banMember = message.mentions.members.first() || message.guild.members.get(args[0]);
            if(!banMember) return message.channel.send("Please specify the user, sir.");

        let reason = args.slice(1).join(" ");
            if(!reason) reason = "No reason given.";

        banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
        message.guild.ban(banMember, { days: 1, reason: reason})).catch(err => console.log(err));
        
        message.delete();

        const banMsg = `**${banMember.user.tag}** has been terminated.`;
        const banGIF = new Attachment('https://media.giphy.com/media/2oVfyRHk1EuRy/giphy.gif');
        message.channel.send(banMsg, banGIF);

        let embed = new RichEmbed()
            .setColor(red_dark)
            .setAuthor(`${message.guild.name} NOTICE`, message.guild.iconURL)
            .addField("Moderation:", "Ban")
            .addField("Member:", banMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())
        
        let sChannel = message.guild.channels.find(c => c.name === "general");
        sChannel.send(embed);
    }
}