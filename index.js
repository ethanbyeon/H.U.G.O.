const { Client, Attachment } = require('discord.js');
const client = new Client();
require('dotenv').config();

var GphApiClient = require('giphy-js-sdk-core');
const prefix = "!";
const token = process.env.API_KEY;
const giphy = GphApiClient(process.env.GIPHY_TOKEN);


client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {

    if(message.content.startsWith(`${prefix}hello`)) {
        message.reply("Hello there, sir.");
    }

    if(message.content.startsWith(`${prefix}bye`)) {
        message.reply("I'm here all day, sir.");
    }

    if(message.content.startsWith(`${prefix}gn`)) {
        message.reply("Pleasure to serve you, sir.");
    }

    if(message.content === `${prefix}rip`) {
        const attachment = new Attachment('https://media.giphy.com/media/2wYrkKvETbAwWAM4Gy/giphy.gif');
        message.channel.send(message.author, attachment);
    }
    
    if(message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {

        if(message.content.startsWith(`${prefix}kick`)) {

            let member = message.mentions.members.first();
            member.kick().then((member) => {

                giphy.search('gifs', {"q": "family guy"})
                    .then((response) => {

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

        if(message.content.startsWith(`${prefix}ban`)) {

            let member = message.mentions.members.first();
            member.ban().then((member) => {
                
                const banMsg = member.displayName + " has been terminated.";
                const banGIF = new Attachment('https://media.giphy.com/media/2oVfyRHk1EuRy/giphy.gif');
                message.channel.send(banMsg, banGIF);

            });
        }
    }
});

client.login(token);