module.exports = {
    name: 'play',
    description: 'play a songr',
    run: async (message,arg) => {
        if (!arg[1]) return message.reply("Lütfen link veya anahtar sözcük/sözcükler girin.")
        
    }
}