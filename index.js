const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'Njk1OTkzOTE2ODI2MTg5OTg0.XoqBaw.M2xSD_Paeutn-jYZtNcUuzpf3FM';
const Canvas = require('canvas');
const prefix = 't!';
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


bot.on('message', message => {

    if(message.author.bot) return;
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

    
    bot.user.setActivity('GELİŞTİRİLİYOR \n by Fuat Oğur',{type: 'PLAYING'}).catch(console.error);
    bot.user.setPresence()
})


bot.on('message',  message => {

    if(message.author.bot) return;

    let arg = message.content.substring(prefix.length).split(" ");

    switch (arg[0]) {
        case "clear":

            if (message.member.roles.cache.find(r => r.name === "Kurucu") ||
                message.member.roles.cache.find(r => r.name === "Admin") ||
                message.member.roles.cache.find(r => r.name === "Moderatör")) {
                if (!arg[1]) {
                    message.reply("Lütfen sayı belirtin!")
                } else {
                    message.channel.bulkDelete(arg[1])
                    message.channel.send("Son " + arg[1] + " mesaj silindi.")
                }
            } else {
                message.delete();
                message.channel.send("Böyle bir yetkiniz yok")
            }
            break;
        case "instagram":
            message.channel.send("FuatOgur Instagram Hesabı : fuatogur.php")
            break;
        case "themeka-instagram":
            message.channel.send("Themeka Instagram Hesabı : mhmtbayraktar")
            break;
        case "profil":
            let dateMonth = message.author.createdAt.getMonth();
            let dateYear = message.author.createdAt.getFullYear();
            let dateDay = message.author.createdAt.getDay();
            const embed = new Discord.MessageEmbed().setTitle("Kullanıcı Bilgisi")
                .setColor(0x344ceb)
                .addField("Kullanıcı Adı", message.author.username, true)
                .addField("Hesap Kurulma Tarihi", dateDay + "/" + dateMonth + "/" + dateYear, true)
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp();

            message.channel.send(embed);
            break;
            case "poll":
                const PollEmbed = new Discord.MessageEmbed()
                .setColor(0xffff00)
                .setTitle("Oylama Menüsü");

                if(!arg[1]){
                    message.channel.send(PollEmbed)
                }
                let msgArgs = arg.slice(1).join(" ")
                message.channel.send(msgArgs)
                
            break;
        case "ban":
            if(message.deletable) message.delete();
            const toBan = message.mentions.members.first();
            

            
            if (message.member.hasPermission("BAN_MEMBERS")) {
                if(message.guild.me.hasPermission("BAN_MEMBERS")){
                    if(!arg[1]){
                        return message.reply("Lütfen bir kişi belirtin")
                     }
                     else{
                         if(!arg[2]){
                             return message.reply("Lütfen bir sebep belirtin")
                         }else{
                            if(!arg[3]){
                                return message.reply("Lütfen bir süre belirtin")
                            }else{
                                if(!toBan){
                                    return message.reply("Bu kişiyi bulamadım.")
                                }
                                else{
                                   if (!toBan.bannable) {
                                       return message.reply("Bu kişiyi maaalesef yasaklayamıyorum.")
                                   }
                                   else{
                                       if(toBan.id === message.author.id){
                                           return message.reply("Kendini yasaklayamazsın.")
                                       }else{
                                           /*try {*/
                                                toBan.ban({ days: arg[3], reason: arg[2] })
                                                message.channel.send(`${toBan}  adlı kullanıcı ${message.author.username}  tarafından ${arg[2]} sebebiyle sunucudan yasaklandı.`)
                                          /* } catch (error) {
                                                message.channel.send("Bir hata oluştu.")
                                           }
                                           */
                                       }
                                   }
                                }
                            }

                            
                         }
                     }
                }else{
                    return message.reply("Bunu yapmaya yetkim yok.")
                }
               
            } else {
                return message.reply("Bunu yapmaya yetkiniz yok.")
            }
            break;
        case "kick":
            if(message.deletable) message.delete();
            const toKick = message.mentions.members.first();
            

            
            if (message.member.hasPermission("KICK_MEMBERS")) {
                if(message.guild.me.hasPermission("KICK_MEMBERS")){
                    if(!arg[1]){
                        return message.reply("Lütfen bir kişi belirtin")
                     }
                     else{
                         if(!arg[2]){
                             return message.reply("Lütfen bir sebep belirtin")
                         }else{
                             if(!toKick){
                                 return message.reply("Bu kişiyi bulamadım.")
                             }
                             else{
                                if (!toKick.kickable) {
                                    return message.reply("Bu kişiyi maaalesef atamıyorum.")
                                }
                                else{
                                    if(toKick.id === message.author.id){
                                        return message.reply("Kendini atamazsın.")
                                    }else{
                                        try {
                                            toKick.kick({reason: arg[2]})
                                            message.channel.send(`${toKick}  adlı kullanıcı ${message.author.username}  tarafından sunucudan atılmıştır.`)
                                        } catch (error) {
                                            message.channel.send("Bir hata oluştu.")
                                        }
                                        
                                    }
                                }
                             }
                         }
                     }
                }else{
                    return message.reply("Bunu yapmaya yetkim yok.")
                }
               
            } else {
                return message.reply("Bunu yapmaya yetkiniz yok.")
            }
            break;
            
            



    }
});


bot.on('guildMemberAdd', async member => {
    function memberCounter() {
        var member = bot.guilds.cache.get('405654512963944448');
        var memberCount = member.memberCount;
        return memberCount;
    }

    const channel = member.guild.channels.cache.find(ch => ch.name === '👋hosgeldin-gorusuruz👋');
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./wallpaper.jpg');
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
    memberChannel();

});
bot.on('guildMemberRemove', member => {
    function memberCounter() {
        var member = bot.guilds.cache.get('405654512963944448');
        var memberCount = member.memberCount;
        return memberCount;
    }


    const channel = member.guild.channels.cache.find(ch => ch.name === '👋hosgeldin-gorusuruz👋');

    if (!channel) return;

    channel.send(`${member}, Sunucumuzdan ayrıldı. ` + "Sunucumuzda şu anda " + memberCounter() + " üye var.");

});



bot.login(process.env.token);

