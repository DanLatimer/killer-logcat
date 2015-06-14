var LogEntryDataStore = require('./LogEntryDataStore.js');
var LogcatEntry = require('./LogcatEntry.js');
var split = require('split');

var logEntryDataStore = new LogEntryDataStore();

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

    logEntryDataStore.addLogEntry(logcatEntry);

    console.log('new line, tag: ' + logcatEntry.tag);

};

function startReadingFromAdb() {
    var child_process = require('child_process');
    var logcat_process = child_process.spawn("cat", ["./sample_logcat.txt"]);
    logcat_process.stdout.pipe(split()).on('data', handleLine);
    logcat_process.stdout.on('end', function(data) {
        //file.end();
        console.log("Logcat process has ended.");
    });
    logcat_process.on('exit', function(code) {
        if (code != 0) {
            console.log('Failed: ' + code);
        }
    });
}

function startReadingCommandLineParams() {

}

/**
 * Main execution of the killer-logcat program
 */
function startService() {
    startReadingFromAdb();
    startReadingCommandLineParams();
}

startService();
