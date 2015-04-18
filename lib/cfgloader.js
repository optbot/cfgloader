/*
 * Copyright (c) 2015 Marshall Farrier, Robert Rodrigues, Mark Scappini
 * license http://opensource.org/licenses/MIT
 */

(function () {
    'use strict';

    var fs = require('fs'),
        path = require('path'),
        nconf = require('nconf');
    
    /* The order in which you attach these configuration sources determines their priority in the hierarchy. */
    
    // 1. Command line args
    //nconf.argv({
    //    'host': { alias: 'web:host' },
    //    'port': { alias: 'web:port' }
    //});
    
    // 2. Environment variables
    //nconf.env();
    
    // 3. Environment-specific config values
    if (process.env && process.env.NODE_ENV) {
        var envConfig = path.join(__dirname, 'config.' + process.env.NODE_ENV + '.json');
        if (fs.existsSync(envConfig)) {
            nconf.file(envConfig);
        }
    }
    
    // 4. Default config values
    var defaultConfig = path.join(__dirname, 'config.json');
    nconf.file(defaultConfig);
    
    module.exports = nconf;
})();