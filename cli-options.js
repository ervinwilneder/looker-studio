// Dependencies
const { ArgumentParser } = require('argparse');

// Set arguments for CLI
const parser = new ArgumentParser();

parser.add_argument('--dummy', {
    help: 'Dummy argument',
    action: 'store_true'
});

parser.add_argument('--auth', {
    help: 'Retrieve cookies from browser as user is already logged in',
    action: 'store_true'
});

parser.add_argument('--url', {
    help: 'The URL of the report'
});

parser.add_argument('--chart-index', {
    help: 'Please look at js:{{ document.querySelectorAll(\'ng2-chart-menu-button button[mattooltip="More"]\') }} on your browser and get the index of your chart',
    type: 'int'
});

parser.add_argument('--no-container', {
    help: 'To run locally without Docker',
    action: 'store_true'
});

// Export parser variable
module.exports = { parser };