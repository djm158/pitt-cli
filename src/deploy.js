var creds = require('./credentials.js');
var scp = require('scp2');
var exec = require('ssh-exec');
var execSh = require('exec-sh');
var Client = scp.Client;

var deployHTML = {
	handler: argv => send(argv.directory),
	builder: {}
};

function send(dir) {
	if(dir.substr(dir.length - 1) != '/'){
		dir = dir + '/';
	}

	creds.getCredentials((auth) => {

		dir = 'mv ' + dir + ' tempDeploy && tar -zcf ../tempDeploy.tar.gz tempDeploy && mv tempDeploy ' + dir;
		execSh(dir, { cwd: "" }, function(err){
			if (err) {
				console.log("Exit code: ", err.code);
				return;
			}
			var client = new scp.Client({
				port: 22,
				host: 'unixs.cssd.pitt.edu',
				username: auth.user,
				password: auth.pass
			});
			console.log("Starting Upload...");
			client.upload('../tempDeploy.tar.gz', 'tempDeploy.tar.gz', function(err) {
				client.close();
				console.log("Upload Complete");
				execSh('rm ../tempDeploy.tar.gz', { cwd: "" }, function(err){
					if (err) {
						console.log("Exit code: ", err.code);
						return;
					}
				});
				console.log("Deploying to www.pitt.edu/~" + auth.user);
				exec('export dir="$(date)" && if [ ! -d ".html-backup" ]; then mkdir .html-backup; fi && mv tempDeploy.tar.gz .html-backup/"$dir".tar.gz && if [ -d "public/html" ]; then rm -rf public/html; fi && gunzip .html-backup/"$dir".tar.gz && tar -xf .html-backup/"$dir".tar && mv tempDeploy public/html && echo "Sucessfully deployed, backup saved to:  ~/.html-backup/$dir.tar.gz"', {
					user: auth.user,
					host: 'unixs.cssd.pitt.edu',
					password: auth.pass
				}).pipe(process.stdout);
			});	
		});
	});
}

module.exports = deployHTML;