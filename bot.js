//#region 全域變數
const Discord = require('discord.js');
const client  = new Discord.Client();
const auth = require('./JSON/auth.json');
const prefix = require('./JSON/prefix.json');
//#endregion

//#region 登入
client.login(auth.key);

client.on('ready', ()=>{
    console.log(`Logged in as ${client.user.tag}!`);
});
//#endregion

//#region 事件入口
client.on('message', msg => {
    if(msg.member.user.bot) return;

    try{
        var tmpPrefix = -1;
        const prefixED = Object.keys(prefix);
        prefixED.forEach(element => {
            if(msg.content.substring(0,prefix[element].Value.length) === prefix[element].Value){
                tmpPrefix = element;
            }
        });

        if(tmpPrefix === '-1') return;
        else {
            const cmd = msg.content.substring(prefix[tmpPrefix].Value.length).split(' ');
            //功能
            switch(tmpPrefix) {
                case '0':
                    switch(cmd[0]) {
                        case 'ping':
                            msg.channel.send('pong');
                            break;
                        case 'roll':
                            msg.channel.send(Math.floor(Math.random()*6));
                            break;
                    }
                    break;
                case '1':
                    msg.channel.send('music');
                    break;
            }
        }
    }catch(e){
        console.log('OnMessageError', e);
    }
});

//#endregion