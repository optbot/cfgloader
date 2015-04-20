/*
 * Copyright (c) 2015 Marshall Farrier, Robert Rodrigues, Mark Scappini
 * license http://opensource.org/licenses/MIT
 */

module.exports = function (serviceName, defaults) {
    'use strict';
    
    if (typeof serviceName === "object" && !defaults) {
        defaults = serviceName;
    } else if (typeof serviceName !== "string") {
        throw new Error("serviceName must be a string");
    }
    
    if (!defaults) {
        defaults = {};
    }
    
    var fs = require('fs'),
        path = require('path'),
        nconf = require('nconf');
    
    var configPath = process.env.NPM_CONF_PATH;
    if (!configPath) {
        Object.defineProperty(nconf, 'warning', { value: new Array(1) });
        nconf.warning[0] = "NPM_CONF_PATH not set";
    }
    
    /* The order in which you attach these configuration sources determines their priority in the hierarchy. */
    
    // Command line args
    //nconf.argv({
    //    'host': { alias: 'web:host' },
    //    'port': { alias: 'web:port' }
    //});
    
    // Environment variables
    //nconf.env();
    
    if (configPath) {
        var configFile = "config";
        if (serviceName) {
            configFile += "-" + serviceName;
        }
        configFile += ".json";
        
        // Service config values
        var envConfig = path.join(configPath, configFile);
        if (fs.existsSync(envConfig)) {
            nconf.file(envConfig);
        }
        
        //// Default config values
        //var defaultConfig = path.join(searchPath, 'config.json');
        //if (fs.existsSync(defaultConfig)) {
        //    nconf.file(defaultConfig);
        //}
    }
    
    nconf.defaults(defaults);
    
    return nconf;
};