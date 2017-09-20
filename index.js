(function() {
    'use strict';
}());

var express         = require('express');
var app             = express();

var port = process.env.PORT || 80;

var environments = {
    "dev": "src",
    "prod": "dist"
};

var env = "dev";
if (process.argv.length > 2) {
    if (process.argv[2] === "prod") {
        env = "prod";
    }
}

app.use('/', express.static(environments[env]));

app.listen(port);

console.log('Environment set to ' + env);
console.log('Static files served from ' + environments[env] + '/ directory');
console.log('Server listening on port ' + port);
console.log();
console.log('Browse to http://localhost:' + port + '/');
