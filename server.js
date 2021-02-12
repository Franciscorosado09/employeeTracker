const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table')
const chalk = require('chalk');
const {
  bold
} = require('chalk');


const port = 3306

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',


  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'password',
  database: 'employeeTracker_DB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log("\x1b[32m", 'You are connected on local host 3060')
  console.log(" ")
  console.log(" ")
  console.log(chalk.white.bold('Welcome to Employee Tracker'), chalk.magenta.underline('Meangirls Edition'));
  console.log(" ")
  console.log(" ")


  runSearch();
});

const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'View all departments',
        'View all roles',
        'Add employee',
        'Add department',
        'Add role',
        'Update employee info',
        // 'bonus',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all employees':
          allEmployeesSearch();
          break;

        case 'View all departments':
          allDepartmentsSearch();
          break;

        case 'View all roles':
          allRolesSearch();
          break;

        case 'Add employee':
          addEmployee();
          break;

        case 'Add department':
          addDepartment();
          break;

        case 'Add role':
          addRole();
          break;

        case 'Update employee info':
          updateEmployee();
          break;

          // case 'bonus':
          //   songAndAlbumSearch();
          //   break;

        case 'Exit':
          exitApp();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};



const allEmployeesSearch = () => {
  const query =
    'SELECT first_name, last_name, role_id, manager_id FROM employee';


  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table("\x1b[35m", res)
    runSearch();
  });
};

const allDepartmentsSearch = () => {
  const query =
    'SELECT department FROM department ORDER BY department.id';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\x1b[35m", res);
    runSearch();
  });
};

const allRolesSearch = () => {
  const query =
    'SELECT title, salary, department_id FROM roles';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\x1b[35m", res);
    runSearch();
  });
};



const addEmployee = () => {
  const roleOptions = [];
  const query = 'SELECT roles.id, roles.title FROM roles';
  connection.query(query, (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleOptions.push({
        name: res[i].title,
        value: res[i].id
      })
    };
  })

  inquirer.prompt([{
        name: 'first_name',
        type: 'input',
        message: "What is your Employee's first name?",
      },
      {
        name: 'last_name',
        type: 'input',
        message: "What is your Employee's last name?",
      },
      {
        name: 'role',
        type: 'rawlist',
        message: 'Please selest the role option for Employee.',
        choices: roleOptions,
      },


    ])

    .then((answer) => {

      const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.first_name}', '${answer.last_name}', '${answer.role}')`
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(" ")
        console.log(" ")
        console.log(chalk.magenta.underline("Employee Added - So Fetch"))
        console.log(" ")
        console.log(" ")
        runSearch();
      });
    })
};





const addDepartment = () => {


  inquirer.prompt([{
        name: 'department',
        type: 'input',
        message: "What is the name of your department?",
      },

    ])

    .then((answer) => {
      const query = `INSERT INTO department (department) VALUES ('${answer.department}')`
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(" ")
        console.log(" ")
        console.log(chalk.magenta.underline("New Department Added - On Wednesdays we wear pink! "))
        console.log(" ")
        console.log(" ")
        runSearch();
      });
    })
};



const addRole = () => {


  inquirer.prompt([{
      name: 'title',
      type: 'input',
      message: 'Please enter the title of role',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Please enter salary for role',
    },

    {
      name: "departmentID",
      type: "input",
      message: "Please add Department ID from existing deparments:",
    },
  ]).then((answer) => {
    const query = `INSERT INTO roles (title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', '${answer.departmentID}')`
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log(" ")
      console.log(" ")
      console.log(chalk.magenta.underline("New Role Added - Get in loser, we're going shopping! "))
      console.log(" ")
      console.log(" ")
      runSearch();
    });
  })
};






const updateEmployee = () => {

  const roleOptions = [];
  const query = 'SELECT roles.id, roles.title FROM roles';
  connection.query(query, (err, res) => {
    
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleOptions.push({
        name: res[i].title,
        value: res[i].id
      })
    };
  })
  
  inquirer
    .prompt([


      {
        name: "updateEmployee",
        type: "input",
        message: "Please input the Employee's ID you want to update.",
      },
      {
        name: "newRoleID",
        type: "rawlist",
        choices: roleOptions,

      },

    ])
    .then((answer) => {

      
      const query= `UPDATE employee SET role_id = '${answer.newRoleID}' WHERE id = '${answer.updateEmployee}'`;

      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(" ")
        console.log(" ")
        console.log(chalk.magenta.underline("You've updated employees information - Four for your Glen Coco! You go, Glen Coco! "))
        console.log(" ")
        console.log(" ")

        runSearch();
      });
    })

  

};












const exitApp = () => {

  console.log(" ")
  console.log(" ")
  console.log(chalk.magenta.underline("Exited Employee Tracker app - You can't sit with us! "))
  console.log(" ")
  console.log(" ")

  connection.end()


};