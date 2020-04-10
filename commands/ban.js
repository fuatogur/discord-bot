module.exports = {
    name: "ban",
    description: "to ban a member",
    execute(message,arg){
        if (message.deletable) message.delete();
            const toBan = message.mentions.members.first();



            if (message.member.hasPermission("BAN_MEMBERS")) {
                if (message.guild.me.hasPermission("BAN_MEMBERS")) {
                    if (!arg[1]) {
                        return message.reply("Lütfen bir kişi belirtin")
                    }
                    else {
                        if (!arg[2]) {
                            return message.reply("Lütfen bir sebep belirtin")
                        } else {
                            if (!arg[3]) {
                                return message.reply("Lütfen bir süre belirtin")
                            } else {
                                if (!toBan) {
                                    return message.reply("Bu kişiyi bulamadım.")
                                }
                                else {
                                    if (!toBan.bannable) {
                                        return message.reply("Bu kişiyi maaalesef yasaklayamıyorum.")
                                    }
                                    else {
                                        if (toBan.id === message.author.id) {
                                            return message.reply("Kendini yasaklayamazsın.")
                                        } else {
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
                } else {
                    return message.reply("Bunu yapmaya yetkim yok.")
                }

            } else {
                return message.reply("Bunu yapmaya yetkiniz yok.")
            }
    }
}