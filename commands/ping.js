module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    run: async (bot, message, args) => {
        const msg = await message.channel.send(`🏓 Hesaplanıyor....`);

        msg.edit(`🏓 Pong!
        Latency is ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms
        API Latency is ${Math.round(bot.ping)}ms`);
    }
}
