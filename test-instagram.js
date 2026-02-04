
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env.local manually since we are running a standalone script
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const TOKEN = process.env.IG_ACCESS_TOKEN;
const TEST_URL = 'https://www.instagram.com/p/DUIyoyPiKWD/'; // One of the user's links

console.log('\\n🧪 --- STARTING INSTAGRAM API DIAGNOSIS ---');

if (!TOKEN) {
    console.error('❌ ERROR: IG_ACCESS_TOKEN not found in .env.local');
    process.exit(1);
}

console.log('✅ Token found:', TOKEN.substring(0, 10) + '...');

async function testConnection() {
    try {
        // 1. Test "Me" (Who owns this token?)
        console.log('\\n1️⃣  Testing Token Identity (Basic Display)...');
        const meRes = await fetch(`https://graph.instagram.com/me?fields=id,username,account_type&access_token=${TOKEN}`);
        const meData = await meRes.json();

        if (meData.error) {
            console.error('❌ Token Identity Failed:', meData.error.message);
        } else {
            console.log('✅ Token Account:', meData.username);
            console.log('ℹ️  Account Type:', meData.account_type);
        }

        // 2. Test oEmbed (Can we fetch the link?)
        console.log('\\n2️⃣  Testing oEmbed (Curated Post Fetch)...');
        const oembedUrl = `https://graph.facebook.com/v22.0/instagram_oembed?url=${encodeURIComponent(TEST_URL)}&access_token=${TOKEN}&hidecaption=1&maxwidth=600&omitscript=1`;

        const oembedRes = await fetch(oembedUrl);
        const oembedData = await oembedRes.json();

        if (oembedRes.ok) {
            console.log('✅ oEmbed SUCCESS!');
            console.log('   Title:', oembedData.title);
            console.log('   Author:', oembedData.author_name);
            console.log('   Thumbnail:', oembedData.thumbnail_url ? 'Yes' : 'No');
        } else {
            console.error('❌ oEmbed FAILED:', oembedRes.status);
            console.error('   Error:', JSON.stringify(oembedData, null, 2));
            console.log('\\n💡 DIAGNOSIS: If oEmbed failed, the token might be restricted or the URL is private/geoblocked.');
        }

    } catch (err) {
        console.error('🔥 Script Error:', err);
    }
    console.log('\\n🧪 --- END OF DIAGNOSIS ---');
}

testConnection();
