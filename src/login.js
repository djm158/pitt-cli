var creds = require('./credentials.js');
var encryptor = require('file-encryptor');
const fs = require('fs');

var login = {
	handler: argv => store(),
	builder: {}
};

function store() {
	var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

	creds.storeCredentials(function(){

		creds.encryptPrompt((encrypt) => {
			if(encrypt.encrypt){
				creds.getStoragePass((auth) => {
					encryptor.encryptFile(home + '/.pitt-cli', home + '/.pitt-cli.enc', auth.pass, function(err) {
						fs.unlink(home + '/.pitt-cli', (err) => {
							if(err) throw err;
						});
						console.log('Encrypted credentials stored in file ~/.pitt-cli.enc');
					});
				});
			}else{
				creds.verifyEncryptPrompt((verifyEncrypt) => {
					if(!verifyEncrypt.encrypt){
						fs.unlink(home + '/.pitt-cli', (err) => {
							if(err) throw err;
							console.log('Credentials not stored');
						});
					}else{
						if(fs.existsSync(home + '/.pitt-cli.enc')){
							fs.unlink(home + '/.pitt-cli.enc', (err) => {
								if(err) throw err;
							});
						}
						console.log('Unencrypted credentials stored in file ~/.pitt-cli');
					}
				});
			}
		});
	});
				
}

module.exports = login;