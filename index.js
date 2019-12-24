const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

var GphApiClient = require('giphy-js-sdk-core');
const prefix = "!";
const token = process.env.API_KEY;
const giphy = GphApiClient(process.env.GIPHY_TOKEN);


client.once('ready', () => {
    console.log('Ready!');
})

client.on('message', message => {

    if(message.content.startsWith(`${prefix}hello`)) {
        message.channel.send("Hello there, sir " + message.author.username + ".");
    }

    if(message.content.startsWith(`${prefix}bye`)) {
        message.reply("I'm here all day, sir.");
    }

    if(message.content.startsWith(`${prefix}good night`)) {
        message.reply("Pleasure to serve you, sir.");
    }
    
    if(message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {

        if(message.content.startsWith(`${prefix}kick`)) {

            let member = message.mentions.members.first();
            member.kick().then((member) => {

                giphy.search('gifs', {"q": "family guy"})
                    .then((response) => {

                        var totalReponses = response.data.length;
                        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponse;
                        var responseFinal = response.data[responseIndex]

                        message.channel.send(":wave: " + member.displayName + " has been terminated.", {
                            files: [responseFinal.images.fixed_height.url]
                        }).catch(() => {
                            message.channel.send('Error');
                        })

                    })
            })
        }
    }
})

client.login(token);