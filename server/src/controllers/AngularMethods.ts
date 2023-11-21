import path from 'path';
import fs from 'fs';
import Model from '../AI Model/Model';
import mongoose, { Schema } from 'mongoose';
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
import * as ts from 'typescript';
import cheerio from 'cheerio';
import { Data } from './JSMethods';

function getAllAngularFiles(dirPath: any, arrayOfFiles: any) {
	arrayOfFiles = arrayOfFiles || [];

	const files = fs.readdirSync(dirPath);

	files.forEach(function (file) {
		const filePath = path.join(dirPath, file);
		const isDirectory = fs.statSync(filePath).isDirectory();
		const isAngularFile = file.endsWith('.ts') || file.endsWith('.html'); // Adjust for Angular file extensions

		if (isDirectory) {
			arrayOfFiles = getAllAngularFiles(filePath, arrayOfFiles);
		} else if (isAngularFile) {
			arrayOfFiles.push(filePath);
		}
	});

	return arrayOfFiles;
}

function extractFunctionsFromCode(fileContent: string, filePath: string) {
	const functions: any = [];

	if (filePath.endsWith('.ts')) {
		// Handle TypeScript code
		const tsAst = parseTypeScriptCode(fileContent, filePath);

		// Traverse the TypeScript AST to extract functions and Angular-specific components
		traverseTypeScriptAST(tsAst, functions, filePath);
	} else if (filePath.endsWith('.html')) {
		// Handle Angular HTML templates

		const code = fs.readFileSync(filePath, 'utf-8');

		const deName: any = filePath.split('\\')[filePath.split('\\').length - 1].split('.')[0];
		functions.push({
			name: deName || '',
			content: code,
			type: 'HTML',
			path: filePath
		});
	}

	return functions;
}

function parseTypeScriptCode(tsCode: string, filePath: any) {
	// Use the ts-migrate library to parse TypeScript code
	const options = ts.getDefaultCompilerOptions(); // You can customize compiler options if needed.
	const sourceFile = ts.createSourceFile('temp.ts', tsCode, ts.ScriptTarget.ESNext, true);

	return sourceFile;
}

function traverseTypeScriptAST(tsAst: any, functions: any, filePath: any) {
	// Traverse the TypeScript AST and extract functions
	ts.forEachChild(tsAst, (node: any) => {
		if (ts.isFunctionDeclaration(node)) {
			// Handle function declarations
			functions.push({
				name: node.name?.getText() || '',
				content: node.getText(),
				type: 'Function',
				path: filePath
			});
		} else if (ts.isClassDeclaration(node)) {
			// Handle class declarations
			functions.push({
				name: node.name?.getText() || '',
				content: node.getText(),
				type: 'Class',
				path: filePath
			});
			ts.forEachChild(node, (classNode) => {
				if (ts.isMethodDeclaration(classNode)) {
					// Handle method declarations
					functions.push({
						name: classNode.name?.getText() || '',
						content: classNode.getText(),
						parent: node.name?.getText(),
						type: 'Method',
						path: filePath
					});
				}
			});
		}

		// Add more logic for other TypeScript constructs (e.g., methods, services, etc.) as needed
	});
}

async function extractAngularFunctionsFromFile(filePath: any, type: any, user: any, subfolderName: any) {
	let results: any = [];

	try {
		const code = fs.readFileSync(filePath, 'utf-8');
		const functions = extractFunctionsFromCode(code, filePath);
		console.log(functions);

		processItems(functions, filePath, type, user, subfolderName);
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
			isClass: item.type == 'Class' ? true : false,
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
				isClass: item.type == 'Class' ? true : false,
				applicationName: subfolderName
			}).save();
			console.log(person);
		}

		// console.log(result);
	}

	// console.log(result);
}

export default { getAllAngularFiles, extractAngularFunctionsFromFile };
