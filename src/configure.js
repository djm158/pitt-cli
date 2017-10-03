var os = require('os');
var request = require('request');
var fs = require('fs');
var { exec } = require('child_process');

var conf = {
    handler: argv => configure(argv.env),
    builder: {}
};


function configure(env) {

    if(os.platform() !== 'linux') {
        console.error('Error, only Linux supported at this time');
        process.exit(-1);
    }

    if(env === 'node') {
        request.get('https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh')
        .on('error', (err) => {
            console.error(err);
        })
        .pipe(fs.createWriteStream('install.sh'));

        exec('bash install.sh', (err, stdout, stderr) => {
            if (err) {
                console.error(`exec error: ${err}`);
            }
            console.log(`${stdout}`);
        });

    }

}

module.exports = conf;
