const inquirer = require("inquirer");
const mysql = require("mysql");
const figlet = require("figlet");
const consoleTable = require("console.table");
const chalk = require("chalk");

 const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Slowdive1!",
  database: "alliance_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  greeting();

}); 



function greeting(){
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
        console.log(chalk.green(data));
        console.log("-".repeat(95));
        init();
    });
}

function init(){
    inquirer
    .prompt({
        name: "mainMenu",
        type: "list",
        message: "What would you like to do?",
        choices : [
            "View All Employees By Id",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role"

        ]
    })
    .then(answer =>{
        const choice = answer.mainMenu;

        switch(choice){
            case "View All Employees By Id":
                viewById();
                break;
            case "View All Employees By Department":
                viewByDept();
                break;
            case "View All Employees By Manager":
                viewByMan();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Department":
                addDept();
                break;
            case "Add Role":
                addRole();
            case "Update Employee Role":
                updateEmployeeRole();
                break;
        }
    })
}

function viewByDept(){
    console.log("Switch statement worked!");
}

function viewById(){
    console.log("Yes!!!! Switch statements fuck!");
}

