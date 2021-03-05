const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    let tag = "ሸ"; // tagınız
    let sunucu = "811668931718021161"; //sunucu ID
    let unregister = message.guild.roles.get("811688760772788330").members;
    let kız = message.guild.roles.get("811691852322308156").members;
    let erkek = message.guild.roles.get("811691785524346940").members;
    let boostcuk = "811683691951816717";
    let boost = message.guild.members.filter(r => r.roles.has(boostcuk)).size;
    
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
      const emoji = client.emojis.find(emoji => emoji.name === "`:flag_tr:");
  const arvelosembed = new Discord.RichEmbed()
  .setDescription("  🤙 **Sunucu İstatistikleri** 🤙  ")
  .addField("⇒Sunucuda bulunan üye sayısı ", message.guild.memberCount)
    .addField("⇒Sunucudaki aktif üye sayısı  ", message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
    .addField("⇒Ses kanallarındaki üye sayısı ", `${count}`)
    .addField("⇒Sunucuyu boostlayan üye sayısı ", boost)
    .addField("⇒Tagımızı alan üye sayısı ",
      message.guild.members.filter(m => m.user.username.includes("ሸ")).size
    ) // tagınız yoksa bu satrı silin
    .addField("⇒Sunucuda bulunan kız üye sayısı ", `${kız.size}`)
    .addField("⇒Sunucuda bulunan erkek üye sayısı ", `${erkek.size}`)
    .addField("⇒Sunucuda bulunan kayıtsız üye sayısı ", `${unregister.size}`)
    .setThumbnail(
      ``)
    .setFooter(client.user.username, message.guild.iconURL);
  message.channel.sendEmbed(arvelosembed)
    message.react(emoji)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'say',
  description: 'kullanıcıyı susturur.',
  usage: 'say'
};