var LogcatEntry = require('./LogcatEntry.js');
var DataStore = require('./DataStore.js');

function LogEntryDataStore() {
    this.logcatEntries = [];
    this.tagIndex = new DataStore();
}

/**
 * Add a LogEntry to the data store
 *
 * @param logEntry
 */
LogEntryDataStore.prototype.addLogEntry = function(logEntry) {
    this.logcatEntries.push(logEntry);

    this.tagIndex.addEntry(logEntry.tag, logEntry);
    
    this.getUniqueTags();
};

LogEntryDataStore.prototype.getUniqueTags = function() {
    console.log(this.tagIndex.toString());
};

module.exports = LogEntryDataStore;