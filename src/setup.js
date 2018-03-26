var execSh = require('exec-sh');
var commandExists = require('command-exists').sync;

var setup = {
	handler: argv => install(),
	builder: {}
};

function install() {

	if(commandExists('yum')){
		execSh('sudo yum install wkhtmltopdf', { cwd: "./" }, function(err){
			if (err) {
				console.log("Exit code: ", err.code);
				return;
			}
		});
	}else if(commandExists('pacman')){
		execSh('sudo pacman -Sy wkhtmltopdf', { cwd: "./" }, function(err){
			if (err) {
				console.log("Exit code: ", err.code);
				return;
			}
		});
	}else if(commandExists('emerge')){
		execSh('sudo emerge libXext app-admin/eselect-fontconfig x11-libs/libXrender && wget http://wkhtmltopdf.googlecode.com/files/wkhtmltopdf-0.9.9-static-amd64.tar.bz2 && tar xvjf wkhtmltopdf-0.9.9-static-amd64.tar.bz2 && sudo mv wkhtmltopdf-amd64 /usr/local/bin/wkhtmltopdf && sudo chmod +x /usr/local/bin/wkhtmltopdf', { cwd: "./" }, function(err){
			if (err) {
				console.log("Exit code: ", err.code);
				return;
			}
		});
	}else if(commandExists('apt-get')){
		execSh('sudo apt-get install wkhtmltopdf', { cwd: "./" }, function(err){
			if (err) {
				console.log("Exit code: ", err.code);
				return;
			}
		});
	}else{
		console.log("Package manager not deteted you can download wkhtmltopdf from https://wkhtmltopdf.org/downloads.html");
	}
}

module.exports = setup;