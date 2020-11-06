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
            "View All Employees",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "I'm Finished"
        ]
    })
    .then(answer =>{
        const choice = answer.mainMenu;

        switch(choice){

            case "View All Employees":
                viewAll();
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
            case "Im Finished":
                connection.end();
                break;
        }
    })
}

function viewAll(){
   const query = "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Name,roles.title AS Title, roles.salary AS Salary, departments.dept_name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON e.manager_id = m.id;";
    
   
  connection.query(query, function (err, res){
      console.table(res);
      init();
  })

  
}



