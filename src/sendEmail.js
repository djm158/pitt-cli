var nodemailer = require('nodemailer');
const ora = require('ora');
var creds = require('./credentials.js');
var getEmail = require('./buildEmail.js');
var fs = require('fs');
var argv = require('yargs')
	.option('cc', {
				alias: 'carbon-copy',
				describe: 'carbon-copy someone on the email',
				type: 'boolean'
	})


var sendEmail = {
	handler: argv => email(argv.recipients, argv.subject, argv.body, argv.C),
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
}

function email(recip, sub, body, cc) {
	if(!sub){
		if(cc){
			getEmail.getInfoCc((info) => genEmail(recip, info.sub, info.body, info.cc));
		}else{
			getEmail.getInfo((info) => genEmail(recip, info.sub, info.body, cc));
		}
	}else if(!body){
		if(cc){
			getEmail.getBodyCc((info) => genEmail(recip, sub, info.body, info.cc));
		}else{
			getEmail.getBody((info) => genEmail(recip, sub, info.body, cc));
		}
	}else{
		if(cc){
			getEmail.getCc((info) => genEmail(recip, sub, body, info.cc));
		}else{
			genEmail(recip, sub, body);
		}
	}
}

function genEmail(recip, sub, body, carbon){
	creds.getCredentials((auth) => {
		smptConfig.auth.user = auth.user + '@pitt.edu';
		smptConfig.auth.pass = auth.pass;
		let mailOptions = {
			from: '<' + smptConfig.auth.user + '>',
			to: recip,
			cc: carbon,
			subject: sub,
			text: body,
		};
		let transporter = nodemailer.createTransport(smptConfig);

		const spinner = ora('sending...').start();
		transporter.sendMail(mailOptions, (error, info) => {
			spinner.succeed();
			if (error) {
				console.log(error);
			}
			console.log(info);
		});
	});
}

module.exports = sendEmail;
