const { nodes } = require("../../botconfig.json");

module.exports = bot => {

    console.log(`${bot.user.username} is online`);

    // let statuses = [
    //     `Scanning through ${bot.guilds.size} papers`,
    //     `Monitoring ${bot.users.size} users`,
    //     "Eating Lil Uzi Vert's Poptarts",
    //     "Taking a nap",
    //     "Mowing Trump's golf course",
    //     "Sailing the Pequod",
    //     "Waiting in a soup kitchen queue"
    // ]

    // setInterval(function() {
    //     let status = statuses[Math.floor(Math.random() * statuses.length)];
    //     bot.user.setActivity(status, {type: "STATUS: "});
    // }, 5000);

    let activities = [ 
        `Scanning through ${bot.guilds.size} papers`,
        `Monitoring ${bot.users.size} users`,
        "Eating Lil Uzi Vert's Poptarts",
        "Taking a nap",
        "Mowing Trump's golf course",
        "Sailing the Pequod",
        "Waiting in a soup kitchen queue"
    ], i = 0;
    setInterval(() => bot.user.setActivity(`${bot.prefix}help | ${activities[i++ % activities.length]}`, { type: "STATUS:" }), 15000)

}