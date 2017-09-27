
module.exports =
   require('yargs')
      .command('print <file> [files..]', 'print a file or multiple files', require('../src/print'))
      .command('something', 'do something')
      .demandCommand(1,'need at least one command')
      .argv