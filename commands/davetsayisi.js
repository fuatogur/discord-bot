module.exports = {
    name: "davetsayisi",
    description: "to see how many players you are invited",
    execute(message,arg){
    
    
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
        member.guild.fetchInvites().then(guildInvites => {
            
                // This is the *existing* invites for the guild.
                var ei = invites[member.guild.id];
                // Update the cached invites for the guild.
                invites[member.guild.id] = guildInvites;
                // Look through the invites, find the one for which the uses went up.
                var invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
                // This is just to simplify the message being sent below (inviter doesn't have a tag property)
                var inviter = bot.users.cache.get(invite.inviter.id);
                // Get the log channel (change to your liking)
                
                //logChannel.send(` ${member}, ${inviter} tarafından sunucuya katıldı. 📢 **1000** Kişi Olmamıza \`${1000-memberCounter()}\` Kişi Kaldı \`${memberCounter()}\` Kişiyiz!. ${invite.uses} davet `);
                // A real basic message with the information we need. 
                //logChannel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
                const Discord = require('discord.js');
                const embed = new Discord.MessageEmbed().setTitle("Kullanıcı Bilgisi")
                .setColor("RANDOM")
                .addField("Kullanıcı Adı", message.author.username, true)
                .addField("Davet Edilen Kişi Sayısı", invite.uses, true)
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp();
              }).catch();
            }
    }
}