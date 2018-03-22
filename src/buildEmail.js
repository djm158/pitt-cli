const inquirer = require('inquirer');
const fs = require('fs');

function emailPrompt(callback) {
	let prompt = [
		{
			name: 'sub',
			type: 'input',
			message: 'Subject:',
		},
		{
			name: 'body',
			type: 'input',
			message: 'Body:',
		}
	];

	inquirer.prompt(prompt).then(callback);
}

function emailPromptCc(callback) {
	let prompt = [
		{
			name: 'cc',
			type: 'input',
			message: 'Carbon copy:',
		},
		{
			name: 'sub',
			type: 'input',
			message: 'Subject:',
		},
		{
			name: 'body',
			type: 'input',
			message: 'Body:',
		}
	];

	inquirer.prompt(prompt).then(callback);
}

function emailBody(callback) {
	let prompt = [
		{
			name: 'body',
			type: 'input',
			message: 'Body:',
		}
	];

	inquirer.prompt(prompt).then(callback);
}

function emailBodyCc(callback) {
	let prompt = [
		{
			name: 'cc',
			type: 'input',
			message: 'Carbon copy:',
		},
		{
			name: 'body',
			type: 'input',
			message: 'Body:',
		}
	];

	inquirer.prompt(prompt).then(callback);
}

function emailCc(callback) {
	let prompt = [
		{
			name: 'cc',
			type: 'input',
			message: 'Carbon copy:',
		}
	];

	inquirer.prompt(prompt).then(callback);
}


exports.getInfo = emailPrompt;
exports.getInfoCc = emailPromptCc;
exports.getBody = emailBody;
exports.getBodyCc = emailBodyCc;
exports.getCc = emailCc;