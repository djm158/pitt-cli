var execSh = require('exec-sh');
var creds = require('./credentials.js');

var unixsSSH = {
	handler: argv => connect(),
	builder: {}
};

function connect() {

	creds.getName((auth) => {
		unixsSSH = 'ssh ' + auth.user + '@unixs.cssd.pitt.edu';
		execSh(unixsSSH, { cwd: "/home" }, function(err){
			if (err) {
				console.log("Exit code: ", err.code);
				return;
			}
		});
	});
}

module.exports = unixsSSH;