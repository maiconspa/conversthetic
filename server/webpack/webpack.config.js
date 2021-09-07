var path = require('path');

module.exports = {
    entry: './server/index.js',
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
    },
    target: 'node'
};