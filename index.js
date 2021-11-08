const colors = require('colors');
const { prompt } = require("inquirer");
const { inherits } = require('util');
const db = require("./db");
const chalk = require('chalk');
const logo = require("asciiart-logo");


init();

//* Display logo Text, load main prompts
function init() {
    const logoText = logo({ 
        name: "Company X Employee Manager",
        textColor: 'blue',
        logoColor: 'bold-green',
        borderColor: 'bold-red',
        font: 'Georgia11',
    })
    .render();
  
    console.log(logoText);
 


} 