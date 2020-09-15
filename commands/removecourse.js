const Discord = require("discord.js");
const config = require("../botconfig.json");
const utils = require("../util/utils");
const courselist = require('../course_list.json');


module.exports.run = async (bot, message, args) => {
    if (utils.checkDm(message)) return;
    messageContent = args.join(' ').toUpperCase();
    messageContent = messageContent.replace(/\s/g, '');
    /****************************************
        Parsing user input
    *************************************/
    var re = new RegExp(/[A-Z]{3}[A-E1-4][OMUCDPELX][M0-9]/g);

    // var rank = message.member.roles.highest.position;
    // var botrank = message.guild.members.resolve(bot.user).roles.highest.position;
    // if (rank > botrank)
    //     return utils.simpleMessage(`:no_entry_sign: The bot does not have sufficient permission to edit the role you request.`, message, config.errorColor, config.tempMsgTime)

    var missingLastDigit = false;
    var replyToUser = [];

    //Match all potential course code with regex
    var rawCourses = messageContent.match(re);
    if (!rawCourses) {
        //Maybe the user didn't add the last digit?
        var resimple = new RegExp(/[A-Z]{3}[A-E1-4][OMUCDPELX]/g);
        rawCourses = messageContent.match(resimple);
        missingLastDigit = true;
        if (!rawCourses)
            return utils.simpleMessage(":thinking: No valid course code detected!", message, config.errorColor, config.tempMsgTime);
        for (var i = 0; i < rawCourses.length; i++)
            rawCourses[i] = rawCourses[i] + "1";
        replyToUser.push([`:warning: The full course code is **6** characters long.`, "Course code detection for 5 characters is buggy and might not work."]);
        replyToUser.push([`\u200b`, "\u200b"]);
    }

    //Remove duplicated inputs
    rawCourses = [...new Set(rawCourses)];
    // Make sure all courses are valid (in the course list)
    var courses = [];
    for (entry in courselist)
        for (let i = rawCourses.length - 1; i >= 0; i--)
            if (rawCourses[i] === entry) {
                courses.push(rawCourses[i]);
                rawCourses.splice(i, 1);
            }

    // Sending a error message about all invalid course codes
    if (rawCourses.length > 0)
        replyToUser.push([`:thinking: The following course codes are not valid!`, utils.andjoin(rawCourses, ', ')]);
    if (courses.length == 0) return;

    var rolesToRemove = [];
    message.member.roles.cache.forEach(role => {
        for (let i = courses.length - 1; i >= 0; i--)
            if (courses[i] === role.name) {
                rolesToRemove.push(role);
                courses.splice(i, 1);
            }
    });

    if (courses.length > 0)
        replyToUser.push([`:thinking: You are not in the following courses!`, utils.andjoin(courses, ', ')]);

    var removedRolesString = [];

    for(var i = 0; i < rolesToRemove.length; i++){
        removedRolesString.push(rolesToRemove[i].name);
        await rolesToRemove[i].delete();
    }

    let embed = new Discord.MessageEmbed()
        .setColor(`${config.errorColor}`)
        .setTitle("Error removing courses")
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL());

    if (removedRolesString.length > 0) {
        replyToUser.push([`:ok_hand: The following courses are removed from your account!`, utils.andjoin(removedRolesString, ', ')]);
        embed.setColor(config.embedColor).setTitle("Success removing courses");
    }

    for (let i = replyToUser.length - 1; i >= 0; i--) {
        embed.addField(replyToUser[i][0], replyToUser[i][1]);
    }

    message.channel.send(embed);
}

module.exports.help = {
    name: "removecourse",
    args: "Any text containing course codes",
    description: "Remove an existing course from your user!",
    example: `${config.prefix}removecourse ENG1D0, remove COP4X0-01 SCH4U1-03 : Chemistry`,
    aliases: ["removecourse", "remove"]
};
