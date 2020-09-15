const Discord = require("discord.js");
const config = require("../botconfig.json");
const utils = require("../util/utils");

module.exports.run = async (bot, message) => {
    if (utils.checkDm(message)) return;

    let embed = new Discord.MessageEmbed().setTitle("Welcome!")
        .addField('The **Unionville HS** Discord Server is your one stop shop for everything UHS!', ':books: `Course Chats` For the homework helps!\n:link: `Grade Chats` to connect ith your grade!\n:school: `#sk-an-alum` for any University questions!\n:joystick: `Entertainment` To find someone to game with!\n:desktop: `tech-support` if you need any, well, tech support.\n')
        .addField(":thinking: Make sure to read `#rules-and-info`", "Sending any message in this server means you've read and agreed to the server rules.")
        .addField('\u200b', '\u200b')
        .addField(":clap::clap:**ENTER THE COURSE CODES OF YOUR CLASSES BELOW** :point_down: to join your course chats, department chats and grade chats!", "Don't worry about formatting, if the code is valid, we can read it!")
        .addField('\u200b', 'Please only use this channel to post course codes. All messages will be deleted automatically')
        .setFooter(text = "Message an admin if you need help, have a request or suggestion!")
        .setColor(config.embedColor);


    // let embed = new Discord.MessageEmbed()
    //     .setAuthor(`${message.guild.name}`)
    //     .setThumbnail(serverIcon)
    //     .setTitle("Server Information!")
    //     .addField("Age", `${utils.getAgeString(utils.getAgeDate(message.guild.createdAt))}`, true)
    //     .addField("Region", message.guild.region, true)
    //     .addField("Server Owner", message.guild.owner.user.tag, true)
    //     .addField('Member Status', `**${message.guild.members.cache.filter(o => o.presence.status === 'online').size}** Online\n**${message.guild.members.cache.filter(i => i.presence.status === 'idle').size}** Idle/Away\n**${message.guild.members.cache.filter(dnd => dnd.presence.status === 'dnd').size}** Do Not Disturb\n**${message.guild.members.cache.filter(off => off.presence.status === 'offline').size}** Offline/Invisible\n**${message.guild.members.cache.filter(s => s.presence.status === 'streaming').size}** Streaming`, true)
    //     .addField("Members", `**${message.guild.memberCount}** Total\n**${message.guild.members.cache.filter(member => !member.user.bot).size}** Humans\n**${message.guild.members.cache.filter(member => member.user.bot).size}** Bots`, true)
    //     .setColor(config.embedColor);
    // utils.embedAddStamp(message, embed, message.author);
    message.channel.send(embed);
};

module.exports.help = {
    name: "customembed",
    description: "This is a debug command only available to the owner of the server",
    aliases: ["customembed"]
};
