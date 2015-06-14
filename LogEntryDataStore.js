var LogcatEntry = require('./LogcatEntry.js');
var DataStore = require('./DataStore.js');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

function LogEntryDataStore() {
    db.serialize(function() {
        db.run("CREATE TABLE LogEntries (" +
                    "timestamp datetime default current_timestamp," +
                    "LogLevel VARCHAR(1)," +
                    "Tag VARCHAR(255)" +
                    ")");
    });

}

/**
 * Add a LogEntry to the data store
 *
 * @param logEntry
 */
LogEntryDataStore.prototype.addLogEntry = function(logEntry) {

    var stmt = db.prepare("INSERT INTO LogEntries (LogLevel, Tag) VALUES (?, ?)");
    stmt.run(logEntry.logLevel, logEntry.tag);
    stmt.finalize();

    this.getUniqueTags();
};

LogEntryDataStore.prototype.getUniqueTags = function() {
    db.each("SELECT DISTINCT Tag FROM LogEntries", function(err, row) {
        console.log(row.Tag);
    });
};

module.exports = LogEntryDataStore;