module.exports = {
    name: "poll",
    description: "to make a poll",
    async execute(message,arg){
        const Discord = require("discord.js")
        if (message.member.hasPermission("ADD_REACTIONS")) {
            const PollEmbed = new Discord.MessageEmbed()
                .setColor(0xffff00)
                .setTitle("Oylama Menüsü");

            if (!arg[1]) {
                message.channel.send(PollEmbed);
                return;
            }
            let msgArgs = arg.slice(1).join(" ");
            const EmbedPoll = new Discord.MessageEmbed()
                .setColor(0xffff00)
                .setTitle("Oylama Menüsü")
                .addField("Oy", msgArgs);

            message.channel.send(EmbedPoll).then(messageReaction => {
                messageReaction.react("👍");
                messageReaction.react("👎");
                message.delete({timeout: 3000}).catch(console.error)
            })
        }else{
            if(message.deletable) message.delete()
        }

    }
}