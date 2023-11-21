import { Request, Response, NextFunction } from 'express';
import { Applications } from './FileUpload';
import { Data } from './JSMethods';
import { Case1, Case2 } from '../testData';

const SendAllApplications = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const exists = await Applications.find();
		if (exists) {
			return res.status(200).json(exists);
		} else {
			return res.status(500).json({ message: 'Data Not Found' });
		}
	} catch (error) {
		return res.status(200).json({ message: `${error} noob error` });
	}
};

const Case1Send = async (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.status(200).json(Case1);
	} catch (error) {
		return res.status(200).json({ message: `${error} noob error` });
	}
};

const Case2Send = async (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.status(200).json(Case2);
	} catch (error) {
		return res.status(200).json({ message: `${error} noob error` });
	}
};

const SendSingleApplication = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body);
	let arr: any = [];
	try {
		const exists = await Applications.findOne({ ApplicationName: req.body.ApplicationName });
		if (exists && exists.ready) {
			const data = await Data.find({ applicationName: exists.ApplicationName });

			arr.push({
				id: 1,

				parentId: '',
				name: `${exists.ApplicationName}.zip`,
				type: 'zip'
			});
			arr.push({
				id: 2,
				parentId: 1,
				name: 'Application Summary',
				type: 'summary'
			});

			data.map((item) => {
				const path: any = item.path ? item?.path?.split('\\') : false;
				console.log(path);
				if (item.type == 'Javascript' && !arr.some((item: any) => item.name == 'Javascript')) {
					arr.push({
						id: 'Javascript',
						parentId: 2,
						name: 'Javascript',
						type: 'js'
					});
				}
				if (item.type == 'Python' && !arr.some((item: any) => item.name == 'Python')) {
					arr.push({
						id: 'Python',
						parentId: 2,
						name: 'Python',
						type: 'py'
					});
				}

				if (item.type == 'Java' && !arr.some((item: any) => item.name == 'Java')) {
					arr.push({
						id: 'Java',
						parentId: 2,
						name: 'Java',
						type: 'java'
					});
				}

				if (item.type == 'Angular' && !arr.some((item: any) => item.name == 'Angular')) {
					arr.push({
						id: 'Angular',
						parentId: 2,
						name: 'Angular',
						type: 'angular'
					});
				}

				if (item.type == 'Angular' && !arr.some((item: any) => item.name == 'typescript')) {
					arr.push({
						id: 'typescript',
						parentId: 'Angular',
						name: 'typescript',
						type: 'ts'
					});
				}

				if (item.type == 'Angular' && !arr.some((item: any) => item.name == 'html')) {
					arr.push({
						id: 'html',
						parentId: 'Angular',
						name: 'html',
						type: 'html'
					});
				}

				if (!arr.some((item: any) => item.name == 'Database')) {
					arr.push({
						id: 'Database',
						parentId: 2,
						name: 'Database',
						type: 'db'
					});
				}

				if (!arr.some((item: any) => item.name == 'Schema')) {
					arr.push({
						id: 'Schema',
						parentId: 'Database',
						name: 'Schema',
						type: 'schema'
					});
				}

				if (!arr.some((item: any) => item.name == 'Functions')) {
					arr.push({
						id: 'Functions',
						parentId: 'Database',
						name: 'Functions',
						type: 'function'
					});
				}
				if (!arr.some((ob: any) => ob.name == path[path?.length - 1]?.split('.')[0]) && item.type == 'Javascript') {
					arr.push({
						id: path[path?.length - 1]?.split('.')[0],
						parentId: 'Javascript',
						name: path[path?.length - 1]?.split('.')[0],
						type: 'js'
					});
				}

				if (!arr.some((ob: any) => ob.name == item.functionName) && item.type == 'Java' && item.functionType == 'class') {
					arr.push({
						id: item.functionName,
						parentId: 'Java',
						name: item.functionName,
						type: 'class',
						functionType: 'javaCF'
					});
				}

				if (!arr.some((ob: any) => ob.name == item.functionName) && item.type == 'Angular' && item.functionType == 'Class') {
					arr.push({
						id: item.functionName,
						parentId: 'typescript',
						name: item.functionName,
						type: 'class',
						functionType: 'javaCF'
					});
				}

				if (!arr.some((ob: any) => ob.name == item.functionName) && item.type == 'Angular' && item.functionType == 'Method') {
					arr.push({
						id: item.functionName,
						parentId: item.functionParent,
						name: item.functionName,
						type: 'function',
						functionType: 'javaCF'
					});
				}

				if (!arr.some((ob: any) => ob.name == item.functionName) && item.type == 'Angular' && item.functionType == 'HTML') {
					arr.push({
						id: item.functionName,
						parentId: 'html',
						name: item.functionName,
						type: 'html',
						functionType: 'javaCF'
					});
				}

				if (!arr.some((ob: any) => ob.name == item.functionName) && item.type == 'Java' && item.functionType == 'method') {
					arr.push({
						id: item.functionName,
						parentId: 'Java',
						name: item.functionName,
						type: 'function',
						functionType: 'javaCF'
					});
				}

				if (!arr.some((ob: any) => ob.name == item.functionName) && item.type == 'Java' && item.functionParent) {
					arr.push({
						id: item.functionName,
						parentId: item.functionParent,
						name: item.functionName,
						type: 'function',
						functionType: 'javaCF'
					});
				}

				if (!arr.some((ob: any) => ob.name == path[path?.length - 1]?.split('.')[0]) && item.type == 'Python') {
					arr.push({
						id: path[path?.length - 1]?.split('.')[0],
						parentId: 'Python',
						name: path[path?.length - 1]?.split('.')[0],
						type: 'py'
					});
				}

				console.log(path[path.length - 1]?.split('.')[0]);

				if (!arr.some((ob: any) => ob.name == item.functionName) && item.type == 'Javascript' && item.functionType == 'Child Function') {
					arr.push({
						id: item.functionName,
						parentId: path[path?.length - 1]?.split('.')[0],
						name: item.functionName,
						type: 'function',
						functionType: item.functionType
					});
				}

				if (!arr.some((ob: any) => ob.name == item.functionName) && item.type == 'Javascript' && item.isClass == true && item.functionType == 'Main Class') {
					arr.push({
						id: item.functionName,
						parentId: path[path?.length - 1]?.split('.')[0],
						name: item.functionName,
						type: 'function',
						functionType: 'Class Function'
					});
				}

				if (!arr.some((ob: any) => ob.name == item.functionName) && item.type == 'Javascript' && item.isClass == true && item.functionParent) {
					arr.push({
						id: item.functionName,
						parentId: item.functionParent,
						name: item.functionName,
						type: 'function',
						functionType: 'Class Function'
					});
				}

				if (!arr.some((ob: any) => ob.name == item.functionName) && item.type == 'Python') {
					arr.push({
						id: item.functionName,
						parentId: path[path?.length - 1]?.split('.')[0],
						name: item.functionName,
						type: 'function',
						functionType: 'p-y'
					});
				}

				if (!arr.some((ob: any) => ob.name == item.functionName) && item.type == 'Model') {
					arr.push({
						id: item.functionName,
						parentId: 'Schema',
						name: item.functionName,
						type: 'model',
						functionType: 'Model'
					});
				}

				if (!arr.some((ob: any) => ob.name == item.functionName) && item.type == 'Function') {
					arr.push({
						id: item.functionName,
						parentId: 'Functions',
						name: item.functionName,
						type: 'function',
						functionType: 'Function'
					});
				}
			});

			res.status(200).json(arr);
		} else {
			return res.status(500).json({ message: 'Data Not Found' });
		}
	} catch (error) {
		return res.status(500).json({ message: `${error} noob error` });
	}
};

