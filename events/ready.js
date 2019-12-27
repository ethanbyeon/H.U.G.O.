const Discord = require("discord.js");

module.exports = bot => {

    console.log(`${bot.user.username} is online`);
    //bot.user.setActivity("Hello", {type: "SAILING THE PEQUOD"});

    let statuses = [
        `Scanning through ${bot.guilds.size} papers`,
        `Monitoring ${bot.users.size} users`,
        "Eating Lil Uzi Vert's Poptarts",
        "Taking a nap",
        "Mowing Trump's golf course",
        "Sailing the Pequod",
        "Waiting in a soup kitchen queue"
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "STATUS: "});
    }, 5000);

}