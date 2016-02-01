# bower-dependencies-collector
Tool for collecting an overview about all metadata to the dependencies in a list of several bower.json files.

# Example Command Line:
```
node collectBowerMetadata.js "{ \"Project1\": \"./project1/bower.json\", \"Project2\": \"./project2/bower.json\" }"
```
This will read project1's bower.json and project2's bower.json and collect all the different package listed in their dependencies.
The result will be 2 files:

JSON Result:
```
[
  {
    "name": "Project1",
    "bowerdependencies": {
      "angular": "{\"full\":\"~1.3.8\",\"name\":\"angular\",\"sourceurl\":\"\",\"version\":\"~1.3.8\"}",
      "angular-ui-router": "{\"full\":\"0.2.14\",\"name\":\"angular-ui-router\",\"sourceurl\":\"\",\"version\":\"0.2.14\"}",
      "angular-bootstrap": "{\"full\":\"~0.12.0\",\"name\":\"angular-bootstrap\",\"sourceurl\":\"\",\"version\":\"~0.12.0\"}",
      "angular-local-storage": "{\"full\":\"~0.1.5\",\"name\":\"angular-local-storage\",\"sourceurl\":\"\",\"version\":\"~0.1.5\"}",
      "jquery": "{\"full\":\"2.1.1\",\"name\":\"jquery\",\"sourceurl\":\"\",\"version\":\"2.1.1\"}",
      "lodash": "{\"full\":\"2.4.1\",\"name\":\"lodash\",\"sourceurl\":\"\",\"version\":\"2.4.1\"}"
    }
  },
  {
    "name": "Project2",
    "bowerdependencies": {
      "angular": "{\"full\":\"https://github.com/angular/angular.git#v1.4.3\",\"name\":\"angular\",\"sourceurl\":\"https://github.com/angular/angular.git\",\"version\":\"v1.4.3\"}",
      "angular-ui-router": "{\"full\":\"0.2.15\",\"name\":\"angular-ui-router\",\"sourceurl\":\"\",\"version\":\"0.2.15\"}",
      "foundation": "{\"full\":\"5.5.2\",\"name\":\"foundation\",\"sourceurl\":\"\",\"version\":\"5.5.2\"}",
      "jquery": "{\"full\":\"2.1.4\",\"name\":\"jquery\",\"sourceurl\":\"\",\"version\":\"2.1.4\"}",
      "lodash": "{\"full\":\"3.10.1\",\"name\":\"lodash\",\"sourceurl\":\"\",\"version\":\"3.10.1\"}"
    }
  }
]
```

CSV Result:
```
package name;"Project1";"Project2"
angular;"~1.3.8";"v1.4.3"
angular-ui-router;"0.2.14";"0.2.15"
angular-bootstrap;"~0.12.0";""
angular-local-storage;"~0.1.5";"0.2.2"
jquery;"2.1.1";"2.1.4"
lodash;"2.4.1";"3.10.1"
foundation;"";"5.5.2"
```
