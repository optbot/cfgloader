OptBot Configuration Loader
===========================
Description
--
Configuration loader for the optbot services.

Based on [nconf](https://github.com/indexzero/nconf).

Usage
--

Example:

	var serviceName = 'restapi';

	var defaults = {
		web: {
			host: '127.0.0.1',
			port: 18080
		}
	};

	var cfgloader = require('@optbot/cfgloader'),
		config = cfgloader(serviceName, defaults);  

	var host = config.get('web:host');
	var port = config.get('web:port');