const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table')

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'password',
  database: 'employeeTracker_DB',
});

connection.connect((err) => {
  if (err) throw err;
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
    'SELECT first_name, last_name, role_id, manager_id, FROM employee';
  connection.query(query, (err, res) => {
    console.log(res);
    runSearch();
  });
};

const allDepartmentsSearch = () => {
  const query =
    'SELECT department, FROM department';
  connection.query(query, (err, res) => {
    console.log(res);
    runSearch();
  });
};

const allRolesSearch = () => {
  const query =
    'SELECT title, salary, department_id, FROM roles';
  connection.query(query, (err, res) => {
    console.log(res);
    runSearch();
  });
};



const addEmployee = () => {
  const roleOptions = [];
  const query = 'SELECT role.id, role.title FROM role';
  connection.query(query, (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleOptions.push({
        name: res[i].title,
        value: res[i].id
      })
    };
  })

  inquirer.prompt(
      {
        name: 'firstname',
        type: 'input',
        message: "What is your Employee's first name?",
      }, {
        name: 'lastname',
        type: 'input',
        message: "What is your Employee's last name?",
      }, {
        name: 'role',
        type: 'rawlist',
        message: 'Please selest the role option for Employee.',
        choices: roleOptions,
      },


    )

    .then((answer) => {
      const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.firstname}', '${answer.lastname}', '${answer.role}')`
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            runSearch();
        });
    })
};





const addDepartment = () => {

  inquirer.prompt(
      {
        name: 'department',
        type: 'input',
        message: "What is the name of your department?",
      }, 

    )

    .then((answer) => {
      const query = `INSERT INTO department VALUES ('${answer.department}')`
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            runSearch();
        });
    })
};



const addRole = () => {

  inquirer.prompt([
    {
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
        name: 'roleID',
        type: 'input',
        message: 'Enter role ID',
    }
]).then((answer) => {
    const query = `INSERT INTO role (title, salary, role_id) VALUES ('${answer.title}', '${answer.salary},' '${answer.roleID}')`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
})
};



// const rangeSearch = () => {
//   inquirer
//     .prompt([
//       {
//         name: 'start',
//         type: 'input',
//         message: 'Enter starting position: ',
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//       {
//         name: 'end',
//         type: 'input',
//         message: 'Enter ending position: ',
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//     ])
//     .then((answer) => {
//       const query =
//         'SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?';
//       connection.query(query, [answer.start, answer.end], (err, res) => {
//         res.forEach(({ position, song, artist, year }) => {
//           console.log(
//             `Position: ${position} || Song: ${song} || Artist: ${artist} || Year: ${year}`
//           );
//         });
//         runSearch();
//       });
//     });
// };

// const songSearch = () => {
//   inquirer
//     .prompt({
//       name: 'song',
//       type: 'input',
//       message: 'What song would you like to look for?',
//     })
//     .then((answer) => {
//       console.log(answer.song);
//       connection.query(
//         'SELECT * FROM top5000 WHERE ?',
//         { song: answer.song },
//         (err, res) => {
//           if (res[0]) {
//             console.log(
//               `Position: ${res[0].position} || Song: ${res[0].song} || Artist: ${res[0].artist} || Year: ${res[0].year}`
//             );
//           } else {
//             console.error(`No results for ${answer.song}`);
//           }
//           runSearch();
//         }
//       );
//     });
// };

// const songAndAlbumSearch = () => {
//   inquirer
//     .prompt({
//       name: 'artist',
//       type: 'input',
//       message: 'What artist would you like to search for?',
//     })
//     .then((answer) => {
//       let query =
//         'SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ';
//       query +=
//         'FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ';
//       query +=
//         '= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position';

//       connection.query(query, [answer.artist, answer.artist], (err, res) => {
//         console.log(`${res.length} matches found!`);
//         res.forEach(({ year, position, artist, song, album }, i) => {
//           const num = i + 1;
//           console.log(
//             `${num} Year: ${year} Position: ${position} || Artist: ${artist} || Song: ${song} || Album: ${album}`
//           );
//         });

//         runSearch();
//       });
//     });