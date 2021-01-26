const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// the info in this array is what's being generated into the team.html
const team = [];

// First function that prompts user to give info for manager and adds it to the team array
function addManager() {
    inquirer.prompt([

        {
            type: 'input',
            name: 'managerName',
            message: 'Name of project manager?'
        },
        {
            type: 'input',
            name: 'managerID',
            message: 'What is the manager\'s ID number?'
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: 'What is the manager\'s email?'
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the manager\'s office number?'

        }
    ]).then(res => {
        const manager = new Manager(res.managerName, res.managerID, res.managerEmail, res.officeNumber);
        team.push(manager);
        addTeam()
    })
}
// Creates an Engineer and pushes it to the team array 
function addEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: 'Name of Engineer?'
        },
        {
            type: 'input',
            name: 'engineerID',
            message: 'What is the engineer\'s ID number?'
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: 'What is the engineer\'s email?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the engineer\'s Github?'

        }
    ]).then(res => {
        const engineer = new Engineer(res.engineerName, res.engineerID, res.engineerEmail, res.github);
        team.push(engineer);
        addTeam()
    })
}
// Creates an intern and pushes info to team array
function addIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'internName',
            message: 'Name of Intern?'
        },
        {
            type: 'input',
            name: 'internID',
            message: 'What is the intern\'s ID number?'
        },
        {
            type: 'input',
            name: 'internEmail',
            message: 'What is the intern\'s email?'
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the intern\'s school?'

        }
    ]).then(res => {
        const intern = new Intern(res.internName, res.internID, res.internEmail, res.school);
        team.push(intern);
        addTeam()
    })
}

// Prompts the user if they would like to add another member to the team
function addTeam() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'pizza',
            message: 'What type of member would you like to add to team?',
            choices: [
                'Engineer',
                'Intern',
                'None'
            ]
        }
    ])
    // Pushes user to either addEngineer(), addIntern(), or buildTeam() based off their response
    .then(res => {
        switch (res.pizza) {
            case 'Engineer':
                addEngineer();
                break;
            case 'Intern':
                addIntern();
                break;
            case 'None':
                buildTeam();
        }
    })
}
// Function that generates the file with the team array
function buildTeam() {
    // location, data, format
    fs.writeFileSync(outputPath, render(team), {
        encoding: 'utf-8'
    })
    console.log('(Team Successfully Created)')
}

addManager()

