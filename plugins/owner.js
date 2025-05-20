const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "✅", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER; // Fetch owner number from config
        const ownerName = config.OWNER_NAME;     // Fetch owner name from config

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Send the vCard
        const sentVCard = await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send the owner contact message with image and audio
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/cm5p72.jpg' }, // Image URL from your request
            caption: `╭━━〔 *𝐑𝙸к𝘈 𝕏ᴍ𝗗* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *HERE IS THE OWNER DETAILS*
┃◈┃• *Name* - ${ownerName}
┃◈┃• *Number* 94766619363
┃◈└───────────┈⊷
╰──────────────┈⊷
*𝑅𝐈𝜥𝐀 𝛸𝐌𝐃 𝛩ꪝ𝐍𝛯𝐑 𝐁𝑌 𝑆𝐻𝜟𝐌𝐈𝜥𝐀 𝐷𝛯𝚴ꪊꪝ𝜟𝚴*`, // Display the owner's details
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363379231303152@newsletter',
                    newsletterName: '𝗦𝗛𝗔𝗠𝗜𝗞𝗔 𝗗𝗘𝗡𝗨𝗪𝗔𝗡',
                    serverMessageId: 143
                }            
            }
        }, { quoted: mek });

        // Send audio as per your request
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/XdTechPro/KHAN-DATA/raw/refs/heads/main/autovoice/menunew.m4a' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});
