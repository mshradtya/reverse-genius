import unzipper from 'unzipper';
import path from 'path';
import fs from 'fs';
import Model from '../AI Model/Model';
import { Data } from './JSMethods';
import { Applications } from './FileUpload';

const { spawn } = require('child_process');

/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////

function getAllJavaFiles(dirPath: any, arrayOfFiles: any) {
	arrayOfFiles = arrayOfFiles || []; // Initialize as an empty array if not provided

	const files = fs.readdirSync(dirPath);

	files.forEach(function (file) {
		const filePath = path.join(dirPath, file);
		const isDirectory = fs.statSync(filePath).isDirectory();
		const isJSFile = file.endsWith('.java');

		if (isDirectory) {
			arrayOfFiles = getAllJavaFiles(filePath, arrayOfFiles);
		} else if (isJSFile) {
			arrayOfFiles.push(filePath);
		}
	});

	return arrayOfFiles;
}

function extractJavaFunctionsFromFile(pythonScriptPath: any, type: any, user: any, subfolderName: any) {
	const pythonProcess = spawn('python', ['E:\\codes\\reverse-genius\\server\\src\\controllers\\readJavaFunctions.py', pythonScriptPath]);

	let extractedFunctions = '';

	pythonProcess.stdout.on('data', (data: any) => {
		extractedFunctions += data.toString();
	});

	pythonProcess.on('close', async (code: any) => {
		if (code === 0) {
			try {
				const functions = JSON.parse(extractedFunctions);
				console.log(functions);
				processItems(functions, pythonScriptPath, type, user, subfolderName);
			} catch (parseError) {
				console.error(`Error parsing JSON output: ${parseError}`);
			}
		} else {
			console.error(`java script exited with code ${code}`);
		}
	});
}

async function processItems(functions: any, pythonScriptPath: any, type: any, user: any, subfolderName: any) {
	console.log(functions);
	for (const item of functions) {
		const result = await Model.AIOpen(type, item.content);

		const exits = await Data.findOne({ functionName: item.name });
		const filter = { functionName: item.name };
		const update = {
			functionCode: item.content,
			functionName: item.name,
			path: pythonScriptPath,
			functionType: item.type,
			type: type,
			functionParent: item.parent,
			functionExplanation: result,
			user: user,
			applicationName: subfolderName
		};

		if (exits) {
			const doc = await Data.findOneAndUpdate(filter, update, {
				new: true
			});
			console.log(doc);
		} else {
			const person = await new Data({
				functionCode: item.content,
				functionName: item.name,
				path: pythonScriptPath,
				functionType: item.type,
				type: type,
				functionParent: item.parent,
				functionExplanation: result,
				user: user,
				applicationName: subfolderName
			}).save();
		}

		// console.log(result);
	}
	await processItem(subfolderName);

	// Code here will execute after the for loop is completed
	console.log('For loop has completed.');
}

async function processItem(applicationName: any) {
	return new Promise<any>((resolve) => {
		setTimeout(async () => {
			const exits = await Applications.findOne({ ApplicationName: applicationName });
			const filter = { ApplicationName: applicationName };
			const update = {
				ready: true
			};

			if (exits) {
				const doc = await Applications.findOneAndUpdate(filter, update, {
					new: true
				});
				console.log(doc);
			}

			resolve(null);
		}, 1000); // Simulating a delay of 1 second
	});
}
// Function to find all Python functions in a code file
export default { getAllJavaFiles, extractJavaFunctionsFromFile };
