const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table')

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



// const addEmployee = () => {
//   const roleOptions = [];
//   const query = 'SELECT role.id, role.title FROM role';
//   connection.query(query, (err, res) => {
//     if (err) throw err;
//     for (var i = 0; i < res.length; i++) {
//       roleOptions.push({
//         name: res[i].title,
//         value: res[i].id
//       })
//     };
//   })

//   inquirer.prompt(
//       {
//         name: 'firstname',
//         type: 'input',
//         message: "What is your Employee's first name?",
//       }, {
//         name: 'lastname',
//         type: 'input',
//         message: "What is your Employee's last name?",
//       }, {
//         name: 'role',
//         type: 'rawlist',
//         message: 'Please selest the role option for Employee.',
//         choices: roleOptions,
//       },


//     )

//     .then((answer) => {
//       const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.firstname}', '${answer.lastname}', '${answer.role}')`
//         connection.query(query, (err, res) => {
//             if (err) throw err;
//             console.table(res);
//             runSearch();
//         });
//     })
// };





// const addDepartment = () => {

//   inquirer.prompt(
//       {
//         name: 'department',
//         type: 'input',
//         message: "What is the name of your department?",
//       }, 

//     )

//     .then((answer) => {
//       const query = `INSERT INTO department VALUES ('${answer.department}')`
//         connection.query(query, (err, res) => {
//             if (err) throw err;
//             console.table(res);
//             runSearch();
//         });
//     })
// };



// const addRole = () => {

//   inquirer.prompt([
//     {
//         name: 'title',
//         type: 'input',
//         message: 'Please enter the title of role',
//     },
//     {
//         name: 'salary',
//         type: 'input',
//         message: 'Please enter salary for role',
//     },
//     {
//         name: 'roleID',
//         type: 'input',
//         message: 'Enter role ID',
//     }
// ]).then((answer) => {
//     const query = `INSERT INTO role (title, salary, role_id) VALUES ('${answer.title}', '${answer.salary},' '${answer.roleID}')`
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         runSearch();
//     });
// })
// };



