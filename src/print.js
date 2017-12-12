var nodemailer = require('nodemailer');
const ora = require('ora');
var creds = require('./credentials.js');
var email = require('./buildEmail.js');
var fs = require('fs');


var printer = {
   handler: argv => print(argv.file, argv.c),
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
            console.log(info);
      });
   });
}

module.exports = printer;
