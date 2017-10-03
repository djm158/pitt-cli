
module.exports =
   require('yargs')
      .command('print <file> [files..]', 'print a file or multiple files', require('../src/print'))
      .demandCommand(1,'Please supply at least one command')
      .command('configure [node]', 'configure dev environments in Pitt computing labs')
      .argv
