module.exports = {
    name: "profile",
    description: "to see your profile",
    execute(message){
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
    }
}