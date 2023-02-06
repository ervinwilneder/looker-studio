// Dependencies
const puppeteer = require('puppeteer-core');
const fs = require('fs');

// Custom modules
const config = require('./config');
const tools = require('./tools');
const { parser } = require('./cli-options');

// CLI arguments
const args = parser.parse_args();

// Init variables
const jobs = new Array();
let screenshotCounter = 1;
let chartIndex = args.chart_index;
let noContainer = args.no_container;

// Setup folders
if (!fs.existsSync('auth')) { fs.mkdirSync('auth') };
if (!fs.existsSync('screenshots')) { fs.mkdirSync('screenshots') };
if (!fs.existsSync('downloads')) { fs.mkdirSync('downloads') };

// Main proccess
(async () => {

    try {

        if (args.auth) {
            // Launch browser and get opened tab
            const browser = await puppeteer.launch(config.PUPPETEER_OPTIONS_NO_CONTAINER);
            const [page] = await browser.pages();

            // Go to home page
            await page.goto('https://lookerstudio.google.com/', {'waitUntil' : 'networkidle2'});

            // Save cookies
            let cookies = await page.cookies();
            let cookieJson = JSON.stringify(cookies);
            fs.writeFileSync('auth\\cookies.json', cookieJson);

            // Finally close browser
            await browser.close();
            process.exit();
        }
        
        // Launch browser and get opened tab
        const browser = await puppeteer.launch(noContainer ? config.PUPPETEER_OPTIONS_NO_CONTAINER : config.PUPPETEER_OPTIONS);
        const [page] = await browser.pages();
        
        // Set some browser & navigation features
        await page.setViewport({ width: 1440, height: 1080 });
        await page.setDefaultNavigationTimeout(60000);

        // Handle cookies
        if (!noContainer) {
            if (fs.existsSync('auth/cookies.json')) {
                let cookies = fs.readFileSync('auth/cookies.json', 'utf8');
                let deserializedCookies = JSON.parse(cookies);
                await page.setCookie(...deserializedCookies);
            };

            // Set path to download files
            await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: 'downloads'});
        };

        // Go to home page
        await page.goto(args.url, {'waitUntil' : 'networkidle2'});

        // Screenshot log
        await page.screenshot({ path: `screenshots/${screenshotCounter}.jpeg` });
        screenshotCounter++

        // Waiting
        await tools.delay(6000);

        // Click on table "More" options
        await page.evaluate((chartIndex) => {
            document.querySelectorAll('ng2-chart-menu-button button[mattooltip="More"]')[chartIndex].click();
        }, chartIndex);

        // Screenshot log
        await page.screenshot({ path: `screenshots/${screenshotCounter}.jpeg` });
        screenshotCounter++

        // Click on "Export Option"
        await page.evaluate(() => {
            Array.from(document.querySelectorAll('button[role="menuitem"]')).find(el => el.innerText == 'Export').click();
        });

        // Screenshot log
        await page.screenshot({ path: `screenshots/${screenshotCounter}.jpeg` });
        screenshotCounter++

        // Get file name
        let fileName = await page.evaluate(() => {
            return document.querySelector('input[formcontrolname="fileName"]').value;
        });

        // Download file
        await page.evaluate(() => {
            document.querySelector('button.mat-primary').click();
        });

        // Screenshot log
        await page.screenshot({ path: `screenshots/${screenshotCounter}.jpeg` });
        screenshotCounter++

        // Wait for completing file download
        await tools.waitForFile(`downloads\\${fileName}.csv`, 6000);

        // Finally close browser
        await tools.delay(5000);
        await browser.close();

    } catch (err) {
        console.error(err);

        // If something goes wrong, close browser
        if (browser) {
            await browser.close();
        };
    };
})()