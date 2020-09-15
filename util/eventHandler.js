const reqEvent = (event) => require(`../events/${event}`);

module.exports = bot =>{
    bot.on("ready", () => reqEvent("ready")(bot));
    bot.on("reconnecting", () => reqEvent("reconnecting")(bot));
    bot.on("shardDisconnect", () => reqEvent("disconnect")(bot));
    bot.on("guildMemberAdd", member =>reqEvent("guildMemberAdd")(bot, member));
};