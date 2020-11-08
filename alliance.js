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
            "View Employees By ID",
            "View Employees By Department",
            "View Employees By Manager",
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

            case "View Employees By ID":
                viewByID();
                break;
            case "View Employees By Department":
                viewByDepartment();
                break;
            case "View Employees By Manager":
                viewByManager();
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

function viewByID(){
    const query = "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Name,roles.title AS Title, roles.salary AS Salary, departments.dept_name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON e.manager_id = m.id ORDER BY e.id";
     
    
   connection.query(query, function (err, res){
       console.table(res);
       init();
   })
 
   
 }


function viewByDepartment(){
   const query = "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Name,roles.title AS Title, roles.salary AS Salary, departments.dept_name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON e.manager_id = m.id;";
    
   
  connection.query(query, function (err, res){
      console.table(res);
      init();
  })

  
}

function viewByManager(){
    const query = "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Name,roles.title AS Title, roles.salary AS Salary, departments.dept_name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON e.manager_id = m.id ORDER BY e.manager_id";
     
    
   connection.query(query, function (err, results){
       console.table(results);
       init();
   })
 
   
 }

  function addEmployee(){
    const query = "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Name,roles.title AS Title, roles.salary AS Salary, departments.dept_name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON e.manager_id = m.id ORDER BY e.manager_id";

    connection.query(query, function (err, results){
       
        
       
         inquirer.prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "employeeFirstName"
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "employeeLastName"
            },
            {
                type: "list",
                message: "What is the role of the employee?",
                name: "employeeRole",
                choices: function(){
                    var roleArray = [];
                    for(var i = 0; i < results.length; i++){
                        roleArray.push(results[i].Title);
                        
                    }
                    return roleArray;
                    

                }
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "employeeManager",
                
                choices: function(){
                    var managerArray = [];
                    for(var i = 0; i < results.length; i++){
                        managerArray.push(results[i].Name);
                        
                    }
                    return managerArray;
                    

                }
            } 
        ]).then(answers => {
            let roleID;
            switch(answers.employeeRole){
                
                case "Front End Developer":
                    roleID = 1; 
                    break;
                case "Tech Lead":
                    roleID = 2;
                    break;
                case "Director of Marketing":
                    roleID = 3;
                    break;    
                case "Account Manager":
                    roleID = 4;
                    break;
                case "Director of Sales":
                    roleID = 5;
                    break;
                case "Full Stack Developer":
                    roleID= 6;
                case "SEO Analyst":
                    roleID = 7;
                    break;
                case "Account Strategist":
                    roleID = 8;
                    break;
                case "Area Manager":
                    roleID = 9;
                    break;
                case "UX/UI Designer":
                    roleID = 10;
                    break;
                case "Inside Sales":
                    roleID = 11;
                    break;
                case "SEM Analyst":
                    roleID = 12;
                    break;
            }

            let managerID;
            switch(answers.employeeManager){
                
                case "James Godfrey":
                    managerID = 1; 
                    break;
                case "Tony Bishop":
                    managerID = 2;
                    break;
                case "Graham Ball":
                    managerID = 3;
                    break;    
                case "Tom Raymond":
                    managerID = 4;
                    break;
                case "Alice Chen":
                    managerID = 5;
                    break;
                case "Chad Connor":
                    managerID = 6;
                case "Dan Parker":
                    managerID = 7;
                    break;
                case "Pete Thomas":
                    managerID = 8;
                    break;
                case "Polly Gump":
                    managerID = 9;
                    break;
                case "Virginia Wilson":
                    managerID = 10;
                    break;
                case "Hector Raymond":
                    managerID = 11;
                    break;
                case "Matt Willis":
                    managerID = 12;
                    break;
            }

            connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)", [answers.employeeFirstName, answers.employeeLastName, roleID,managerID], function(err, results){
                if(err) throw err;
                init();
            });

            
        }) 
    })
 } 



