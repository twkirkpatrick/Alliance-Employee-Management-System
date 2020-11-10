//DEPENDENCIES
const inquirer = require("inquirer");
const mysql = require("mysql");
const figlet = require("figlet");
const consoleTable = require("console.table");
const chalk = require("chalk");

//GLOBAL VARIABLES
var roleID;
var managerID;
var roleArray = [];

//MYSQL DATABASE CONNECTION
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


//GREETING
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

//CONTROLLER FUNCTION/MAIN MENU
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
            "Remove Employee",
            "I'm Finished"
        ]
    })
    .then(answer =>{
        const choice = answer.mainMenu;
        //Switch statement used for checking the function that the user picks
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
            case "Remove Employee":
                removeEmployee(); 
                break;
            case "I'm Finished":
                fareWell();
                break;
        }
    })
}

//View all employees ordered by ID number
function viewByID(){
    const query = "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Name,roles.title AS Title, roles.salary AS Salary, departments.dept_name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON e.manager_id = m.id ORDER BY e.id";
     
    
   connection.query(query, function (err, res){
       console.log("\n");
       console.table(res);
       init();
   })
 
   
 }

//View all employees ordered by department
function viewByDepartment(){
   const query = "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Name,roles.title AS Title, roles.salary AS Salary, departments.dept_name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON e.manager_id = m.id ORDER BY departments.dept_name;";
    
   
  connection.query(query, function (err, res){
      console.log("\n");
      console.table(res);
      init();
  })

  
}

//View all employees ordered by manager
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

                
                type: "list",
                message: "What is the role of the employee?",
                name: "employeeRole",
                //This method grabs all of the roles from the roles table for the user to pick from
                choices: getRoles()
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "employeeManager",
                //This method grabs all of the managers and pushes them into an array for the user to pick from
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
               
                //For loop iterates through the roles and checks to see if the employee role matches a title and assigns the corresponding Role ID to a variable to be injected into the addQuery function
                for (let i = 0; i < results.length; i++){
                   if (answers.employeeRole === results[i].title){
                     roleID = results[i].id;
                   }
               }

               connection.query(query, function(err, results){
               //For loop iterates through the results and if the manager that the user picked matches a manager in the results query, the managerID is assigned to a variable to be injected into the addQuery function
                for (let i = 0; i < results.length; i++){
                 if (answers.employeeManager === results[i].Name){
                     managerID = results[i].id
                 }
             }

             //addQuery function which takes in roleID, managerID, and the name of the new employee as parameters
             addQuery(roleID, managerID, answers.employeeFirstName, answers.employeeLastName);
 

                
            }) 

            
           })

            
        }) 
    })
 } 
 
 //Function that creates a new employee with an SQL query based on input from the user
 function addQuery(roleID, managerID, employeeFirstName, employeeLastName){
    connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)", [employeeFirstName, employeeLastName, roleID, managerID], function(err, results){
        if(err) throw err;

        
        console.log("\nEmployee added to Alliance! \n")
        init();
    });    

    
 }

 //Function that creates a new department with an SQL query based on input from the user
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

 //Function that creates a new role with an SQL query based on input from the user
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
                //Method that grabs all of the departments and puts them into an array
                choices: function(){
                    const deptArray = [];
                    for (let i = 0; i < results.length; i++){
                        deptArray.push(results[i].dept_name)
                    }
                    return deptArray;
                }
            }
        ]).then(answers =>{
            //For loop iterates through the departments, and if it finds a match, the id of the department is assigned to a variable to be injected into the SQL query
            for (let i = 0; i < results.length; i++){
                if (answers.corresDept === results[i].dept_name){
                    var deptID = results[i].id;
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

 //Simple function that grabs all of the roles from the database and displays them to the user
 function viewAllRoles(){
     connection.query("SELECT roles.title AS Title, roles.salary AS Salary, departments.dept_name AS Department FROM roles INNER JOIN departments ON roles.department_id = departments.id", function(err, results){
         console.log("\n")
         console.table(results);
         init();
     })
 }

 //Simple function that grabs all of the departments from the database and displays them to the user
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
                //Method that grabs all of the employees and puts them into an array for the user to choose from
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

            //For loop iterates through the results and if the employee that the user picks matches a name in the database, it sets the ID of the employee to variable
            for (let i = 0; i < results.length; i++){
                if (answers.employeeToUp === results[i].Name){
                    var empID = results[i].id;
 
                }
                //Check to see if the updated employee role the user picked matches a role, and then assign the manager ID and roleID to variables to be injected into the UPDATE query
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
 //Helper function that grabs all the roles and puts them into an array
function getRoles(){

    connection.query("SELECT * FROM roles", function(err, results){
        for(var i = 0; i < results.length; i++){
        roleArray.push(results[i].title);        
    }
    })
    
    return roleArray;
}

//Function that removes a selected employee
function removeEmployee(){
    connection.query("SELECT * FROM employees", function(err, results){
        inquirer.prompt({
            type: "list",
            message: "Which employee would you like to remove?",
            name: "removeEmployee",
            choices: function(){
                removeArray = [];
                for(let i = 0; i < results.length; i++){
                    removeArray.push(`${results[i].first_name} ${results[i].last_name}`)
                 
                }
                
                return removeArray;
            }
        }).then(answers => {
            //Used split method to split the employee name into an array, so the first and last name are available as separate values for DELETE query
            var nameSplit = answers.removeEmployee.split(" ");
           
            connection.query(`DELETE FROM employees WHERE first_name = "${nameSplit[0]}" AND last_name = "${nameSplit[1]}" `, function(err, results){
                if (err) throw err;
                console.log("\n Employee removed from system!\n");
                init();
            })
        })
    })
}

function fareWell(){
    figlet.text('Thank you for using Alliance', {
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
        connection.end();
    });
}



