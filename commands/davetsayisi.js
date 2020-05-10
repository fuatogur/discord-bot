module.exports = {
    name: "davetsayisi",
    description: "to see how many players you are invited",
    execute(message,arg){
    
        const Discord = require('discord.js');
        const bot = new Discord.Client();
        // Initialize the invite cache
const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

bot.on('ready', () => {
  // "ready" isn't really ready. We need to wait a spell.
  wait(1000);

  // Load all invites for all guilds and save them to the cache.
  bot.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
        
            }
    }
