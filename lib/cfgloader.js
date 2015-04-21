/*
 *  Copyright (c) 2015 Marshall Farrier, Robert Rodrigues, Mark Scappini
 * license http://opensource.org/licenses/MIT
 */

module.exports = function(serviceName, defaults) {
  'use strict';

  if (!serviceName || typeof serviceName !== 'string') {
    throw new Error('serviceName is a required string');
  }

  if (!defaults) {
    defaults = {};
  }

  var fs = require('fs');
  var path = require('path');
  var nconf = require('nconf');

  var configPath = process.env.NPM_CONF_PATH;
  if (!configPath) {
    Object.defineProperty(nconf, 'warning', { value: new Array(1) });
    nconf.warning[0] = 'NPM_CONF_PATH not set';
  }

  if (configPath) {
    var configFile = serviceName + '.json';

    // Service config values
    var envConfig = path.join(configPath, configFile);
    if (fs.existsSync(envConfig)) {
      nconf.file(envConfig);
    }
  }

  nconf.defaults(defaults);

  return nconf;
};
