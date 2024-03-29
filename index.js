const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'Njk1OTkzOTE2ODI2MTg5OTg0.XoqBaw.M2xSD_Paeutn-jYZtNcUuzpf3FM';
const Canvas = require('canvas');
const prefix = 't!';
const fs = require("fs");
bot.commands =  new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(f => f.endsWith(".js"));
const ytdl = require("ytdl-core");
const servers = {};
commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    
    bot.commands.set(command.name, command)
});

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

bot.on('message', message => {

    if (message.author.bot) return;
    let arg = message.content.toLowerCase();
    switch (arg) {
        case "sa":
            message.channel.send("Aleyküm Selam");
            break;
        case " aşkım nasılsın":
            message.channel.send("iyiyim aşkım sen nasılsın");
            break;
        case "nasıl geçti günün":
            message.channel.send("seni hiç alakadar etmez.")
            break;
        

    }
})



bot.on("ready", () => {
    console.log(`Hi, ${bot.user.username} is now online!`);


    bot.user.setActivity('TheMeka Resmi Sunucu botu', { type: 'PLAYING' }).catch(console.error);

    const loginChannel = bot.channels.cache.get("709032116175896628");
    if (!loginChannel){
        
    }else{
    loginChannel.join();
    }

    
   
})


bot.on('message', message => {

    if (message.author.bot) return;

    let arg = message.content.substring(prefix.length).split(" ");

    


        
        switch(arg[0]){
        case "clear":
            
             bot.commands.get("clear").execute(message,arg)
            break;
        case "instagram":
            message.channel.send("Themeka instagram : `mhmtbayraktar`")
            break;
        case "profile":
                bot.commands.get("profile").execute(message)
            break;
        case "poll":
                bot.commands.get("poll").execute(message,arg)
            break;
        case "ban":
                bot.commands.get("ban").execute(message, arg)
            break;
        case "kick":
                bot.commands.get("kick").execute(message, arg)
            break;
       
        }
    //MUSIC BOT COMMANDS
     //   case "play":
    //        bot.commands.get("play").run(servers,message,arg)
    //        break;
        
    

    
    
});


bot.on('guildMemberAdd', async member => {
    

    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
    
        // Declare a base size of the font
        let fontSize = 70;
    
        do {
            // Assign the font to the context and decrement it so it can be measured again
            ctx.font = `${fontSize -= 10}px sans-serif`;
            // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (ctx.measureText(text).width > canvas.width - 300);
    
        // Return the result to use in the actual canvas
        return ctx.font;
    };

    const channel =  member.guild.channels.cache.get("706600642419884083");
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./arkaplan.jpg');
    ctx.drawImage(background, 0, 0, canvas.width+50, canvas.height+50);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Sunucumuza hoşgeldin,', canvas.width / 2.5, canvas.height / 3.5);

    // Add an exclamation point here and below
    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);


member.guild.fetchInvites().then(guildInvites => {
    function memberCounter() {
        var member = bot.guilds.cache.get('587315116433997824');
        var memberCount = member.memberCount;
        return memberCount;
    }
        // This is the *existing* invites for the guild.
        var ei = invites[member.guild.id];
        // Update the cached invites for the guild.
        invites[member.guild.id] = guildInvites;
        // Look through the invites, find the one for which the uses went up.
        var invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
        // This is just to simplify the message being sent below (inviter doesn't have a tag property)
        var inviter = bot.users.cache.get(invite.inviter.id);
        // Get the log channel (change to your liking)
        var logChannel = member.guild.channels.cache.get("706600642419884083");
        logChannel.send(` ${member}, ${inviter} tarafından sunucuya katıldı. 📢 **1500** Kişi Olmamıza \`${1500-memberCounter()}\` Kişi Kaldı \`${memberCounter()}\` Kişiyiz!. ${invite.uses} davet `);
        // A real basic message with the information we need. 
        //logChannel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
      }).catch();
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
    channel.send(attachment);
    
    
    
    

});
bot.on('guildMemberRemove', member => {
    function memberCounter() {
        var member = bot.guilds.cache.get('587315116433997824');
        var memberCount = member.memberCount;
        return memberCount;
    }


    const channel = member.guild.channels.cache.get("706600642419884083");

    if (!channel) return;

    channel.send(`${member.user.username}, Sunucumuzdan ayrıldı.**1500** Kişi Olmamıza \`${1500-memberCounter()}\` Kişi Kaldı \`${memberCounter()}\` Kişiyiz! `);
     

});



bot.login(process.env.token);

