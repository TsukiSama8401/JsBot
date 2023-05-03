//#region 全域變數
require('dotenv').config();
const Discord = require('discord.js');
const client  = new Discord.Client();
const prefix = require('./JSON/prefix.json');
//#endregion

//#region 登入
client.login(process.env.TOKEN);

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
                        case '買拍':
                            Getcha(msg);
                            break;
                        case '數量':
                            Photo(msg, cmd[1]);
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
const choice = ["今天日期/3的餘數",
"目前上班的星辰數量",
"今天上班的星辰數量",
"上次幾張今天就幾張!!",
"星辰指定(請高抬貴手!!)",
"衣服顏色一樣的星辰數",
"現場星辰衣服總共有幾種顏色",
"目前IG限動數量(個人)",
"骰子出場的時刻!!燈~燈~燈~燈燈~",
"抽得不錯，再抽一次!(´･ω･`)",
"今天口渴，再來一杯飲料&再抽一次!",
"還想買拍ㄚ!!渣渣!!乖乖存錢去日本!!",
"下次一定買!嗯，下次一定...",
"0張唷(｡･∀･)ﾉﾞ",
"1張(*^_^*)",
"2張(｡･∀･)ﾉﾞ",
"3張(ﾉ*ФωФ)ﾉ",
"4張(*/ω＼*)",
"5張_(:з)∠)_"];
function Getcha(msg) {
    var no = Math.floor(Math.random()*choice.length);
    return msg.channel.send(choice[no]);
}

function Photo(msg, amount){
    var single = Math.floor(Math.random()*amount);
    console.log(amount);
    return msg.channel.send(single+ '獨照,' + (amount-single) + '合照');
}

