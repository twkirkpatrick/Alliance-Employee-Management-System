INSERT INTO departments (dept_name)
VALUES ("Marketing"), ("Sales"), ("Development");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Front End Developer", 75000, 3),
("Tech Lead", 150000, 3),
("Director of Marketing", 120000, 1),
("Account Manager", 65000, 2),
("Director of Sales", 115000, 2),
("Full Stack Developer", 80000, 3), 
("SEO Analyst", 75000, 1),
("Account Strategist", 90000, 1),
("Area Manager", 90000, 2),
("UX/UI Designer", 60000, 3),
("Inside Sales", 50000, 2),
("SEM Analyst", 70000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("James", "Godfrey", 5, null),
("Tony", "Bishop", 3, null),
("Graham", "Ball", 2, null),
("Tom", "Raymond", 6, 3),
("Alice", "Chen", 10, 3),
("Chad", "Connor", 12, 2),
("Dan", "Parker", 9, 1),
("Pete", "Thomas", 1, 3),
("Polly", "Gump", 8, 2),
("Virginia", "Wilson", 7, 2),
("Hector", "Raymond", 4, 1),
("Matt", "Willis", 11, 1);


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


