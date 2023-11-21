import path from 'path';
import fs from 'fs';
import Model from '../AI Model/Model';
import mongoose, { Schema } from 'mongoose';
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

/////////////////////////////////////////////////////////////////////////

var Any = new Schema(
	{
		functionCode: {
			type: String
		},
		functionName: {
			type: String
		},
		path: {
			type: String
		},
		functionType: {
			type: String
		},
		type: {
			type: String
		},
		isClass: {
			type: Boolean
		},
		functionParent: {
			type: String
		},
		functionExplanation: {
			type: String
		},
		user: {
			type: String
		},
		applicationName: {
			type: String
		}
	},

	{
		timestamps: true
	}
);

export const Data = mongoose.model('Functions', Any);

/////////////////////////////////////////////////////////////////////////
function getAllFiles(dirPath: any, arrayOfFiles: any) {
	arrayOfFiles = arrayOfFiles || []; // Initialize as an empty array if not provided

	const files = fs.readdirSync(dirPath);

	files.forEach(function (file) {
		const filePath = path.join(dirPath, file);
		const isDirectory = fs.statSync(filePath).isDirectory();
		const isJSFile = file.endsWith('.js') || file.endsWith('.jsx');

		if (isDirectory) {
			arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
		} else if (isJSFile) {
			arrayOfFiles.push(filePath);
		}
	});

	return arrayOfFiles;
}

// Function to extract functions from JavaScript code
function extractFunctionsFromCode(jsCode: any, filePath: any) {
	const functions: any = [];
	const functionStack: any = [];
	let currentMainFunction: any = null;
	const classHierarchy: any = {};

	const ast = parser.parse(jsCode, {
		sourceType: 'module',

		plugins: ['jsx'] // Enable JSX parsing
	});

	// Track whether we are inside JSX code
	let insideJSX = false;
	let currentFunction: any = null;

	// Visit each node in the Abstract Syntax Tree (AST)
	traverse(ast, {
		FunctionDeclaration(path: any) {
			const functionName = path.node.id.name;
			const functionContent = jsCode.slice(path.node.start, path.node.end);

			if (currentFunction) {
				// Nested function; set its parent
				functions.push({ name: functionName, content: functionContent, type: 'Child Function', parent: currentFunction });
			} else {
				// Top-level function
				functions.push({ name: functionName, content: functionContent, type: 'Main Function', parent: null });
			}

			currentFunction = functionName; // Set the current function as the parent
			functionStack.push(functionName); // Push the function name onto the stack
		},
		FunctionExpression(path: any) {
			if (path.node.id) {
				const functionName = path.node.id.name;
				const functionContent = jsCode.slice(path.node.start, path.node.end);

				if (currentFunction) {
					functions.push({ name: functionName, content: functionContent, type: 'Child Function', parent: currentFunction });
				} else {
					functions.push({ name: functionName, content: functionContent, type: 'Main Function', parent: null });
				}

				currentFunction = functionName;
				functionStack.push(functionName);
			}
		},
		VariableDeclarator(path: any) {
			if (path.node.init && path.node.init.type === 'ArrowFunctionExpression') {
				if (path.node.id && path.node.id.type === 'Identifier') {
					const functionName = path.node.id.name;
					const functionContent = jsCode.slice(path.node.start, path.node.end);

					if (currentFunction) {
						functions.push({ name: functionName, content: functionContent, type: 'Child Function', parent: currentFunction });
					} else {
						functions.push({ name: functionName, content: functionContent, type: 'Main Function', parent: null });
					}

					currentFunction = functionName;
					functionStack.push(functionName);
				}
			}
		},
		ClassDeclaration(path: any) {
			const className = path.node.id.name;
			const parentClass = classHierarchy[className]; // Check for parent class
			const classContent = jsCode.slice(path.node.start, path.node.end);
			console.log(classContent);

			path.traverse({
				ClassMethod(methodPath: any) {
					const methodName = methodPath.node.key.name;
					const methodContent = jsCode.slice(methodPath.node.start, methodPath.node.end);

					if (parentClass) {
						functions.push({ name: methodName, content: methodContent, type: 'Child Class Method', parent: className, childClass: parentClass, isClass: true });
					} else {
						functions.push({ name: methodName, content: methodContent, type: 'Main Class Method', parent: className, isClass: true });
					}
				}
			});

			if (parentClass) {
				functions.push({ name: className, content: classContent, type: 'Child Class', parent: parentClass, isClass: true });
			} else {
				functions.push({ name: className, content: classContent, type: 'Main Class', isClass: true });
			}
		}
	});

	return functions;
}

async function extractFunctionsFromFile(filePath: any, type: any, user: any, subfolderName: any) {
	let results: any = [];

	try {
		const code = fs.readFileSync(filePath, 'utf-8');
		const functions = extractFunctionsFromCode(code, filePath);
		processItems(functions, filePath, type, user, subfolderName);
		console.log(results);
		return;
	} catch (error: any) {
		console.error(`Error reading or parsing ${filePath}: ${error.message}`);
		return [];
	}
}

async function processItems(functions: any, filePath: any, type: any, user: any, subfolderName: any) {
	for (const item of functions) {
		const result = await Model.AIOpen(type, item.content);

		const exits = await Data.findOne({ functionName: item.name });
		const filter = { functionName: item.name };
		const update = {
			functionCode: item.content,
			functionName: item.name,
			path: filePath,
			functionType: item.type,
			type: type,
			functionParent: item.parent,
			functionExplanation: result,
			user: user,
			isClass: item.isClass ? true : false,
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
				path: filePath,
				functionType: item.type,
				type: type,
				functionParent: item.parent,
				functionExplanation: result,
				user: user,
				isClass: item.isClass ? true : false,
				applicationName: subfolderName
			}).save();
		}

		// console.log(result);
	}

	// console.log(result);
}

function sleep(ms: any) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default { getAllFiles, extractFunctionsFromFile };
