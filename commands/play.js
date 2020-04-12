module.exports = {
    name: 'play',
    description: 'play a songr',
    run: async (servers,message,arg) => {
        const ytdl = require("ytdl-core");
        function play(connection,message) {
            var server = servers[message.guild.id];

            server.dispatcher = connection.playStream(ytdl(server.queue[0],{filter: "audioonly"}));

            server.queue.shift();
            
            server.dispatcher.on("end", function(){
                if(server.queue[0]){
                    play(connection,message)
                }else{
                    connection.disconnect();
                }
            })
        }


        if (!arg[1]) return message.channel.send("Lütfen link veya anahtar sözcük/sözcükler girin.");

        if(!message.member.voiceChannel) return message.channel.send("Bir sesli sohbet kanalında bulunmanız gerekir.")

        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue:[]
        }

        var server = servers[message.guild.id];

        server.queue.push(arg[1]);

        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
            play(connection,message);
        })
        
    }
}