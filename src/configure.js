var os = require('os');
var request = require('request');
var fs = require('fs');
var { exec } = require('child_process');

var conf = {
	handler: argv => configure(argv.env),
	builder: {}
};


function configure(env) {

	if(os.platform() !== 'linux') {
		console.error('Error, only Linux supported at this time');
		process.exit(-1);
	}
}

module.exports = conf;
