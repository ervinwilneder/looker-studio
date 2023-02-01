const homedir = require('os').homedir();
require('dotenv').config();

module.exports = {
    PUPPETEER_OPTIONS : {
        "product": "chrome",
        "headless": true,
        "defaultViewport": null,
        "executablePath": "/opt/google/chrome/chrome",
        "userDataDir": "/.config/google-chrome",
        "args": [
            `--profile-directory=Profile ${process.env.PUPPETEER_PROFILE}`,
            "--enable-features=NetworkService",
            "--no-sandbox"
        ],
        "ignoreHTTPSErrors": true
    },
    PUPPETEER_OPTIONS_WINDOWS_AUTH : {
        "product": "chrome",
        "headless": false,
        "defaultViewport": null,
        "executablePath": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        "userDataDir": `${homedir}\\AppData\\Local\\Google\\Chrome\\User Data`,
        "args": [
            `--profile-directory=Profile ${process.env.PUPPETEER_PROFILE}`,
            "--enable-features=NetworkService",
            "--no-sandbox"
        ],
        "ignoreHTTPSErrors": true
    }
};