
module.exports = bot => {

    console.log(`${bot.user.username} is online.`);

    let activities = [ 
        `Scanning ${bot.guilds.size} User Data`,
        `Monitoring ${bot.users.size} Users`,
        "Eating Lil Uzi Vert's Poptarts",
        "Taking A Nap",
        "Mowing Trump's Golf Course",
        "Sailing the Pequod",
        "Waiting in a Soup Kitchen Queue"
    ], i = 0;
    setInterval(() => bot.user.setActivity(`${activities[i++ % activities.length]}`, { type: "PLAYING" }), 20000)

}