const inquirer = require("inquirer");
const mysql = require("mysql");
const figlet = require("figlet");
const consoleTable = require("console.table");
const chalk = require("chalk");


var roleID;
var managerID;
var roleArray = [];


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
            "View All Roles",
            "View All Departments",
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
            case "View All Roles":
                viewAllRoles();
                break;    
            case "View All Departments":
                viewAllDepts();
                break;       
            case "Add Employee":
                addEmployee();
                break;
            case "Add Department":
                addDept();
                break;
            case "Add Role":
                addRole();
                break;
            
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
       console.log("\n");
       console.table(res);
       init();
   })
 
   
 }


function viewByDepartment(){
   const query = "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Name,roles.title AS Title, roles.salary AS Salary, departments.dept_name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON e.manager_id = m.id ORDER BY departments.dept_name;";
    
   
  connection.query(query, function (err, res){
      console.log("\n");
      console.table(res);
      init();
  })

  
}

function viewByManager(){
    const query = "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Name,roles.title AS Title, roles.salary AS Salary, departments.dept_name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON e.manager_id = m.id ORDER BY e.manager_id";
     
    
   connection.query(query, function (err, results){
       console.log("\n");
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

                //FIND A WAY TO GRAB ROLES FROM ROLES TABLE-- NOT FROM EMPLOYEES QUERY
                type: "list",
                message: "What is the role of the employee?",
                name: "employeeRole",
                choices: getRoles(),
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
           connection.query("SELECT * FROM roles", function(err, results){
               

                for (let i = 0; i < results.length; i++){
                   if (answers.employeeRole === results[i].title){
                     roleID = results[i].id;
                   }
               }

               connection.query(query, function(err, results){
               
                for (let i = 0; i < results.length; i++){
                 if (answers.employeeManager === results[i].Name){
                     managerID = results[i].id
                 }
             }

             addQuery(roleID, managerID, answers.employeeFirstName, answers.employeeLastName);
 

                
            }) 

            
           })

            
        }) 
    })
 } 

 function addQuery(roleID, managerID, employeeFirstName, employeeLastName){
    connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)", [employeeFirstName, employeeLastName, roleID, managerID], function(err, results){
        if(err) throw err;
        console.log("Employee added to Alliance! \n")
        init();
    });    

    
 }

 function addDept(){
    
     inquirer.prompt({
         type: "input",
         message: "Which department would you like to add?",
         name: "newDepartment"
     }).then(answers =>{
         connection.query("INSERT INTO departments (dept_name) VALUES (?)", [answers.newDepartment], function(err, results){
             console.log("\nNew department added!\n")
             init();
         })
     })
 }

 function addRole(){

    connection.query("SELECT * FROM departments", function(err, results){
        inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "What is the name of the role?",
    
            },
            {
                type: "input",
                name:"salary",
                message: "What is the salary of the role?"
            },
            {
                type: "list",
                name: "corresDept",
                message: "Which department is the role in?",
                choices: function(){
                    const deptArray = [];
                    for (let i = 0; i < results.length; i++){
                        deptArray.push(results[i].dept_name)
                    }
                    return deptArray;
                }
            }
        ]).then(answers =>{
            var deptID;
            for (let i = 0; i < results.length; i++){
                if (answers.corresDept === results[i].dept_name){
                    deptID = results[i].id;
                }
            }

            var salary = parseInt(answers.salary);

            
            connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${answers.roleName}", ${salary}, ${deptID})`, function(err, results){
                if (err) throw err;
                console.log("\n Role added!\n");
                init();
            })
        })
    })

    
    
 }

 function viewAllRoles(){
     connection.query("SELECT roles.title AS Title, roles.salary AS Salary, departments.dept_name AS Department FROM roles INNER JOIN departments ON roles.department_id = departments.id", function(err, results){
         console.log("\n")
         console.table(results);
         init();
     })
 }

 function viewAllDepts(){
    connection.query("SELECT * FROM departments", function(err, results){
        console.log("\n")
        console.table(results);
        init();
    })
}

function updateEmployeeRole(){
    const query = "SELECT e.id, m.id AS managerID, roles.id AS RoleID, CONCAT(e.first_name, ' ', e.last_name) AS Name,roles.title AS Title, roles.salary AS Salary, departments.dept_name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON e.manager_id = m.id ORDER BY departments.dept_name;";

    connection.query(query, function(err, results){
        console.log(results);
        
          inquirer.prompt([
            {
                type: "list",
                name: "employeeToUp",
                message: "Which employee would you like to update?",
                choices: function(){
                    employeeArr = [];
                    for(let i = 0; i < results.length; i++){
                        employeeArr.push(results[i].Name)
                    }
                    return employeeArr;
                }
            },
            {
                type: "list",
                name: "employeeUpRole",
                message: "What is the employee's new role?",
                choices: getRoles()
            }
        ]).then(answers =>{

            for (let i = 0; i < results.length; i++){
                if (answers.employeeToUp === results[i].Name){
                    var empID = results[i].id;
 
                }
                 if (answers.employeeUpRole === results[i].Title){
                    var manID = results[i].managerID;
                    var posID = results[i].RoleID;
                }

            }

            connection.query(`UPDATE employees SET role_id = ${posID}, manager_id = ${manID}  WHERE id = ${empID}`, function(err, results){
                console.log("\n Employee role updated!\n");
                init();
            })

        })  
    })
}

function getRoles(){

    connection.query("SELECT * FROM roles", function(err, results){
        for(var i = 0; i < results.length; i++){
        roleArray.push(results[i].title);        
    }
    })
    
    return roleArray;
}



