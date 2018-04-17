var encryptor = require('file-encryptor');
const inquirer = require('inquirer');
const fs = require('fs');

function credentialsPrompt(callback) {
	var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

	let prompt = [
		{
			name: 'user',
			type: 'input',
			message: 'Enter Pitt username',
		},
		{
			name: 'pass',
			type: 'password',
			message: 'Enter Pitt password',
		}
	];

	if(fs.existsSync(home + '/.pitt-cli')){
		console.log("Account: " + JSON.parse(fs.readFileSync(home + '/.pitt-cli')).user);
		callback(JSON.parse(fs.readFileSync(home + '/.pitt-cli')));
	}else if(fs.existsSync(home + '/.pitt-cli.enc')){
		this.getStoragePass((auth) => {
			encryptor.decryptFile(home + '/.pitt-cli.enc', home + '/.pitt-cli', auth.pass, function(err) {
				if(fs.existsSync(home + '/.pitt-cli')){
					console.log("Account: " + JSON.parse(fs.readFileSync(home + '/.pitt-cli')).user);
					callback(JSON.parse(fs.readFileSync(home + '/.pitt-cli')));
					fs.unlink(home + '/.pitt-cli', (err) => {
						if(err) throw err;
					});
				}else{
					console.log("Invalid Password");
					process.exit();
				}
				
			});
		});
	}else{
		inquirer.prompt(prompt).then(callback);
	}
}

function credentialsStore(callback) {
	let prompt = [
		{
			name: 'user',
			type: 'input',
			message: 'Enter Pitt username',
		},
		{
			name: 'pass',
			type: 'password',
			message: 'Enter Pitt password',
		}
	];
	var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

	inquirer.prompt(prompt).then(answers => fs.writeFile(home + '/.pitt-cli', JSON.stringify(answers, null, '  '), ['utf8', 0o666, 'w'], (err) => {
		if (err) throw err;
	})).then(callback);
}

function passPrompt(callback) {
	let prompt = [
		{
			name: 'pass',
			type: 'password',
			message: 'Enter credential storage password',
		}
	];

	inquirer.prompt(prompt).then(callback);
}

function encrypt(callback){
	let prompt = [
		{
			name: 'encrypt',
			type: 'confirm',
			message: 'Would you like to encrypt stored credentials? ',
		}
	];

	inquirer.prompt(prompt).then(callback);
}

function encryptVerify(callback){
	let prompt = [
		{
			name: 'encrypt',
			type: 'confirm',
			message: 'WARNING: credentials will be stored in plain text. Are you sure you wish to continue?',
		}
	];

	inquirer.prompt(prompt).then(callback);
}

function namePrompt(callback) {
	let prompt = [
		{
			name: 'user',
			type: 'input',
			message: 'Enter Pitt username',
		}
	];

	inquirer.prompt(prompt).then(callback);
}

exports.getName = namePrompt;
exports.getCredentials = credentialsPrompt;
exports.storeCredentials = credentialsStore;
exports.getStoragePass = passPrompt;
exports.encryptPrompt = encrypt;
exports.verifyEncryptPrompt = encryptVerify;