const urban = require("urban");
const { RichEmbed } = require("discord.js");
const { green_dark } = require("../../colors.json");
const { stripIndents } = require("common-tags");

module.exports = {

    config: {
        name: "urbandict",
        description: "Retrieves an Urban Dictionary definition.",
        usage: "<search|random> (query)",
        category: "misc",
        accessableby: "Members",
        aliases: ["ud", "urb", "urbandictionary"]
    },

    run: async (bot, message, args) => {
        if(!message.channel.nsfw) return message.channel.send("Please run this command in a nsfw channel.");
        if(args < 1 || !["random", "search"].includes(args[0])) return message.channel.send("`-urban <search|random> (query)");
        
        let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
        let search = args[1] ? urban(args.slice(1).join(" ")) : urban.random(); 

        try{
            search.first(res => {
                if(!res) return message.channel.send("There were no results found for this topic, sir.");
                let { word, definition, example, thumbs_up, thumbs_down, permalink, author } = res

                let embed = new RichEmbed()
                    .setColor(green_dark)
                    .setAuthor(`Urban Dictionary | ${word}`, image)
                    .setThumbnail(image)
                    .setDescription(stripIndents`**Description** ${definition || "No Definition"}
                    **Example:** ${example || "No Example"}
                    **Upvote:** ${thumbs_up || 0}
                    **Downvote:** ${thumbs_down || 0}
                    **Link:** [link to ${word}](${permalink || "https://www.urbandictionary.com/"})`)
                    .setTimestamp()
                    .setFooter(`Written by ${author || "Unknown"}`);

                message.channel.send(embed);
            });
        } catch(e) {
            console.log(e);
            return message.channel.send("I'm afraid something went wrong, sir.");
        }
    }

}