module.exports = {
        name: 'kick',
        description: 'to kick a member',
        execute(message,arg){
            if (message.deletable) message.delete();
            const toKick = message.mentions.members.first();
            



            if (message.member.hasPermission("KICK_MEMBERS")) {
                if (message.guild.me.hasPermission("KICK_MEMBERS")) {
                    if (!arg[1]) {
                        return message.reply(`Lütfen belirtilen şekilde kullanın \`${prefix}kick @isim sebep \` `)
                    }
                    else {
                        if (!arg[2]) {
                            return message.reply(`Lütfen belirtilen şekilde kullanın \`${prefix}kick @isim sebep \` `)
                        } else {
                            if (!toKick) {
                                return message.reply("Bu kişiyi bulamadım.")
                            }
                            else {
                                if (!toKick.kickable) {
                                    return message.reply("Bu kişiyi maaalesef atamıyorum.")
                                }
                                else {
                                    if (toKick.id === message.author.id) {
                                        return message.reply("Kendini atamazsın.")
                                    } else {
                                        try {
                                            toKick.kick({ reason: arg[2] })
                                            message.channel.send(`${toKick}  adlı kullanıcı \`${message.author.username}\`  tarafından sunucudan atılmıştır.`)
                                        } catch (error) {
                                            message.channel.send("Bir hata oluştu.")
                                        }

                                    }
                                }
                            }
                        }
                    }
                } else {
                    return message.reply("Bunu yapmaya yetkim yok.")
                }

            } else {
                return message.reply("Bunu yapmaya yetkiniz yok.")
            }
        }





}