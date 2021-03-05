const Discord = require('discord.js');
//RuffLys#1006
exports.run = (client,message,args) => {


const isim = args[0]
if(!isim) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')//RuffLys#1006
    .setTitle(':x: Hata :x:')
    .setDescription('**Kullanım:** İsim,Yaş,Günlük Aktiflik Süresi,Günlük Kaç İnvite Yapabilirsiniz,Sizi Neden Seçelim'))

const yaş = args[1]
if(!yaş) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')//RuffLys#1006
    .setTitle(':x: Hata :x:')
    .setDescription('Yaşını belirtmedin?'))
    
const aktiflik = args[2]
if(!aktiflik) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')//RuffLys#1006
    .setTitle(':x: Hata :x:')
    .setDescription('Günlük Aktiflik süreni belirtmedin?'))

const yetki = args[3]
if(!yetki) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')//RuffLys#1006
    .setTitle(':x: Hata :x:')
    .setDescription('Hangi yetkiyi istediğini belirtmedin?'))

    const inv = args[4]
if(!inv) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')//RuffLys#1006
    .setTitle(':x: Hata :x:')
    .setDescription('Kaç İnvite Yapabileceğini belirtmedin?'))

const ndn = args.slice(5).join(' ')
if(!ndn) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')
    .setTitle(':x: Hata :x:')
    .setDescription('Sizi Neden Seçeceğimizi Yazmadınız belirtmedin?'))


message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')
    .setTitle(':white_check_mark: Başarılı :white_check_mark:')
    .setDescription('Başvurun başarıyla gönderildi!'))


client.channels.get('812789222964592710').send(
    new Discord.RichEmbed()
    .setColor('GREEN')
    .setTitle('Yeni Başvuru!')
    .setAuthor(message.guild.name, message.guild.userURL)
    .setThumbnail(message.author.avatarURL)
      .addField('Başvuruyu Yapan', `**${message.author.tag}**`)
      .addField('İsmi', isim)
      .addField('Yaşı', yaş)
      .addField('Günlük Aktiflik Süresi', aktiflik)
      .addField('Günlük Yapacaığın İnvite', yetki)
      .addField('Nede Onu Seçeceğimiz ', ndn)
    .setFooter(`${message.author.username} Tarafından Başvuruldu`, message.author.avatarURL, `${message.author.Date} Kanalında kullanıldı.`)
    )
    }


exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['başvur'],
	permLevel : 0
}
exports.help = {
	name : 'başvur',
	description : 'Yetkili Başvuru Sistemi',
	usage : 'başvur'
}