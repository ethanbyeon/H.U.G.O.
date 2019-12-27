const { Client, Attachment } = require('discord.js');
const client = new Client();
require('dotenv').config();

var GphApiClient = require('giphy-js-sdk-core');
const prefix = "!";
const token = process.env.API_KEY;
const gChannel_token = process.env.GENERAL_CHANNEL;
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

    let generalChannel = client.channels.get(gChannel_token);
    generalChannel.send("Hugo is uploaded and live! ");

});

client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find(channel => channel.name == "general");
    if(!channel) return;

    channel.send(`Welcome, ${member}.`);

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

                    message.channel.send(member.displayName + " has been removed, sir. :wave: ", {
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
                
                message.channel.send('Banning ${member}...');
                const banMsg = member.displayName + " has been terminated, sir.";
                const banGIF = new Attachment('https://media.giphy.com/media/2oVfyRHk1EuRy/giphy.gif');
                message.channel.send(banMsg, banGIF);

            });
        }
        
    }

    if(!message.guild.me.hasPermissions(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Sir, I am not authorized to manage roles.");

    if(message.member.hasPermissions("MANAGE_ROLES") || message.guild.owner) {

        if(args[0] === "mute") {

            let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
            if(!mutee) return message.channel.send("Please specify a member, sir.");

            let muterole = message.guild.roles.find(r => r.name === "Muted");

            if(!muterole) {

                try {

                    muterole = await message.guild.createRole({
                       
                        name: "Muted",
                        color: "#514f48",
                        permissions: []
                    
                    });

                    message.guild.channels.forEach(async (channel, id) => {
                        
                        await channel.overwritePermissions(muterole, {

                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SEND_TTS_MESSAGES: false,
                            ATTACH_FILES: false,
                            SPEAK: false

                        })

                    });

                }catch(e) {
                    console.log(e.stack);
                }

            }

            mutee.addRole(muteRole.id).then(() => {
                message.delete();
                mutee.send(`Hello, you have been placed in ${messsage.guild.name} for being naughty.`);
                message.channel.send(`${mutee.user.username} was successfully muted, sir.`)
            });


            // let embed = new Discord.RichEmbed()
            // .setColor(colours.reddark)
            // .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
            // .addField("Moderation: ", "mute")
            // .addField("Mutee: ", mutee.user.username)
            // .addField("Moderator: ", message.author.username)
            // .addField("Date: ", message.createdAt)

            // let sChannel = message.guild.channels.find(c => c.name === "tut-modlogs")
            // sChannel.send(embed);

        }
        
    }else {
        return message.channel.send("I'm afraid you are not authorized to use this command.");
    }

}

client.login(token);