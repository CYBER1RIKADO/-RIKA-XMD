const config = require('../config');
const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');

// MP4 video download
// MP4 video download with options
cmd({ 
    pattern: "mp4", 
    alias: ["video"], 
    react: "🎥", 
    desc: "Download YouTube video", 
    category: "main", 
    use: '.mp4 < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }

        let ytmsg = `📹 *𝚅𝙸𝙳𝙴𝙾 𝙳𝙴𝚃𝙰𝚒𝚕𝚂*
║🎬 *тιтℓє* ${yts.title}
║⏳ *∂υяαтιση* ${yts.timestamp}
║👀 *νιωєѕ* ${yts.views}
║👤 *αυтнσя* ${yts.author.name}
║🔗 *ℓιηк* ${yts.url}

*CHOOSE DOWNLOAD FORMAT:*
❑1️⃣. 📄 𝘋𝘖𝘊𝘜𝘔𝘌𝘕𝘛 (no preview)
❑2️⃣. ▶️ 𝘕𝘖𝘔𝘈𝘓 𝘝𝘐𝘋𝘌𝘖 (with preview)

_*𝛲𝛩ꪝ𝛯𝑅𝛯𝐷 𝛣𝑌 𝑆𝐻𝜟𝐌𝐈𝜥𝐀 𝐷𝛯𝚴ꪊꪝ𝜟𝚴*_`;

        let contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363379231303152@newsletter',
                newsletterName: '𝐶𝑌𝛣𝛯𝑅 𝑅𝐼𝜥𝜟𝐷𝛩',
                serverMessageId: 143
            }
        };

        // Send thumbnail with options
        const videoMsg = await conn.sendMessage(from, { image: { url: yts.thumbnail }, caption: ytmsg, contextInfo }, { quoted: mek });

        conn.ev.on("messages.upsert", async (msgUpdate) => {
            const replyMsg = msgUpdate.messages[0];
            if (!replyMsg.message || !replyMsg.message.extendedTextMessage) return;

            const selected = replyMsg.message.extendedTextMessage.text.trim();

            if (
                replyMsg.message.extendedTextMessage.contextInfo &&
                replyMsg.message.extendedTextMessage.contextInfo.stanzaId === videoMsg.key.id
            ) {
                await conn.sendMessage(from, { react: { text: "📥", key: replyMsg.key } });

                switch (selected) {
                    case "1":
                        await conn.sendMessage(from, {
                            document: { url: data.result.download_url },
                            mimetype: "video/mp4",
                            fileName: `${yts.title}.mp4`,
                            contextInfo
                        }, { quoted: replyMsg });
                        break;

                    case "2":
                        await conn.sendMessage(from, {
                            video: { url: data.result.download_url },
                            mimetype: "video/mp4",
                            contextInfo
                        }, { quoted: replyMsg });
                        break;

                    default:
                        await conn.sendMessage(
                            from,
                            { text: "*වැරදි වරදක්. කරුණාකර 1 හෝ 2 යොදන්න.*" },
                            { quoted: replyMsg }
                        );
                        break;
                }
            }
        });

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});

// MP3 song download
cmd({ 
    pattern: "song", 
    alias: ["ytdl3", "play"], 
    react: "🎶", 
    desc: "Download YouTube song", 
    category: "main", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.downloadUrl) {
            return reply("Failed to fetch the audio. Please try again later.");
        }
        
        let ytmsg = `🎵 *𝚂𝙾𝙽𝙶 𝙳𝙴𝚃𝙰𝙸𝙻𝚂*
🎶 *тιтℓє* ${yts.title}
⏳ *∂υяαтιση❯* ${yts.timestamp}
👀 *νιєωѕ❯* ${yts.views}
👤 *αυтнσяѕ❯* ${yts.author.name}
🔗 *ℓιηкє❯* ${yts.url}

*Choose download format:*
1️⃣. 📄 𝘔𝘗3 𝘈𝘚 𝘋𝘖𝘊𝘜𝘔𝘌𝘕𝘛
2️⃣. 🎧 𝘔𝘗3 𝘈𝘚 𝘈𝘜𝘋𝘐𝘖 (Play)
3️⃣. 🎙️ 𝘔𝘗3 𝘈𝘚 𝘝𝘖𝘐𝘊𝘌 𝘕𝘖𝘛𝘌 (PTT)

_*𝛲𝛩ꪝ𝛯𝑅𝛯𝐷 𝛣𝑌 𝑆𝐻𝜟𝐌𝐈𝜥𝐀 𝐷𝛯𝚴ꪊꪝ𝜟𝚴*_`;
        
        let contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363379231303152@newsletter',
                newsletterName: '𝐶𝑌𝛣𝛯𝑅 𝑅𝐼𝜥𝜟𝐷𝛩',
                serverMessageId: 143
            }
        };
        
        // Send thumbnail with caption only
  const songmsg = await conn.sendMessage(from, { image: { url: yts.thumbnail }, caption: ytmsg, contextInfo }, { quoted: mek });

  
     
                     conn.ev.on("messages.upsert", async (msgUpdate) => {
        

                const mp3msg = msgUpdate.messages[0];
                if (!mp3msg.message || !mp3msg.message.extendedTextMessage) return;

                const selectedOption = mp3msg.message.extendedTextMessage.text.trim();

                if (
                    mp3msg.message.extendedTextMessage.contextInfo &&
                    mp3msg.message.extendedTextMessage.contextInfo.stanzaId === songmsg.key.id
                ) {
                
                            
                   await conn.sendMessage(from, { react: { text: "📥", key: mp3msg.key } });

                    switch (selectedOption) {
case "1":   

      
      
   await conn.sendMessage(from, { document: { url: data.result.downloadUrl }, mimetype: "audio/mpeg", fileName: `${yts.title}.mp3`, contextInfo }, { quoted: mp3msg });   
      
      
break;
case "2":   
await conn.sendMessage(from, { audio: { url: data.result.downloadUrl }, mimetype: "audio/mpeg", contextInfo }, { quoted: mp3msg });
break;
case "3":   
await conn.sendMessage(from, { audio: { url: data.result.downloadUrl }, mimetype: "audio/mpeg", ptt: true, contextInfo }, { quoted: mp3msg });
break;


default:
                            await conn.sendMessage(
                                from,
                                {
                                    text: "***වැරදි ඇතුලත් කිරීමකි. කරුණාකර නිවැරදි අංකය ඇතුලත් කරන්න (1 or 2 or 3) 🔴*",
                                },
                                { quoted: mp3msg }
                            );
             }}});
           
    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});
