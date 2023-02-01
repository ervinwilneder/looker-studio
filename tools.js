const fs = require('fs');

module.exports = {
    // Delay function replacing waitFor() deprecated puppeteer function
    delay: function (time) {
        return new Promise(function(resolve) { 
           setTimeout(resolve, time)
        });
    },
    // Delay function especifically built to wait files' downloads
    waitForFile: async function (path, timeout) {
        let totalTime = 0; 
        let checkTime = timeout / 10;
    
        return await new Promise((resolve, reject) => {
            const timer = setInterval(function() {

                totalTime += checkTime;
                let fileExists = fs.existsSync(path);
        
                if (fileExists || totalTime >= timeout) {
                    clearInterval(timer);
                    resolve(fileExists);
                }
            }, checkTime);
        });
    }
};