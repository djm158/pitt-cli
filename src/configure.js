var os = require('os');

var conf = {
    handler: argv => configure(argv.env),
    builder: {}
};


function configure(env) {

    if(os.platform() !== 'linux') {
        console.error("Error, only Linux supported at this time');
        process.exit(-1);
    }
}
