const { cmd } = require("../command");
const axios = require("axios");

cmd({
    pattern: "img",
    alias: ["image", "googleimage", "searchimg"],
    react: "🦋",
    desc: "Search and download Google images",
    category: "fun",
    use: ".img <keywords>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("*🖼️ PLEASE PROVIDE A SEARCH QUERY\nExample: .img cute cats*");
        }

        await reply(`🔍 Searching images for "${query}"...`);

        const url = `https://apis.davidcyriltech.my.id/googleimage?query=${encodeURIComponent(query)}`;
        const response = await axios.get(url);

        // Validate response
        if (!response.data?.success || !response.data.results?.length) {
            return reply("*❌|NO IMAGES FOUND. TRY DIFFERENT KEYWORDS*");
        }

        const results = response.data.results;
        // Get 5 random images
        const selectedImages = results
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        for (const imageUrl of selectedImages) {
            await conn.sendMessage(
                from,
                { 
                    image: { url: imageUrl },
                    caption: `📷 Result for: ${query}\n> 𝛲𝛩ꪝ𝛯𝑅𝛯𝐷 𝛣𝑌 𝐶𝑌𝛣𝛯𝑅 𝑅𝐼𝜥𝜟𝐷𝛩`
                },
                { quoted: mek }
            );
            // Add delay between sends to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    } catch (error) {
        console.error('Image Search Error:', error);
        reply(`❌ Error: ${error.message || "Failed to fetch images"}`);
    }
});
