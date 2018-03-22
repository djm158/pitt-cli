var execSh = require('exec-sh');
var creds = require('./credentials.js');

var thothSSH = {
	handler: argv => connect(),
	builder: {}
};

function connect() {

	creds.getName((auth) => {
		thothSSH = 'ssh ' + auth.user + '@thoth.cs.pitt.edu';
		execSh(thothSSH, { cwd: "/home" }, function(err){
			if (err) {
				console.log("Exit code: ", err.code);
				return;
			}
		});
	});
}

module.exports = thothSSH;