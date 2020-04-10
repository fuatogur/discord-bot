module.exports = {
    name: "clear",
    description: "to clear messages",
    execute(message,arg){
        message.delete();
        if (message.member.hasPermission("BAN_MEMBERS")) {
            if (!arg[1]) {
                message.reply("Lütfen sayı belirtin!")
            } else {
                message.channel.bulkDelete(arg[1]);
                message.channel.send("Son " + arg[1] + " mesaj silindi.")
            }
        } else {
            message.channel.send("Böyle bir yetkiniz yok")
        }
    }
}