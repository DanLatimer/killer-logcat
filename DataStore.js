
function DataStoreEntry() {
    this.count = 0;
    this.entries = [];
}

DataStoreEntry.prototype.push = function(entry) {
    this.count++;
    this.entries.push(entry);
}


function DataStore() {
    this.data = {};
}

DataStore.prototype.addEntry = function(indexItem, item) {
    var dataItem = this.data[indexItem];
    if (dataItem == undefined) {
        dataItem = new DataStoreEntry();
    }
    dataItem.push(item);

    this.data[indexItem] = dataItem;
};

DataStore.prototype.distinct = function() {
    return Object.keys(this.data);
};

DataStore.prototype.toString = function() {
    var string = [];

    for (var key in this.data) {
        string.push({"key": key, "count": this.data[key].count});
    }

    return string;
}

module.exports = DataStore;