var nodemailer = require('nodemailer');
var commandExists = require('command-exists').sync;
const ora = require('ora');
const wkhtmltopdf = require('wkhtmltopdf');
var execSh = require('exec-sh');
var creds = require('./credentials.js');
var fs = require('fs');
var argv = require('yargs')
	.option('c', {
		alias: 'color',
		describe: 'Print to color printer',
		type: 'boolean'
	})
	.option('l', {
		alias: 'link',
		describe: 'Print a link',
		type: 'boolean'
	});

var printer = {
	handler: argv => downloader(argv.file, argv.c, argv.l),
	builder: {}
};


let smptConfig = {
	host: 'smtp.office365.com',
	port: 587,
	secure: false,
	auth: {
		user: '',
		pass: ''
	}
};

function downloader(file, color, link){

	if(link){
		if(commandExists('wkhtmltopdf')){
			if(file.substring(0,7) != "http://" && file.substring(0,8) != "https://"){
				file = 'http://' + file;
			}
			wkhtmltopdf(file, { pageSize: 'letter', output: 'pitt-print.pdf' }, function(err){
				print('pitt-print.pdf', color);
			});
		}else{
			console.log('wkhtmltopdf not installed on your system, install it with the command:\npitt setup');
		}

	}else{
		print(file, color);
	}

}

function print(file, color) {

	if(!fs.existsSync(file)) {
		console.error('Error:' + file + ' does not exist, please enter valid file path.');
		process.exit(-1);
	}
	printer = 'mobileprint@pitt.edu';
	if(color){
		 printer = 'colorprint@pitt.edu';
	}
	creds.getCredentials((auth) => {
		smptConfig.auth.user = auth.user + '@pitt.edu';
		smptConfig.auth.pass = auth.pass;
		let mailOptions = {
			from: '<' + smptConfig.auth.user + '>',
			to: printer,
			attachments: [
				{
					filename: file,
					path: file
				}
			]
		};
		let transporter = nodemailer.createTransport(smptConfig);

		const spinner = ora('sending...').start();
		transporter.sendMail(mailOptions, (error, info) => {
			spinner.succeed();
			if (error) {
				console.log(error);
			}
			if(file == 'pitt-print.pdf'){
				execSh('rm pitt-print.pdf', { cwd: "./" }, function(err){
					if (err) {
						console.log("Exit code: ", err.code);
						return;
					}
				});
			}
		});
	});
}

module.exports = printer;
