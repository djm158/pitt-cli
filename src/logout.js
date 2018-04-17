const fs = require('fs');

var logout = {
	handler: argv => deleteCred(),
	builder: {}
};

function deleteCred() {
	var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
	if(fs.existsSync(home + '/.pitt-cli')){
		fs.unlink(home + '/.pitt-cli', (err) => {
			if(err) throw err;
		});
	}
	if(fs.existsSync(home + '/.pitt-cli.enc')){
		fs.unlink(home + '/.pitt-cli.enc', (err) => {
			if(err) throw err;
		});
	}
	console.log("All login data deleted");
}

module.exports = logout;