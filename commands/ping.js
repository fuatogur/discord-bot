module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    run: async (bot, message, args) => {
        const msg = await message.channel.send(`🏓 Hesaplanıyor....`);

        msg.edit(`🏓 Pong!
        Gecikme : ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms
        API Gecikme : ${Math.round(bot.ping)}ms`);
    }
}
