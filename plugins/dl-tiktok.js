const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "tiktok",
    alias: ["ttdl", "tt", "tiktokdl"],
    desc: "Download TikTok video without watermark",
    category: "downloader",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("`PLEASE PROVIDE A TIKTOK VIDEO LINK🖇️.`");
        if (!q.includes("tiktok.com")) return reply("Invalid TikTok link.");
        
        reply("`Downloading video, please wait...📥🎀`");
        
        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);
        
        if (!data.status || !data.data) return reply("`FAILED TO FETCH TIKTOK VIDEO|❌`.");
        
        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video").org;
        
        const caption = `❑║🎵 *TikTok Video* 🎵\n\n` +
                        `❑║👤 *User:* ${author.nickname} (@${author.username})\n` +
                        `❑║📖 *Title:* ${title}\n` +
                        `❑║👍 *Likes:* ${like}\n💬 *Comments:* ${comment}\n🔁 *Shares:* ${share}`;
        
        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });
        
    } catch (e) {
        console.error("Error in TikTok downloader command:", e);
        reply(`*❌|AN ERROR OCCURRED: ${e.message}*`);
    }
});
          
