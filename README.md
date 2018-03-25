# Pitt-Cli - CLI for Pitt Students

[![NPM](https://nodei.co/npm/pitt-cli.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/pitt-cli/)

[![Build Status](https://travis-ci.org/djm158/pitt-cli.svg?branch=master)](https://travis-ci.org/djm158/pitt-cli)
[![David Status](https://david-dm.org/djm158/pitt-cli.svg)](https://david-dm.org/djm158/pitt-cli)
[![npm](https://img.shields.io/npm/dt/pitt-cli.svg)](https://www.npmjs.com/package/pitt-cli)
[![GitHub forks](https://img.shields.io/github/forks/djm158/pitt-cli.svg?label=Fork)](https://github.com/djm158/pitt-cli#fork-destination-box)


## Installation

```console
$ [sudo] npm install -g pitt-cli
```

In order to use print link functionality [wkhtmltopdf](https://wkhtmltopdf.org/) must be installed on your system.

## Available Commands:

- **Print** - send file to mobileprint@pitt.edu
  
  ```console
  $ pitt print [-c] path/to/file
  ```
  
  `-c` send file to colorprint@pitt.edu

  `-l` send link to printer instead of file
  
- **Email** - send email from pitt email

  ```console
  $ pitt email [-cc] "recipients" ["subject"] ["body"]
  ```
  
  `-cc` prompts for recipients to cc on the email

  * If no subject or body defined, user will be prompted for them
  * Multiple recipients must be seperated by commas ex. `pitt email "recipient1@pitt.edu, recipient2@pitt.edu" "subject" "body"`

- **SSH** - connect to unixs.cssd.pitt.edu

  ```console
  $ pitt ssh
  ```
  
- **THOTH** - connect to thoth.cs.pitt.edu

  ```console
  $ pitt thoth
  ```

- **Deploy** - deploy given directory to your personal Pitt website

  ```console
  $ pitt deploy "directory"
  ```
  
    * backups saved to ~/.html-backup directory on unixs.cssd.pitt.edu
  
- **Help**

  ```console
  $ pitt --help
  ```


## TODO:
- [ ] integrate blackboard api
- [ ] integrate box api
- [ ] research any other open data pitt provides
- [ ] unit testing
