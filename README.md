OptBot Configuration Loader
===========================
Description
--
Configuration loader for the optbot services.

Based on [nconf](https://github.com/indexzero/nconf).

Usage
--

### Basic
You do not run or install this package like other optbot services. This is a library for use within those services to read configuration in a uniform fashion. You should only declare this as a dependency within your `package.json`.

	"dependencies": {
        "@optbot/cfgloader": "git://github.com/optbot/cfgloader.git",
	}

### Details

Example from within an optbot service (hypothetically named `restapi`):

	var serviceName = 'restapi';

	var defaults = {
		web: {
			host: '',
			port: 8081
		}
	};

	var cfgloader = require('@optbot/cfgloader');
	var config = cfgloader(serviceName, defaults);  

	var host = config.get('web:host');
	var port = config.get('web:port');

This code will read an environment variable named `NPM_CONF_PATH` for a directory to locate a configuration file for the service qualified by name in the `cfgloader` constructor. If environment variable `NPM_CONF_PATH` has a value of `/etc/`, and the first argument provided to `cfgloader`'s constructor is `restapi`, `cfgloader` will look for a configuration file at `/etc/confg-restapi.json` and load it for values to override the `restapi`'s service configuration defaults provided as the second argument to the `cfgloader`'s constructor.

Testing
---

### Code conformity
    $ jshint lib test
    $ jscs .

Connects to
---
No connections
