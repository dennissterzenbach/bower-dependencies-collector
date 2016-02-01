var fs = require('fs');
var verbose = (process.argv.length > 1 && process.argv.indexOf('--verbose') > 1);
var bowerjsonanalyzer = require('./bowerjsonanalyzer');
var dataoutput = require('./output');

if (verbose) {
    console.log(process.argv);
}

// Example Command Line:
// node collectBowerMetadata.js "{ \"Project1\": \"./project1/bower.json\", \"Project2\": \"./project2/bower.json\" }"
//

var toAnalyze = JSON.parse(process.argv.pop());

////////////////////////////////////////////////////////////////////////////////////////////////////
// Variables
var projectName;
var results = [];

// iterate through the list of projects
for (projectName in toAnalyze) {
    if (verbose) {
        console.log('analyzing bower.json of project', projectName, '(' + toAnalyze[projectName] + ')...');
    }

    // read the single project's bower.json
    //     and
    // iterate through list of packages and determine their dependencies
    //     and
    // add the analyzed project's data to results
    results.push(bowerjsonanalyzer.analyzeProject(projectName, readBowerJSON(toAnalyze[projectName])));
}

if (verbose) {
    console.log();
    console.log('analyzing collected bower dependencies...');
}

var knownPackages = bowerjsonanalyzer.collectKnownPackages(results);

if (verbose) {
    console.log('known packages:', knownPackages);
}

var results2 = collectData(results, knownPackages);

////////////////////////////////////////////////////////////////////////////////////////////////////
// output

if (verbose) {
    console.log('generating output...');
}

dataoutput.writeDataToFile(JSON.stringify(results), 'bower-projects-dependencies.json');
dataoutput.writeDataToFile(dataoutput.transformToCSV(results2), 'bower-projects-dependencies-versions-perproject.csv');

////////////////////////////////////////////////////////////////////////////////////////////////////
// functions

function readBowerJSON(fileToRead) {
    if (verbose) {
        console.log('read ', fileToRead);
    }

    return JSON.parse(fs.readFileSync(fileToRead, 'utf8'));
}

function collectData(results, knownPackages) {
    var results2 = [];
    results2['package name'] = [];
    for (var proj in results) {
        var projectInfo = results[proj];
        results2['package name'].push(projectInfo.name);

        // console.log(projectInfo.name, 'CSV..................');

        // mark every of the project-specific package in result list
        var knownPkgName;
        var singlePkgDetails;
        for (var pkg in knownPackages) {
            knownPkgName = knownPackages[pkg];

            // console.log(projectInfo.name, 'pkg', knownPkgName);
            singlePkgDetails = {
                sourceurl: '',
                version: '-'
            };

            if (!results2[knownPkgName]) {
                results2[knownPkgName] = [];
            }

            if (projectInfo.bowerdependencies[knownPkgName]) {
                var deps = JSON.parse(projectInfo.bowerdependencies[knownPkgName]);
                results2[knownPkgName][projectInfo.name] = deps.version;
            } else {
                results2[knownPkgName][projectInfo.name] = '';
            }
        }
    }

    return results2;
}