const SendSingleNode = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body.nodeName, req.body.ftype, req.body.appName);
	try {
		if (req.body.appName) {
			if (req.body.ftype == 'Child Function') {
				const exists = await Data.findOne({ functionName: req.body.nodeName, applicationName: req.body.appName });
				if (exists) {
					return res.status(200).json(exists);
				} else {
					return res.status(500).json({ message: 'Data Not Found' });
				}
			} else if (req.body.ftype == 'p-y') {
				const exists = await Data.findOne({ functionName: req.body.nodeName, applicationName: req.body.appName });
				if (exists) {
					return res.status(200).json(exists);
				} else {
					return res.status(500).json({ message: 'Data Not Found' });
				}
			} else if (req.body.ftype == 'javaCF') {
				const exists = await Data.findOne({ functionName: req.body.nodeName, applicationName: req.body.appName });
				if (exists) {
					return res.status(200).json(exists);
				} else {
					return res.status(500).json({ message: 'Data Not Found' });
				}
			} else if (req.body.ftype == 'Function' || req.body.ftype == 'Model') {
				const exists = await Data.findOne({ functionName: req.body.nodeName, applicationName: req.body.appName });
				if (exists) {
					return res.status(200).json(exists);
				} else {
					return res.status(500).json({ message: 'Data Not Found' });
				}
			} else if (req.body.ftype == 'Class Function') {
				const exists = await Data.findOne({ functionName: req.body.nodeName, applicationName: req.body.appName });
				if (exists) {
					return res.status(200).json(exists);
				} else {
					return res.status(500).json({ message: 'Data Not Found' });
				}
			} else if (req.body.nodeName == '2') {
				return res.status(200).json({
					functionExplanation:
						'Annadata.guru is a sophisticated professional networking site that combines the strengths of AI with the Zoom and WhatsApp APIs. It enables users to build valuable connections with their peers and industry professionals. The AI-driven features enhance the user experience by suggesting relevant connections and tailoring content. The Zoom API integration allows for streamlined virtual meetings, making it an ideal platform for webinars, conferences, and interviews. Meanwhile, the WhatsApp API ensures efficient and immediate communication for collaboration and networking purposes. This comprehensive platform, Annadata.guru, is designed to empower professionals in diverse industries, providing a seamless environment for networking and meaningful interactions.'
				});
			} else {
				const exists = await Data.findOne({ path: { $regex: req.body.nodeName }, applicationName: req.body.appName, functionType: 'Main Function' });
				if (exists) {
					return res.status(200).json(exists);
				} else {
					return res.status(500).json({ message: 'Data Not Found' });
				}
			}
		} else {
			return res.status(500).json({ message: ` noob error` });
		}
	} catch (error) {
		return res.status(500).json({ message: `${error} noob error` });
	}
};

export default { SendAllApplications, SendSingleApplication, SendSingleNode, Case1Send, Case2Send };
