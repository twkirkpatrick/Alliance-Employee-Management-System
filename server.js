const inquirer = require("inquirer");
const mysql = require("mysql");
const figlet = require("figlet");

/* const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Slowdive1!",
  database: "alliance_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  
}); */


 
/* figlet('Hello World!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
}); */

figlet.text('Welcome to Alliance', {
    font: 'Slant',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 150,
    whitespaceBreak: true
}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
    console.log("-".repeat(95));
});