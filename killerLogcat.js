var LogEntryDataStore = require('./LogEntryDataStore.js');
var LogcatEntry = require('./LogcatEntry.js');
var split = require('split');

var logEntryDataStore = new LogEntryDataStore();

/**
 * Parse the line and save it to internal data structures
 * @param line - a log entry in string form
 */
var handleAdbLine = function (line) {
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
    logcat_process.stdout.pipe(split()).on('data', handleAdbLine);
    logcat_process.stdout.on('end', function(data) {
        console.log("Logcat process has ended.");
    });
    logcat_process.on('exit', function(code) {
        if (code != 0) {
            console.log('Failed: ' + code);
        }
    });
}

var commandHelp = function() {
    var commandHelp = "killer-logcat commands:\n";
    commandHelp += "\tlist-tags: lists all tags that have been seen";
    return commandHelp;
}

var handleCommand = function (line) {

    var commandParts = line.split(" ");
    var command = commandParts[0].toString().trim();

    if (command === 'list-tags') {
        logEntryDataStore.getUniqueTags();
    } else if (command == '') {
        // do nothing, allow whitespace
    } else {
        console.log("Sorry that is not a recognized command.\n");
        console.log(commandHelp());
    }
};

function startReadingCommandLineParams() {
    process.stdin.pipe(split()).on('data', handleCommand);
}

/**
 * Main execution of the killer-logcat program
 */
function startService() {
    startReadingFromAdb();
    startReadingCommandLineParams();
}

startService();
