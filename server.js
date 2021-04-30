const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'RupertRobert616!',
	database: 'employee_trackerDB',
});

connection.connect((err) => {
	if (err) throw err;
	makeItSo();
});

function makeItSo() {
  console.log(`






  

  ███████ ███    ███ ██████  ██      ██████ ██    ██ ███████ ███████     
  ██      ████  ████ ██   ██ ██     ██    ██ ██  ██  ██      ██          
  █████   ██ ████ ██ ██████  ██     ██    ██  ████   █████   █████       
  ██      ██  ██  ██ ██      ██     ██    ██   ██    ██      ██          
  ███████ ██      ██ ██      ███████ ██████    ██    ███████ ███████     
                                                                         
  ████████ ██████   █████   ██████ ██   ██ ███████ ██████                
     ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██               
     ██    ██████  ███████ ██      █████   █████   ██████                
     ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██               
     ██    ██   ██ ██   ██  ██████ ██   ██ ███████ ██   ██                            
  `)
  runStart()
}

function runStart() {
	inquirer
		.prompt({
			name: 'selection',
			type: 'list',
			message: 'Welcome -- Please make your selection:',
			choices: [
				'View All Employees',
				'View Total Salaries',
				'End Program',
			],
		})
		.then(function (res) {
			switch (res.selection) {
				case 'View All Employees':
					viewAll();
					break;
          
				case 'View Total Salaries':
					viewSalaries();
					break;

				case 'End Program':
					endProgram();
					break;
			}
		});
}

function viewAll() {
	connection.query(
		`SELECT employee.first_name, employee.last_name, role.salary, role.title, department.name as "Department"
      FROM employee_trackerDB.employee
      INNER JOIN role ON employee.role_id = role.id
      INNER JOIN department ON role.department_id = department.id`,

		function (err, res) {
			if (err) throw err;

			console.table(res); 
			runStart();
		}
	);
}

function viewSalaries() {
	connection.query(
		'SELECT SUM(role.salary) AS "Total Salaries" FROM employee_trackerDB.role',

		function (err, res) {
			if (err) throw err;

			console.table(res);
			runStart();
		}
	);
}

function endProgram() {
	console.log(`  
  
  Program ended...


 ██████   ██████   ██████  ██████        ██████ ██    ██ ███████ 
 ██       ██    ██ ██    ██ ██   ██       ██   ██ ██  ██  ██      
 ██   ███ ██    ██ ██    ██ ██   ██ █████ ██████   ████   █████   
 ██    ██ ██    ██ ██    ██ ██   ██       ██   ██   ██    ██      
  ██████   ██████   ██████  ██████        ██████    ██    ███████ 
                                                                  
                                                                  
 
  `);
	connection.end();
}
