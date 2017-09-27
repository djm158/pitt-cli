#!/usr/bin/env node

var nodemailer = require('nodemailer');
const ora = require('ora');
var creds = require('./credentials.js');
var fs = require('fs');


var printer = {
   handler: argv => print(argv.file),
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

function print(file) {

   if(!fs.existsSync(file)) {
      console.error('Error:' + file + ' does not exist, please enter valid file path.');
      process.exit(-1);
   }

   creds.getCredentials((auth) => {
      smptConfig.auth.user = auth.user + '@pitt.edu';
      smptConfig.auth.pass = auth.pass;
      let mailOptions = {
         from: '<' + smptConfig.auth.user + '>',
         // to: 'mobileprint@pitt.edu',
         to: 'djm158@pitt.edu',
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
      });
   });

}

module.exports = printer;
