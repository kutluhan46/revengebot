const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.token);



//-----------HG MESAJI-----------//
client.on("guildMemberAdd", (member, message) => {
  if (member.guild.id !== "811668931718021161") return; //sunucu ıd
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;
  let user = client.users.get(member.id);
  require("moment-duration-format");
  let eskiNick = member.user.username;
  const id = "811952042510647336"; //kanal ıd
  const channel = member.guild.channels.get(id);
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
 var kontrol;
  if (gün < 7) kontrol = "FAKE ÜYE!";
  if (gün > 7) kontrol = "Güvenilir Kullanıcı!";
  channel.send(
    ` **WELCOME TO REVENGE  ** \n Hoşgeldin ${member} seninle ${
    member.guild.members.size
    } kişiyiz!  \n  Kaydının yapılması için Kayıt Odalarına Girip Ses Vermeniz Gerekiyor. \n  Hesabın Oluşturulduğu Tarih: ${moment(
      user.createdAt
    ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment(
      user.createdAt
    ).format(
      "YYYY HH:mm:ss"
    )}  \n  **Bu Hesap ${kontrol}**\n <@&815550981172363284> Rolündeki yetkililer sizinle ilgilenecektir.`
  , {files: [``]});
});
//--------OTOROL------//
client.on('guildMemberAdd', member  => {
  let rol = "811688760772788330"//VERİLMESİNİ İSTEDİĞİNİZ ROLÜN İDSİ
  client.channels.get("812025328158638150").send(`${member} Adlı Kullanıya Başarıyla Otorol Verıldı`)
  member.addRole(rol)
})
//-----------ototag-------//
client.on("userUpdate", async (old, nev) => {
  let emingSunucu = "811668931718021161"; //Sunucu 760995291980627988ID
  let emingKanal = "812025328158638150"; //BILGI KANAL ID
  let emingRol = "811691783883980840"; //ROL ID
  let emingTag = 'ሸ'; //TAG
  if (old.username !== nev.username) {
    if (
      nev.username.includes(emingTag) &&
      !client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .roles.has(emingRol)
    ) {
      client.channels
        .get(emingKanal)
        .send(
          ` **${nev}, \`${emingTag}\` Tagını aldı @${emingRol} rolünü kazandı.**`
        );
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .addRole(emingRol);
    }
    if (
      !nev.username.includes(emingTag) &&
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .roles.has(emingRol)
    ) {
      client.guilds
        .get(emingSunucu)
        .members.get(nev.id)
        .removeRole(emingRol);
      client.channels
        .get(emingKanal)
        .send(
          ` **${nev}, \`${emingTag}\` Tagını çıkarttı ${emingRol} rolünü kaybetti.**`
        );
    }
  }
});
////hoşgeldin-dm-mesaj////
client.on('guildMemberAdd', member => {
 member.send(`***Sunucumuza Hoşgeldin Naber Nasılsın İyisindir Umarım \nTagımızı Alarak Bize Destekte Bulunabilirsin \nTag; ሸ`);//istediğiniz mesaj
});  
////////emoji-sa-as//////
client.on('message', async msg => { 
if (msg.content.toLowerCase() === 'sa') { 
await msg.react('🇦'); 
msg.react('🇸');
msg.react('l');
msg.react('m');  
} 
});
//------------------------------DDOS KORUMASI-----------------------------\\
client.on('message', msg => {

if(client.ping > 2500) {

            let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
           let sChannel = msg.guild.channels.find(c => c.name === "log")//Buraya ddos atıldıgında mesaj gitcek kanalı yazın

           sChannel.send(`Sunucu'ya Vuruyorlar \nSunucu Bölgesini Değiştirdim \n __**${yenibölge}**__ :tik: __**Sunucu Pingimiz**__ :`+ client.ping)
           msg.guild.setRegion(yenibölge)
           .then(g => console.log(" bölge:" + g.region))
           .then(g => msg.channel.send("bölge **"+ g.region  + " olarak değişti")) 
           .catch(console.error);
}});
//---------------------------------DDOS KORUMASI-----------------------------\\

 ///KÜFÜR-ENGELLE////
client.on("message", async msg => {
  let a = await db.fetch(`kufur_${msg.guild.id}`)
    if (a == 'acik') {
      const küfür = ["mk", "yavşak", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak","OÇ", "SİKİM", "YARRAK", "ORUSPU ÇOCUĞU", "amk", "AQ", "AWK", "AW", "PİÇ", "SKM", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git"];
        if (küfür.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("MANAGE_GUILD")) {
                  msg.delete();
                          
                    return msg.channel.send(` | ${msg.author} Bu sunucuda götünü versen küfür edemezsin!!`).then(msg => msg.delete(10000));
            }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!a) return;
          });     
//////////////////////////////BotAtack/////////////////////////////////////////////////
/*
client.on('guildMemberAdd', (member) => {
    const guild = member.guild;


 let sChannel = member.guild.channels.find(c => c.name === 'mod-log')

    if(member.user.bot !==true){

    } 
    else {

    sChannel.send(`** Bot Koruma Sistemi **
Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Banlandı
Banlanan Bot: **${member.user.tag}**
@everyone`)
    .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
       member.ban(member) 
  }  
  });


//////////////////////////////BotAtack/////////////////////////////////////////////////
////////KANAL-KORUMA////
client.on("channelDelete", async channel => {
  let guild = channel.guild;
  const logs = await channel.guild.fetchAuditLogs({ type: 'mod-log' })
  let member = guild.members.get(logs.entries.first().executor.id);
  if(!member) return;
  channel.clone(channel.name, true, true, "Kanal silme koruması sistemi").then(async klon => {
    await klon.setParent(channel.parent);
    await klon.setPosition(channel.position);
  })
})
*/
///////KANAL-KORUMA/////
///////MESAJ-LOG///
client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
  
  if (message.author.bot) return;
  
  var user = message.author;
  
  let sChannel2 = message.guild.channels.find(c => c.name === "log")
  const embed = new Discord.RichEmbed()
  .setColor("RED")
  .setAuthor(`Mesaj silindi.`, message.author.avatarURL)
  .addField("Kullanıcı Tag", message.author.tag, true)
  .addField("Kanal Adı", message.channel.name, true)
  .addField("Silinen Mesaj", "```" + message.content + "```")
  .setThumbnail(message.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${message.createdAt.getHours()+3}:${message.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel2.send(embed);
  
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannel3 = newMessage.guild.channels.find(c => c.name === "log")
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
  .addField("Kullanıcı", newMessage.author)
  .addField("Eski Mesaj", oldMessage.content, true)
  .addField("Yeni Mesaj", newMessage.content, true)
  .addField("Kanal Adı", newMessage.channel.name, true)
  .setThumbnail(newMessage.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel3.send(embed)
});
//////MESAJ-LOG//////
//--------afk-----//
client.on('message', async message => {  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let sebep = afkkullanıcı
 
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
  
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
    if (afkkullanıcı) return message.channel.send(`${message.author}\`${kullanıcı.tag}\` şu anda AFK. \n Sebep : \`${sebep}\``)
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
  }
});
///sa-as
client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa') {
        msg.reply(`Ve Aleyküm Selam, hoş geldin!`);      
      } 
      }
    });
 