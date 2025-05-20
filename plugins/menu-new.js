const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "menu",
    desc: "Show interactive menu system",
    category: "menu",
    react: "🧾",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const menuCaption = `╭━━━〔 *${config.BOT_NAME}* 〕━━━┈⊷⭖
┃߷╭──────────────⭖
┃߷│ 👑 OᗯᑎEᖇ : *${config.OWNER_NAME}*
┃߷│ 🤖 𝙱𝙰𝙸𝙻𝙴𝚈𝚂 : *Multi Device*
┃߷│ 💻 亇𝑌𝛲𝛯 : *NodeJs*
┃߷│ 🚀 𝙿𝙻𝙰𝚝𝙵𝚁𝙾𝙼 : *Heroku*
┃߷│ ⚙️ 𝛭𝛩𝐷𝛯 : *[${config.MODE}]*
┃߷│ 🔣 𝙿𝚁𝙴𝙵𝙸𝚇 : *[${config.PREFIX}]*
┃߷│ 🏷️ ᴠɪʀꜱɪᴏɴ : *4.0.0 Bᴇᴛᴀ*
┃߷╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
❒ *ᴛʜᴇ ʀɪᴋᴀ xᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ*
❒ *24 ʜᴏᴜʀꜱ ᴏɴʟɪɴᴇ ᴡᴏʀᴋɪɴɢ*
╭━━〔 *𝛭𝛯𝚴び 𝐿𝐼𝑆亇* 〕━━┈⊷
┃❍╭─────────────·๏
┃❍│1️⃣ ✓ 📥➢ *𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔*
┃❍│2️⃣ ✓ 👥➢ *𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔*
┃❍│3️⃣ ✓ 😄➢ *𝐅𝐔𝐍 𝐌𝐄𝐍𝐔*
┃❍│4️⃣ ✓ 👑➢ *𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔*
┃❍│5️⃣ ✓ 🤖➢ *𝐀𝐈 𝐌𝐄𝐍𝐔*
┃❍│6️⃣ ✓ 🎎➢ *𝐀𝐍𝐈𝐌𝐄 𝐌𝐄𝐍𝐔*
┃❍│7️⃣ ✓ 🔄➢ *𝐂𝐎𝐍𝐕𝐄𝐑𝐓 𝐌𝐄𝐍𝐔*
┃❍│8️⃣ ✓ 📌➢ *𝐎𝐓𝐇𝐄𝐑 𝐌𝐄𝐍𝐔*
┃❍│9️⃣ ✓ 💞➢ *𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍𝐒 𝐌𝐄𝐍𝐔*
┃❍│🔟 ✓ 🏠➢ *𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔*
┃❍╰───────────┈⊷⭖
╰──────────────┈⊷⭖
> ${config.DESCRIPTION}`;

        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363379231303152@newsletter',
                newsletterName: config.OWNER_NAME,
                serverMessageId: 143
            }
        };

        // Function to send menu image with timeout
        const sendMenuImage = async () => {
            try {
                return await conn.sendMessage(
                    from,
                    {
                        image: { url: config.MENU_IMAGE_URL ||'https://files.catbox.moe/5umrna.jpg' },
                        caption: menuCaption,
                        contextInfo: contextInfo
                    },
                    { quoted: mek }
                );
            } catch (e) {
                console.log('Image send failed, falling back to text');
                return await conn.sendMessage(
                    from,
                    { text: menuCaption, contextInfo: contextInfo },
                    { quoted: mek }
                );
            }
        };

        // Function to send menu audio with timeout
        const sendMenuAudio = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay after image
                await conn.sendMessage(from, {
                    audio: { url: 'https://github.com/rrrrrrrrrr2008/Tt/raw/refs/heads/main/%23dj%20%23remix%20%23funny%20%23comedy%20%23video%20%23viralvideo%20%23love%20%23song%20@knockoutofficial2.mp3' },
                    mimetype: 'audio/mp4',
                    ptt: true,
                }, { quoted: mek });
            } catch (e) {
                console.log('Audio send failed, continuing without it');
            }
        };

        // Send image first, then audio sequentially
        let sentMsg;
        try {
            // Send image with 10s timeout
            sentMsg = await Promise.race([
                sendMenuImage(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Image send timeout')), 10000))
            ]);
            
            // Then send audio with 1s delay and 8s timeout
            await Promise.race([
                sendMenuAudio(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Audio send timeout')), 8000))
            ]);
        } catch (e) {
            console.log('Menu send error:', e);
            if (!sentMsg) {
                sentMsg = await conn.sendMessage(
                    from,
                    { text: menuCaption, contextInfo: contextInfo },
                    { quoted: mek }
                );
            }
        }
        
        const messageID = sentMsg.key.id;

        // Menu data (complete version)
        const menuData = {
            '1': {
                title: "📥 *𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔* 📥",
                content: `╭━━━〔 *𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔* 〕━━━┈⊷
┃╭──────────────
┃❥│ 🌐 *ѕσ¢ιαℓ мє∂ια*
┃❥│ • ꜰᴀᴄᴇʙᴏᴏᴋ [url]
┃❥│ • ᴍᴇᴅᴇᴀꜰɪʀᴇmediafire [url]
┃❥│ • ᴛɪᴋᴛᴏᴋ [url]
┃❥│ • ᴛɪᴡɪᴛᴛᴇʀ [url]
┃❥│ • ɪɴᴀꜱᴛᴀ [url]
┃❥│ • ᴀᴘᴋ [app]
┃❥│ • ɪᴍɢᴇ [query]
┃❥│ • ᴛᴛ2 [url]
┃❥│ • ᴘɪɴꜱ [url]
┃❥│ • ᴀᴘᴋ2 [app]
┃❥│ • ꜰʙ2 [url]
┃❥│ • ᴘɪɴᴛᴇʀᴇꜱᴛ [url]
┃❥╰──────────────
┃❥╭──────────────
┃❥│ 🎵 *𝐌𝐔𝐒𝐈𝐂/𝐕𝐈𝐃𝐄𝐎*
┃❥│ • ꜱᴘᴏᴛɪꜰʏ [query]
┃❥│ • ᴘʟᴀʏ [song]
┃❥│ • ᴘʟᴀʏ2-10 [song]
┃❥│ • ᴀᴜᴅɪᴏ [url]
┃❥│ • ᴠɪᴅᴇᴏ [url]
┃❥│ • ᴠɪᴅᴇᴏ2-10 [url]
┃❥│ • ʏᴛᴍᴘ3 [url]
┃❥│ • ʏᴛᴍᴘ4 [url]
┃❥│ • ꜱᴏɴɢ [name]
┃❥│ • ᴅᴀʀᴀᴍᴀ [name]
┃❥╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                image: true
            },
            '2': {
                title: "👥 *𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔* 👥",
                content: `╭━━━〔 *𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔* 〕━━━┈⊷
┃✰╭──────────────
┃✰│ 🛠️ *𝐌𝐀𝐍𝐀𝐆𝐄𝐌𝐄𝐍𝐓*
┃✰│ • ɢʀᴏᴜᴘʟɪɴᴋ
┃✰│ • ᴋɪᴄᴋᴀʟʟ
┃✰│ • ᴋɪᴄᴋᴀʟʟ2
┃✰│ • ᴋɪᴄᴋᴀʟʟ3
┃✰│ • ᴀᴅᴅ @user
┃✰│ • ʀᴇᴍᴏᴠᴇ @user
┃✰│ • ᴋɪᴄᴋ @user
┃✰╰──────────────
┃✰╭──────────────
┃✰│ ⚡ *𝐀𝐃𝐌𝐈𝐍 𝐓𝐎𝐎𝐋*
┃✰│ • ᴘʀᴇᴍᴏᴛᴇ @user
┃✰│ • ᴅᴇᴍᴏᴛᴇ @user
┃✰│ • ᴅɪꜱᴍɪꜱꜱ 
┃✰│ • ʀᴇᴠᴏᴋᴇ
┃✰│ • ᴍᴜᴛᴇ [time]
┃✰│ • ᴜɴᴍɪᴛᴇ
┃✰│ • ʟᴏᴄᴋɢᴄ
┃✰│ • ᴜɴʟᴏᴄᴋɢᴄ
┃✰╰──────────────
┃✰╭──────────────
┃✰│ 🏷️ *𝐓𝐀𝐆𝐆𝐍𝐈𝐆*
┃✰│ • ᴛᴀɢ @user
┃✰│ • ʜɪᴅᴇᴛᴀɢ [msg]
┃✰│ • ᴛᴀɢᴀʟʟ
┃✰│ • ᴛᴀꜰᴀᴅᴍɪɴꜱ
┃✰│ • ɪɴᴠɪᴛᴇ
┃✰╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                image: true
            },
            '3': {
                title: "😄 *𝐅𝐔𝐍 𝐌𝐄𝐍𝐔* 😄",
                content: `╭━━━〔 *𝐅𝐔𝐍 𝐌𝐄𝐍𝐔* 〕━━━┈⊷
┃❁╭──────────────
┃❁│ 🎭 *𝐈𝐍𝐓𝐄𝐑𝐀𝐂𝐓𝐈𝐕𝐄*
┃❁│ • ꜱʜᴀᴘᴀʀ
┃❁│ • ʀᴀᴛᴇr @user
┃❁│ • ɪɴꜱᴜʟᴛ @user
┃❁│ • ʜᴀᴄᴋ @user
┃❁│ • ꜱʜɪᴘ @user1 @user2
┃❁│ • ᴄʜᴀʀᴀᴄᴛᴇʀ
┃❁│ • ᴘɪᴄᴋᴜᴘ
┃❁│ • ᴊᴏᴋᴇ
┃❁╰──────────────
┃❁╭──────────────
┃✪│ 😂 *𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍𝐒*
┃❁│ • ʜʀᴛ
┃❁│ • ʜᴘʏ
┃❁│ • ꜱʏᴅ
┃❁│ • ᴀɴɢᴇʀ
┃❁│ • ꜱʜʏ
┃❁│ • ᴋɪꜱꜱ
┃❁│ • ᴍᴏɴ
┃❁│ • ᴄᴜɴꜰᴜᴢᴇᴅ
┃❁╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                image: true
            },
            '4': {
                title: "👑 *𝐎𝐍𝐖𝐄𝐑 𝐌𝐄𝐍𝐔* 👑",
                content: `╭━━━〔 *𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔* 〕━━━┈⊷
┃✿╭──────────────
┃✿│ ⚠️ *𝐑𝐄𝐒𝐓𝐑𝐈𝐂𝐓𝐄𝐃*
┃✿│ • ʙʟᴏᴄᴋ @user
┃✿│ • ᴜɴʙʟᴏᴄᴋ @user
┃✿│ • ꜰᴜʟʟᴘᴘ [img]
┃✿│ • ꜱᴇᴛᴘᴘ [img]
┃✿│ • ʀᴇꜱᴛᴀʀᴛ
┃✿│ • ꜱʜᴜᴛᴅᴏᴡɴ
┃✿│ • ᴜᴘᴅᴀᴛᴇᴄᴍᴅ
┃✿╰───────────���──
┃✿╭──────────────
┃✿│ ℹ️ *𝐈𝐍𝐅𝐎 𝐓𝐎𝐎𝐋*
┃✿│ • ɢᴊɪᴅ
┃✿│ • ᴊɪᴅ @user
┃✿│ • ʟɪꜱᴛᴄᴍᴅ
┃✿│ • ʙʀᴏᴀᴅᴄᴀꜱᴛ
┃✿╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                image: true
            },
            '5': {
                title: "🤖 *𝐀𝐈 𝐌𝐄𝐍𝐔* 🤖",
                content: `╭━━━〔 *𝐀𝐈 𝐌𝐄𝐍𝐔* 〕━━━┈⊷
┃♡╭──────────────
┃♡│ 💬 *𝐂𝐇𝐀𝐓 𝐀𝐈*
┃♡│ • ᴀɪ [query]
┃♡│ • ɢᴘᴛ3 [query]
┃♡│ • ɢᴘᴛ2 [query]
┃♡│ • ɢᴘᴛᴍɪɴɪ [query]
┃♡│ • ɢᴘᴛ [query]
┃♡│ • ᴍᴇᴛᴀ [query]
┃♡╰──────────────
┃♡╭──────────────
┃♡│ 🖼️ *𝐈𝐌𝐀𝐆𝐄 𝐀𝐈*
┃♡│ • imagine [text]
┃♡│ • imagine2 [text]
┃♡│ • rw [wallpaper nema]
┃♡╰──────────────
┃♡╭──────────────
┃♡│ 🔍 *𝐒𝐏𝐄𝐂𝐈𝐀𝐋𝐈𝐙𝐄𝐃*
┃♡│ • ʙʟᴀᴄᴋʙᴏᴢ [query]
┃♡│ • ʟᴜᴍᴀ [query]
┃♡│ • ᴅᴊ [query]
┃♡╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                image: true
            },
            '6': {
                title: "🎎 *𝐀𝐍𝐈𝐌𝐄 𝐌𝐄𝐍𝐔* 🎎",
                content: `╭━━━〔 *𝐀𝐍𝐈𝐌𝐄 𝐌𝐄𝐍𝐔* 〕━━━┈⊷
┃✪╭──────────────
┃✪│ 🖼️ *𝐈𝐌𝐀𝐆𝐄𝐒*
┃✪│ • ꜰᴀᴄᴋ
┃✪│ • ʙᴏɢ
┃✪│ • ᴀᴡᴏᴏ
┃✪│ • ɢᴀʀʟ
┃✪│ • ᴡᴀɪꜰᴜ
┃✪│ • ɴᴇᴋᴏ
┃✪│ • ᴍᴇɢɴᴜᴍɪɴ
┃✪│ • ᴍᴀɪᴅ
┃✪│ • ʟᴏʟɪ
┃✪╰──────────────
┃✪╭──────────────
┃✪│ 🎭 *𝐂𝐇𝐀𝐑𝐀𝐓𝐄𝐑𝐒*
┃✪│ • ᴀɴɪᴍᴇɢɪʀʟ
┃✪│ • ᴀɴɪᴍᴇɢɪʀʟ1-5
┃✪│ • ᴀɴɪᴍᴇ1-5
┃✪│ • ꜰᴏxɢɪʀʟ
┃✪│ • ɴᴀʀᴜᴛᴏɴ
┃✪╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                image: true
            },
            '7': {
                title: "🔄 *𝐂𝐎𝐍𝐕𝐄𝐑𝐓 𝐌𝐄𝐍𝐔* 🔄",
                content: `╭━━━〔 *𝐂𝐎𝐍𝐕𝐄𝐑𝐓 𝐌𝐄𝐍𝐔* 〕━━━┈⊷
┃ஃ╭──────────────
┃ஃ│ 🖼️ *𝐌𝐄𝐃𝐈𝐀*
┃ஃ│ • ꜱᴛɪᴄᴋᴇʀ [img]
┃ஃ│ • ꜱᴛɪᴄᴋᴇʀ2 [img]
┃ஃ│ • ᴇᴍᴏᴊɪᴍɪx 😎+😂
┃ஃ│ • ᴛᴀᴋᴇ [name,text]
┃ஃ│ • ᴛᴏᴍᴘ3 [video]
┃ஃ╰──────────────
┃ஃ╭──────────────
┃ஃ│ 📝 *𝐓𝐄𝐗𝐓*
┃ஃ│ • ꜰᴀɴᴄʏ [text]
┃ஃ│ • ᴛᴛꜱ [text]
┃ஃ│ • ᴛʀᴛ [text]
┃ஃ│ • ʙᴀꜱᴇ64 [text]
┃ஃ│ • ᴜɴʙᴇᴀꜱᴇ [text]
┃ஃ╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                image: true
            },
            '8': {
                title: "📌 *𝐎𝐓𝐇𝐄𝐑 𝐌𝐄𝐍𝐔* 📌",
                content: `╭━━━〔 *𝐎𝐓𝐇𝐄𝐑 𝐌𝐄𝐍𝐔* 〕━━━┈⊷
┃✞╭──────────────
┃✞│ 🕒 *𝐔𝐓𝐈𝐋𝐈𝐓𝐈𝐄𝐒*
┃✞│ • ᴛɪᴍᴇɴᴏᴡ
┃✞│ • ᴅᴀᴛᴇ
┃✞│ • ᴄᴏᴜɴᴛ [num]
┃✞│ • ᴄᴀʟᴄᴜʟᴀᴛᴇ [expr]
┃✞│ • ᴄᴏᴜɴᴛx
┃✞╰──────────────
┃✞╭──────────────
┃✞│ 🎲 *𝐑𝐀𝐍𝐃𝐎𝐌*
┃✞│ • ꜰɪʟᴘ
┃✞│ • ᴄᴏɪɴꜰʟɪᴘ
┃✞│ • ʀᴇᴄᴏʟᴏʀ
┃✞│ • ʀᴏʟʟ
┃✞│ • ꜰᴀᴄ5
┃✞╰──────────────
┃✞╭──────────────
┃✞│ 🔍 *𝐒𝐄𝐀𝐑𝐂𝐇*
┃✞│ • ᴅᴇꜰɪɴᴇ [word]
┃✞│ • ɴᴇᴡꜱ 
┃✞│ • ᴍᴏᴠɪᴇ[name]
┃✞│ • ᴡᴇᴀᴛʜᴇʀ [loc]
┃✞╰──────────────
┃✞╭──────────────
┃࿇│ 🔍 *𝐒𝐄𝐓𝐓𝐈𝐍𝐆*
┃✞│ • ꜱᴇᴠᴀ
┃✞│ • ᴇɴᴠ
┃✞│ • 
┃✞│ • 
┃✞╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                image: true
            },
            '9': {
                title: "💞 *𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍𝐒 𝐌𝐄𝐍𝐔* 💞",
                content: `╭━━━〔 *𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍𝐒 𝐌𝐄𝐍𝐔* 〕━━━┈⊷
┃✤╭──────────────
┃✤│ ❤️ *𝐀𝐅𝐅𝐄𝐂𝐓𝐈𝐎𝐍*
┃✤│ • ᴄᴜᴅᴅʟᴇ@user
┃✤│ • ʜᴜɢ @user
┃✤│ • ᴋɪꜱꜱ @user
┃✤│ • ʟɪᴄᴋ @user
┃✤│ • ᴘᴀᴛ @user
┃✤╰──────────────
┃✤╭──────────────
┃✤│ 😂 *𝐅𝐔𝐍𝐍𝐘*
┃✤│ • ʙᴜʟʟʏ @user
┃✤│ • ʙᴏɴᴋ @user
┃✤│ • ʏᴇᴇᴛ@user
┃✤│ • ꜱʟᴀᴘ @user
┃✤│ • ᴋɪʟʟ @user
┃✤╰──────────────
┃✤╭──────────────
┃✤│ 😊 *𝐄𝐗𝐏𝐑𝐄𝐒𝐒𝐈𝐎𝐍𝐒*
┃✤│ • ʙʟᴜꜱʜ @user
┃✤│ • ꜱᴍɪʟᴇ@user
┃✤│ • ʜᴀᴘᴘʏ@user
┃✤│ • ᴡɪɴᴋ @user
┃✤│ • ᴘᴏᴋᴇ @user
┃✤╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                image: true
            },
            '10': {
                title: "🏠 *𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔* 🏠",
                content: `╭━━━〔 *𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔* 〕━━━┈⊷
┃⁂╭──────────────
┃⁂│ ℹ️ *Bot Info*
┃⁂│ • ᴘɪɴɢ
┃⁂│ • ʟɪᴠᴇ
┃⁂│ • ᴀʟɪᴠᴇ
┃⁂│ • ʀᴜɴᴛɪᴍᴇ
┃⁂│ • ᴜᴘᴛɪᴍᴇ
┃⁂│ • ʀᴇᴘᴏ
┃⁂│ • ᴏᴡɴᴇʀ
┃⁂╰──────────────
┃⁂╭──────────────
┃⁂│ 🛠️ *Controls*
┃⁂│ • ʀᴇꜱᴛᴀʀᴛ
┃⁂╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                image: true
            }
        };

        // Message handler with improved error handling
        const handler = async (msgData) => {
            try {
                const receivedMsg = msgData.messages[0];
                if (!receivedMsg?.message || !receivedMsg.key?.remoteJid) return;

                const isReplyToMenu = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;
                
                if (isReplyToMenu) {
                    const receivedText = receivedMsg.message.conversation || 
                                      receivedMsg.message.extendedTextMessage?.text;
                    const senderID = receivedMsg.key.remoteJid;

                    if (menuData[receivedText]) {
                        const selectedMenu = menuData[receivedText];
                        
                        try {
                            if (selectedMenu.image) {
                                await conn.sendMessage(
                                    senderID,
                                    {
                                        image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/k9ighj.jpg' },
                                        caption: selectedMenu.content,
                                        contextInfo: contextInfo
                                    },
                                    { quoted: receivedMsg }
                                );
                            } else {
                                await conn.sendMessage(
                                    senderID,
                                    { text: selectedMenu.content, contextInfo: contextInfo },
                                    { quoted: receivedMsg }
                                );
                            }

                            await conn.sendMessage(senderID, {
                                react: { text: '✅', key: receivedMsg.key }
                            });

                        } catch (e) {
                            console.log('Menu reply error:', e);
                            await conn.sendMessage(
                                senderID,
                                { text: selectedMenu.content, contextInfo: contextInfo },
                                { quoted: receivedMsg }
                            );
                        }

                    } else {
                        await conn.sendMessage(
                            senderID,
                            {
                                text: `❌ *Invalid Option!* ❌\n\nPlease reply with a number between 1-10 to select a menu.\n\n*Example:* Reply with "1" for Download Menu\n\n> ${config.DESCRIPTION}`,
                                contextInfo: contextInfo
                            },
                            { quoted: receivedMsg }
                        );
                    }
                }
            } catch (e) {
                console.log('Handler error:', e);
            }
        };

        // Add listener
        conn.ev.on("messages.upsert", handler);

        // Remove listener after 5 minutes
        setTimeout(() => {
            conn.ev.off("messages.upsert", handler);
        }, 300000);

    } catch (e) {
        console.error('Menu Error:', e);
        try {
            await conn.sendMessage(
                from,
                { text: `❌ Menu system is currently busy. Please try again later.\n\n> ${config.DESCRIPTION}` },
                { quoted: mek }
            );
        } catch (finalError) {
            console.log('Final error handling failed:', finalError);
        }
    }
});
