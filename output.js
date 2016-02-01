(function() {
    var fs = require('fs');

    function DataOutput() {
    }

    DataOutput.prototype.transformToCSV = transformToCSV;
    DataOutput.prototype.writeDataToFile = writeDataToFile;

    function transformToCSV(data) {
        var CSVoutput = '';
        var headline = '';
        for (var pkg in data) {
            var outputLine = '' + pkg;

            for (var projectSpecificVersion in data[pkg]) {
                outputLine += ';"' + data[pkg][projectSpecificVersion] + '"';
            }

            CSVoutput += outputLine + "\n";

            // console.log('R', line, data[line].toArray().join(';'));
        }

        return CSVoutput;
    }

    function writeDataToFile(data, filename) {
        fs.writeFile(filename, data, function(err) {
            if (err) {
                return console.log(err);
            }

            console.log('wrote ' + filename);
        });
    }

    module.exports = new DataOutput();
}).call(this);
