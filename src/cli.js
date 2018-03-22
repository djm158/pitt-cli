
module.exports =
	require('yargs')
		.command('print <file> [files..]', 'print a file or multiple files', require('../src/print'))
		.command('email <recipients> [subject] [body]', 'send email to recipients', require('../src/sendEmail'))
		.command('ssh', 'connect to unixs.cssd.pitt.edu via ssh', require('../src/ssh'))
		.command('thoth', 'connect to thoth.cs.pitt.edu via ssh', require('../src/thoth'))
		.command('configure [env]', 'configure dev environments in Pitt computing labs', require('../src/configure'))
		.demandCommand(1,'Please supply at least one command')
		.argv;
