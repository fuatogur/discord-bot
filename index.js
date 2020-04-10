const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'Njk1OTkzOTE2ODI2MTg5OTg0.XoqBaw.M2xSD_Paeutn-jYZtNcUuzpf3FM';
const Canvas = require('canvas');
const prefix = 't!';
const fs = require("fs");

bot.commands =  new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/").filter(f => f.endsWith(".js"));
commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    
    bot.commands.set(command.name, command)
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


    bot.user.setActivity('GELİŞTİRİLİYOR \n by Fuat Oğur', { type: 'PLAYING' }).catch(console.error);
    
   
})


bot.on('message', message => {

    if (message.author.bot) return;

    let arg = message.content.substring(prefix.length).split(" ");

    switch (arg[0]) {
        //#region 
        case "clear":
             bot.commands.get("clear").execute(message,args)
            break;
        case "instagram":
            message.channel.send("FuatOgur Instagram Hesabı : fuatogur.php")
            break;
        case "themeka-instagram":
            message.channel.send("Themeka Instagram Hesabı : mhmtbayraktar")
            break;
        case "profile":
            bot.commands.get("profile").execute(message)
            break;
        case "poll":
                bot.commands.get("poll").execute(message,args)
            break;
        case "ban":
                bot.commands.get("ban").execute(message, args)
            break;
        case "kick":
                bot.commands.get("kick").execute(message, args)
            break;
    //#endregion

    }
    
});


bot.on('guildMemberAdd', async member => {
    function memberCounter() {
        var member = bot.guilds.cache.get('405654512963944448');
        var memberCount = member.memberCount;
        return memberCount;
    }

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

    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome') || member.guild.channels.cache.find(c => c.name==="👋hosgeldin-gorusuruz👋");
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./arkaplan.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

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

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
    channel.send(`Sunucuya hoş geldin, ${member}` + "Sunucumuzda şu anda " + memberCounter() + " üye var.");
    channel.send(attachment);
    

});
bot.on('guildMemberRemove', member => {
    function memberCounter() {
        var member = bot.guilds.cache.get('405654512963944448');
        var memberCount = member.memberCount;
        return memberCount;
    }


    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome') || member.guild.channels.cache.find(c => c.name==="👋hosgeldin-gorusuruz👋");

    if (!channel) return;

    channel.send(`${member}, Sunucumuzdan ayrıldı. ` + "Sunucumuzda şu anda " + memberCounter() + " üye var.");

});



bot.login(process.env.token);

