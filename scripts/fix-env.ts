
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.join(process.cwd(), '.env.local');

try {
    let content = "";
    if (fs.existsSync(envPath)) {
        content = fs.readFileSync(envPath, 'utf8');
    }

    // Check if AUTH_SECRET exists
    if (content.includes("AUTH_SECRET=")) {
        console.log("AUTH_SECRET already exists. Checking formatting...");
        // Ensure it's on its own line if it was appended poorly
        // But simplistic check: just print it
        // console.log(content);
    } else {
        console.log("Adding AUTH_SECRET...");
        const secret = crypto.randomBytes(32).toString('hex');
        const prefix = content.endsWith('\n') || content === "" ? "" : "\n";
        fs.appendFileSync(envPath, `${prefix}AUTH_SECRET="${secret}"\n`);
        console.log("AUTH_SECRET added.");
    }

    // Also check if DATABASE_URL is somehow messed up
    if (!content.includes("DATABASE_URL=")) {
        console.log("WARNING: DATABASE_URL seems missing in .env.local");
    }

} catch (e) {
    console.error("Error modifying .env.local:", e);
}
