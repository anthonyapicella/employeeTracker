const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'RupertRobert616!',
	database: 'employee_trackerDB',
});

// run application function on connection

connection.connect((err) => {
	if (err) throw err;
	makeItSo();
});

// run application
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
`);

	// inquirer function
	runStart();
}

function runStart() {
	// user chooses how to begin
	inquirer
		.prompt({
			name: 'selection',
			type: 'list',
			message: 'Please make your selection: ',
			choices: [
				'View All Employees',
				'View All Employees by Role',
				'View All Employees by Department',
				'Add New Employee',
				'Add New Role',
				'View Total Salaries',
				'End Program',
			],
		})
		.then(function (res) {
			switch (res.selection) {
				case 'View All Employees':
					viewAll();
					break;

				case 'View All Employees by Role':
					viewAllRole();
					break;

				case 'View All Employees by Department':
					viewAllDepartment();
					break;

				case 'Add New Employee':
					addNewEmployee();
					break;

				case 'Add New Role':
					addNewRole();
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

function viewAllRole() {
	connection.query(
		'SELECT role.title FROM employee_trackerDB.role',
		function (err, res) {
			if (err) throw err;

			inquirer
				.prompt([
					{
						name: 'roleSelection',
						type: 'list',
						choices: function () {
							var roleArray = [];
							for (var i = 0; i < res.length; i++) {
								roleArray.push(res[i].title);
							}
							return roleArray;
						},
						message: 'Please select a role:',
					},
				])
				.then(function (answer) {
					console.log(answer);
					connection.query(
						`SELECT employee.first_name, employee.last_name, role.salary, role.title, department.name as "Department"
        FROM employee_trackerDB.employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        WHERE role.title LIKE "${answer.roleSelection}"`,
						function (err, res) {
							if (err) throw err;

							console.table(res);
							runStart();
						}
					);
				});
		}
	);
}

function viewAllDepartment() {
	connection.query(
		'SELECT department.name FROM employee_trackerDB.department',
		function (err, res) {
			if (err) throw err;

			inquirer
				.prompt([
					{
						name: 'deptSelection',
						type: 'list',
						choices: function () {
							var deptArray = [];
							for (var i = 0; i < res.length; i++) {
								deptArray.push(res[i].name);
							}
							return deptArray;
						},
						message: 'Please select a Department:',
					},
				])
				.then(function (answer) {
					console.log(answer);
					connection.query(
						`SELECT employee.first_name, employee.last_name, role.salary, role.title, department.name as "Department"
        FROM employee_trackerDB.employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        WHERE department.name LIKE "${answer.deptSelection}"`,
						function (err, res) {
							if (err) throw err;

							console.table(res);
							runStart();
						}
					);
				});
		}
	);
}

function addNewEmployee() {
	connection.query(
		'SELECT role.title, role.id FROM employee_trackerDB.role',
		function (err, res) {
			if (err) throw err;

			inquirer
				.prompt([
					{
						name: 'first_name',
						type: 'input',
						message: 'Employees first name:',
					},
					{
						name: 'last_name',
						type: 'input',
						message: 'Employees last name:',
					},
					{
						name: 'role',
						type: 'list',
						message: 'Choose assigned role:',
						name: 'selection',
						type: 'list',
						choices: function () {
							var roleArray = [];
							for (var i = 0; i < res.length; i++) {
								roleArray.push(res[i].title);
							}
							return roleArray;
						},
					},
				])
				.then(function (answer) {
					var role_id = answer.selection;

					for (var i = 0; i < res.length; i++) {
						if (res[i].title == answer.selection) {
							role_id = res[i].id;
						}
					}

					connection.query(
						'INSERT INTO employee SET ? ',
						{
							first_name: answer.first_name,
							last_name: answer.last_name,
							role_id: role_id,
						},
						function (err) {
							if (err) throw err;

							console.log(
								`
                Welcome: ${answer.selection}, ${answer.first_name} ${answer.last_name}.
                `
							);

							runStart();
						}
					);
				});
		}
	);
}

function addNewRole() {
	connection.query(
		'SELECT department.name, department.id FROM employee_trackerDB.department',
		function (err, res) {
			if (err) throw err;

			inquirer
				.prompt([
					{
						name: 'deptSelection',
						type: 'list',
						choices: function () {
							var deptArray = [];
							var deptArrayID = [];
							for (var i = 0; i < res.length; i++) {
								deptArray.push(res[i].name);
								deptArrayID.push(res[i].id);
							}
							return deptArray;
						},
						message: 'Select a department:',
					},
					{
						name: 'title',
						type: 'input',
						message: 'Enter title:',
					},
					{
						name: 'salary',
						type: 'input',
						message: 'Monthly credits:',
					},
				])
				.then(function (answer) {
					var department_id = answer.deptSelection;

					for (var i = 0; i < res.length; i++) {
						if (res[i].name === answer.deptSelection) {
							department_id = res[i].id;
						}
					}

					connection.query(
						'INSERT INTO role SET ?',
						{
							title: answer.title,
							salary: answer.salary,
							department_id: department_id,
						},
						function (err) {
							if (err) throw err;

							console.log(
								`
                New position created in the ${answer.deptSelection} Department: ${answer.title}, earning ${answer.salary} Federation Credits per month.
                `
							);

							runStart();
						}
					);
				});
		}
	);
}

// get this function to return sums based on departments. maybe using **viewAllDepartment**
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
                                                                  
  
 'Live long, and prosper'                                                              
 
`);
	connection.end();
}
