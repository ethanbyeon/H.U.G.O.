const owner_id = process.env.OWNER_ID;

module.exports = {
    
    config: {
        name: "shutdown",
        description: "Shuts down the bot.",
        usage: "!shutdown",
        category: "moderation",
        accessableby: "Bot Owner",
        aliases: ["sd","sleep","exit"]
    },
    
    run: async (bot, message, args) => {

        if(message.author.id != owner_token) return message.channel.send("I'm afraid that you are not authorized to use this command.");

        try {
            await message.channel.send("Bot is shutting down...");
            process.exit();
        } catch(e) {
            message.channel.send(`ERROR: ${e.message}`);
        }
    }

}