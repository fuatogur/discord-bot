module.exports = {
    name: 'play',
    description: 'play a songr',
    run: async (message,arg) => {
        if (!arg[1]) return message.reply("Lütfen link veya anahtar sözcük/sözcükler girin.");

        if(!message.member.voiceChannel) return message.channel.send("Bir sesli sohbet kanalında bulunmanız gerekir.")
        
    }
}