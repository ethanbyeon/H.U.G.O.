const { Client, Attachment } = require('discord.js');
const client = new Client();
require('dotenv').config();

var GphApiClient = require('giphy-js-sdk-core');
const prefix = "!";
const token = process.env.API_KEY;
const giphy = GphApiClient(process.env.GIPHY_TOKEN);


client.once('ready', () => {

    console.log("Connected as " + client.user.tag);
    console.log('Ready!');

    client.guilds.forEach((guild) =>  {
        console.log(guild.name);
        guild.channels.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
        });
    });

    let generalChannel = client.channels.get("658868395986649122");
    generalChannel.send("Hello World!");

});

client.on('message', message => {

    // if(message.author == client.user) return;
    // message.channel.send(message.author.toString() + ": " + message.content);

    if(message.content.startsWith(`${prefix}`)) {
        processCommand(message);
    }

    if(message.content.includes("Hugo") || message.content.includes("hugo")) {
        hugoCommand(message);
    }
    
});

function processCommand(message) {

    let fullCommand = message.content.substr(1);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let args = splitCommand.slice(1);

    if(primaryCommand == "help") {
        helpCommand(args, message);
    }else if(primaryCommand == "council") {
        councilCommand(args, message);
    }else if(primaryCommand == "rip") {
        const attachment = new Attachment('https://media.giphy.com/media/2wYrkKvETbAwWAM4Gy/giphy.gif');
        message.channel.send(message.author + ": ", attachment);
    }else  {
        message.channel.send("That is an unknown command. Try `!help` or `multiply`");
    }

}

function hugoCommand(message) {

    let args = message.content.split(" ");

    if(args.includes("hello") || args.includes("hi")) {
        message.channel.send(message.author + " | Hello there, sir.");
    }else if(args.includes("bye")) {
        message.channel.send(message.author + " | I'm here all day, sir.");
    }else if(args.includes("gn")){
        message.channel.send(message.author + " | Pleasure to serve you, sir.");
    }else {
        message.channel.send(message.author + " | At your service, sir.");
    }

}

function helpCommand(args, message) {

    if(args.length == 0) {
        message.channel.send("I'm afraid that you have reached the limit to my capabilites. Try `!help [topic]`");
    } else {
        message.channel.send("It looks like you need assistance with " + args);
    }

}

function councilCommand(args, message) {

    if(message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {

        if(args.includes("kick")) {

            let member = message.mentions.members.first();
            
            member.kick().then((member) => {
                giphy.search('gifs', {"q": "family guy"}).then((response) => {
                    var totalResponses = response.data.length;
                    var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                    var responseFinal = response.data[responseIndex]

                    message.channel.send(member.displayName + " has been removed. :wave: ", {
                    files: [responseFinal.images.fixed_height.url]
                    }).catch(() => {
                        message.channel.send('Error');
                    });

                });

            });
        }

        if(message.content.includes("ban")) {

            let member = message.mentions.members.first();
            member.ban().then((member) => {
                
                const banMsg = member.displayName + " has been terminated.";
                const banGIF = new Attachment('https://media.giphy.com/media/2oVfyRHk1EuRy/giphy.gif');
                message.channel.send(banMsg, banGIF);

            });
        }
        
    }

}

client.login(token);