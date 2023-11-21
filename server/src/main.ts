import { config } from './config/config';
import express from 'express';
import http from 'http';
import { NextFunction, Request, Response } from 'express';
import routes from './routes/User';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

const router = express();
router.use(morgan('common'));
router.use(cors());
router.use(express.json());

config.db
	.sync()
	.then(() => {
		console.info('Connected to Postgresql Database');
	})
	.catch((err: any) => {
		StartServer();
		console.log('unable to connect', err);
	});
const StartServer = () => {
	router.use((req: Request, res: Response, next: NextFunction) => {
		next();
	});

	mongoose
		.connect('mongodb+srv://mercy:loloklol@docketrun.fq44mfg.mongodb.net/genAI?retryWrites=true&w=majority' || 5000)
		.then(() => console.log('Connected to MongoDB'))
		.catch((err: any) => console.log(err));

	router.use(express.urlencoded({ extended: true }));
	router.use(express.json());

	router.use((req: Request, res: Response, next: NextFunction) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
		if (req.method === 'OPTIONS') {
			res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
			return res.status(200).json({});
		}
		next();
	});

	router.use('/api', routes);

	router.get('/', (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'response from server 👍 ' }));
	router.use((req: Request, res: Response, next: NextFunction) => {
		const error = new Error('Not found');

		return res.status(404).json({ message: error.message });
	});
	http.createServer(router).listen(config.server.port, () => console.info(`Server running on port ${config.server.port}`));
};
