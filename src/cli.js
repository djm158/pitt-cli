
module.exports =
   require('yargs')
      .command('print <file> [files..]', 'print a file or multiple files', require('../src/print'))
      .options('c', {
            alias: 'color',
            default: false,
            describe: 'Print to color printer',
            type: 'boolean'
      })
      .demandCommand(1,'Please supply at least one command')
      .command('configure [env]', 'configure dev environments in Pitt computing labs', require('../src/configure'))
      .argv
