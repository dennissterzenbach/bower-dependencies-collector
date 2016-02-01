(function() {
    var endpointParser = require('bower-endpoint-parser');

    function BowerJSONAnalyzer() {
    }

    BowerJSONAnalyzer.prototype.getMetaDataObject = getMetaDataObject;
    BowerJSONAnalyzer.prototype.collectKnownPackages = collectKnownPackages;
    BowerJSONAnalyzer.prototype.analyzeProject = analyzeProject;

    function getMetaDataObject(info) {
        var metadata = endpointParser.decompose(info);
        var returnvalue = {};

        returnvalue.name = metadata.name;
        returnvalue.source = metadata.source;
        returnvalue.version = metadata.target;

        if (metadata.source === info) {
            returnvalue.source = '';
            returnvalue.version = info;
        }

        return returnvalue;
    }

    function collectKnownPackages(projects) {
        var knownPackages = [];
        var proj;
        var projectInfo;
        var pkg;
        var singlePkgDetails;

        for (proj in projects) {
            projectInfo = projects[proj];

            // console.log(projectInfo.name);

            // go through list of packages of this project and add all unknown packages
            // to the list of known packages, because we need a complete list of all
            // packages to output the project-package-associtation correctly
            for (pkg in projectInfo.bowerdependencies) {
                singlePkgDetails = projectInfo.bowerdependencies[pkg];

                // console.log('singlePkgDetails for', pkg, 'is', singlePkgDetails);

                if (!knownPackages[pkg]) {
                    knownPackages.push(pkg);
                }
            }
        }

        return knownPackages;
    }

    function analyzeProject(projectName, projectJSONData) {
        var packageName;
        var packageDetails;
        var metadata;

        var projectData = {
            name: projectName,
            bowerdependencies: {}
        };

        // for each package listed as dependency
        for (packageName in projectJSONData.dependencies) {
            packageDetails = {};

            // read the meta data and use this as information about the project
            metadata = this.getMetaDataObject(projectJSONData.dependencies[packageName]);

            packageDetails.full = projectJSONData.dependencies[packageName];
            packageDetails.name = metadata.name || packageName;
            packageDetails.sourceurl = metadata.source;
            packageDetails.version = metadata.version;

            // add this to project data bower packages list
            projectData.bowerdependencies[packageName] = JSON.stringify(packageDetails);
        }

        return projectData;
    }

    module.exports = new BowerJSONAnalyzer();
}).call(this);
