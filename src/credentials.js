const inquirer = require('inquirer');
const fs = require('fs');

function credentialsPrompt(callback) {
   let prompt = [
      {
         name: 'user',
         type: 'input',
         message: 'Enter Pitt username',
      },
      {
         name: 'pass',
         type: 'password',
         message: 'Enter Pitt password',
      }
   ];

   inquirer.prompt(prompt).then(callback);
};


exports.getCredentials = credentialsPrompt;
