const inquirer = require('inquirer')
const fs = require('fs');
// const makeReadme = require('./readmeGenerator');

const makeReadme = (answers) => {
let licenseChosen = ""
	if (answers.license === 'MIT') {
		licenseChosen = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
	} else if (answers.license === 'APACHE') {
		licenseChosen = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
	} else if (answers.license === 'MOZILLA PUBLIC LICENSE 2.0'){
		licenseChosen = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`
	} else if (answers.license === 'THE UNLICENSE') {
		licenseChosen = `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`
	} else if (answers.license === 'GNU GPL v2'){
		licenseChosen = `[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)`
	} else {
		licenseChosen = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
	}
	let finalDoc = `

# ${answers.projectTitle}
========================
\n
![Screenshot or Gif of the app.](./assets/screenshot.${answers.fileExtension})

### Description
${answers.description}

## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage-Information)
* [License](#License)
* [Contribution Guidelines](#Contribution-Guidelines)
* [Test Instructions](#Test-Instructions)
* [Contact](#Contact-Information)

### Installation
${answers.install}

### Usage Information
${answers.usage}

### License Information
${licenseChosen}

### Contribution Guidelines
${answers.contribute}

### Test Instructions
${answers.testInstructions}
 
### Contact Information
[Email Me](${answers.email})\n
[Github](https://github.com/${answers.gitUsername})

`;

			return finalDoc;

}

//input - Possible values: input, number, confirm, list, rawlist, expand, checkbox, password, editor
const questions = [
	{
		type: 'input',
		message: 'Project Title',
		name: 'projectTitle',
	},
	{
		type: 'input',
		message: 'Screenshot File Extension',
		name: 'fileExtension',
	},
	{
		type: 'editor',
		message: 'Give a project description.',
		name: 'description',
	},
	{
		type: 'editor',
		message: 'Installation instructions',
		name: 'install',
	},
	{
		type: 'list',
		message: 'Choose License Type',
		choices: ["MIT", "APACHE", "MOZILLA PUBLIC LICENSE 2.0", "GNU GPL v2", "THE UNLICENSE" ],
		name: 'license',
	},
	{
		type: 'input',
		message: 'Contribution Guidelines',
		name: 'contribute',
	},
	{
		type: 'input',
		message: 'Usage Information',
		name: 'usage',
	},
	{
		type: 'input',
		message: 'Test Instructions',
		name: 'testInstructions',
	},
	{
		type: 'input',
		message: 'Git Username',
		name: 'gitUsername',
	},
	{
		type: 'input',
		message: 'Email Address',
		name: 'email',
	}
	
]

function init() {
	inquirer
	.prompt(questions)

	.then(answers => {
		// console.log(makeReadme(answers))
		fs.appendFile("README.md", makeReadme(answers, '\t'), (err) => {
			console.log(`File could not be written due to ${err}`)	
		})
		
	})
	.catch(error => {
		if (error.isTtyError) {
			// Prompt couldn't be rendered in the current environment
		} else {
			// Something else went wrong
		}
	});
}

// // Function call to initialize app
init();
