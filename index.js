const { Client, Collection } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Client();

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(token);

// const Discord = require('discord.js');
// const botconfig = require("./botconfig.json");
// const colors = require("./colors.json");

// const bot = new Discord.Client({disableEveryone: true});
// require('dotenv').config();

// var GphApiClient = require('giphy-js-sdk-core');
// const prefix = "!";
// const token = process.env.API_KEY;
// const gChannel_token = process.env.GENERAL_CHANNEL;
// const giphy = GphApiClient(process.env.GIPHY_TOKEN);

// bot.once('ready', async () => {

//     console.log("Hugo is online.");

    // client.guilds.forEach((guild) =>  {
    //     console.log(guild.name);
    //     guild.channels.forEach((channel) => {
    //         console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
    //     });
    // });

    // let generalChannel = client.channels.get(gChannel_token);
    // generalChannel.send("Hugo has been successfully uploaded.");

// });

// client.on('guildMemberAdd', member => {

//     const channel = member.guild.channels.find(channel => channel.name == "general");
//     if(!channel) return;

//     channel.send(`Welcome, ${member}.`);

// });


// function processCommand(message) {

//     let fullCommand = message.content.substr(1);
//     let splitCommand = fullCommand.split(" ");
//     let primaryCommand = splitCommand[0];
//     let args = splitCommand.slice(1);

//     if(primaryCommand == "help") {
//         helpCommand(args, message);
//     }else if(primaryCommand == "council") {
//         councilCommand(args, message);
//     }else if(primaryCommand == "rip") {
//         const attachment = new Attachment('https://media.giphy.com/media/2wYrkKvETbAwWAM4Gy/giphy.gif');
//         message.channel.send(message.author + ": ", attachment);
//     }else  {
//         message.channel.send("That is an unknown command. Try `!help` or `multiply`");
//     }

// }

// function hugoCommand(message) {

//     let args = message.content.split(" ");

//     if(args.includes("hello") || args.includes("hi")) {
//         message.channel.send(message.author + " | Hello there, sir.");
//     }else if(args.includes("bye")) {
//         message.channel.send(message.author + " | I'm here all day, sir.");
//     }else if(args.includes("gn")){
//         message.channel.send(message.author + " | Pleasure to serve you, sir.");
//     }else {
//         message.channel.send(message.author + " | At your service, sir.");
//     }

// }
            
//             member.kick().then((member) => {
//                 giphy.search('gifs', {"q": "family guy"}).then((response) => {
//                     var totalResponses = response.data.length;
//                     var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
//                     var responseFinal = response.data[responseIndex]

//                     message.channel.send(member.displayName + " has been removed, sir. :wave: ", {
//                     files: [responseFinal.images.fixed_height.url]
//                     }).catch(() => {
//                         message.channel.send('Error');
//                     });

//                 });

//             });

//             let member = message.mentions.members.first();
//             member.ban().then((member) => {
                
//                 message.channel.send('Banning ${member}...');
//                 const banMsg = member.displayName + " has been terminated, sir.";
//                 const banGIF = new Attachment('https://media.giphy.com/media/2oVfyRHk1EuRy/giphy.gif');
//                 message.channel.send(banMsg, banGIF);

//             });