var LogLevelEnum = Object.freeze({'D': 'Debug', 'E': 'Error', 'I': 'Info', 'W': 'Warn'});

/**
 * Represents a entry in the log
 *
 * @param logLevel
 * @param tag
 * @constructor
 */
function LogcatEntry(logLevel, tag) {
    this.logLevel = logLevel;
    this.tag = tag;
}

/**
 * Factory method to create a new instance of LogcatEntry given a string based line entry
 *
 * @param line - a log entry in string form
 */
LogcatEntry.create = function(line) {

    try {
        var logLevel = parseVariable(/^[DEIW]/, line);
        line = consumeCharacters(line, logLevel.length);

        line = consumeCharacters(line, 1    );

        var tag = parseVariable(/^\w+/, line);
        line = consumeCharacters(line, tag.length);

    } catch (e) {
        console.log(e);
        return null;
    }

    return new LogcatEntry(logLevel, tag);
};

/**
 * Parses a variable out of the line
 *
 * @param regex - a regex used to parse out a variable
 * @param line - the line to parse the variable out of
 * @returns string the variable parsed out
 */
function parseVariable(regex, line) {
    var variable = line.match(regex);

    if (variable == undefined) {
        throw "Failed to parse line";
    }

    return variable[0];
}

/**
 * Removes the first {@param length} characters and returns the modified line
 *
 * @param line - the line to remove characters from
 * @param length - the amount of characters to consume
 * @returns string modified line
 */
function consumeCharacters(line, length) {
    return line.substring(length);
}

module.exports = LogcatEntry;
