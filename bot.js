//#region 全域變數
require('dotenv').config();
const Discord = require('discord.js');
const client  = new Discord.Client();
const prefix = require('./JSON/prefix.json');
const choice = ["今天日期/3的餘數",
"目前上班的星辰數量",
"今天上班的星辰數量",
"上次幾張今天就幾張!!",
"星辰指定(請高抬貴手!!)",
"衣服顏色一樣的星辰數",
"現場星辰衣服總共有幾種顏色",
"目前IG限動數量(個人)",
"自己推的可愛程度 (0~3張",
"骰子の出場時刻!!燈~燈~燈~燈燈~",
"抽得不錯，再抽一次!(´･ω･`)",
"今天口渴，再來一杯飲料&再抽一次!",
"表演一次再加一張拍(*´ω`)人(´ω`*)",
"還想買拍ㄚ!!渣渣!!乖乖存錢去日本!!",
"下次一定買!嗯，下次一定...",
"1張(*^_^*)",
"2張(｡･∀･)ﾉﾞ",
"3張(ﾉ*ФωФ)ﾉ",
"4張(*/ω＼*)",
"5張_(:з)∠)_",
"撲克牌一套(☆▽☆)"];
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
        var tmpPrefix = '-1';
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

                        case '機率':
                            msg.channel.send('忘了');
                            break;

                        case '選項':
                            msg.channel.send(choice.join(', '));
                            break;
                            
                        case '指令':
                            msg.channel.send('買拍, 數量(記得加數字), 選項, roll');
                            break;
                        
                        case '呱':
                            msg.channel.send('我的屁股很好用!');
                            break;
                    }
                    break;
            }
        }
    }catch(e){
        console.log('OnMessageError', e);
    }
});
//#endregion
var choiceWeight = [290,290,290,290,290,290,290,290,290,100,500,100,80,500,500,2500,2000,1000,100,8,2];
function weightedRandom(items, itemsWeight)
{
    var totalWeight=eval(itemsWeight.join("+"));
    var randomArray=[];
    for(var i=0; i<items.length; i++)
    {
        for(var j=0; j<itemsWeight[i]; j++)
        {
            randomArray.push(i);
        }
    }
    var randomNumber=Math.floor(Math.random()*totalWeight);
    return items[randomArray[randomNumber]];
}

function Getcha(msg) {
    return msg.channel.send(weightedRandom(choice, choiceWeight));
}

function Photo(msg, amount){
    const photo = ['獨照', '合照'];
    var photoWeight = [7, 3];
    console.log(amount);
    var result = [];
    for(var i=0; i < amount; i++)
    {
        var random = weightedRandom(photo, photoWeight);
        result.push(random);
    }
    var count = 0;
    result.filter(function condition(element){
        if(element === '獨照')
            count += 1;
    });
    return msg.channel.send(count + "獨照, " + (amount-count) + "合照");
}

