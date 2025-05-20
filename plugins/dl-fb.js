const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename,
  use: "<Facebook URL>",
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    // Check if a URL is provided
    if (!q || !q.startsWith("http")) {
      return reply("*`Need a valid Facebook URL`*\n\nExample: `.fb https://www.facebook.com/...`");
    }

    // Add a loading react
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Fetch video URL from the API
    const apiUrl = `https://www.velyn.biz.id/api/downloader/facebookdl?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!data.status || !data.data || !data.data.url) {
      return reply("`❒ ❌ Failed to fetch the video. Please try another link.`");
    }

    // Send the video to the user
    const videoUrl = data.data.url;
    await conn.sendMessage(from, {
      video: { url: videoUrl },
      caption: "📥 *FACEBOOK VIDEO DOWNLOADED*\n\n- > 𝛲𝛩ꪝ𝛯𝑅𝛯𝐷 𝛣𝑌 𝐶𝑌𝛣𝛯𝑅 𝑅𝐼𝜥𝜟𝐷𝛩 ✅",
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    reply("*❌|ERROR FETCHING THE VIDEO. PLEASE TRY AGAIN.*");
  }
});
