var LogcatEntry = require('./LogcatEntry.js');
var split = require('split');

/**
 * Parse the line and save it to internal data structures
 * @param line - a log entry in string form
 */
var handleLine = function (line) {
    var logcatEntry = LogcatEntry.create(line);

    if (logcatEntry == null) {
        console.log('could not create logcat entry');
        return;
    }

    console.log('new line, tag: ' + logcatEntry.tag);
};

/**
 * Main execution of the killer-logcat program
 */
function startService() {
    process.stdin.pipe(split()).on('data', handleLine);

    // TODO: user interface control
}

startService();
