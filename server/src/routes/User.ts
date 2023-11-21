import express, { NextFunction, Request, Response } from 'express';

import authenticate, { adminAuthenticate } from '../middleware/authenticate';
import FileUpload from '../controllers/FileUpload';

import multer from 'multer';
import unzipper from 'unzipper';

import axios from 'axios';
import path from 'path';
import fs from 'fs';
import Application from '../controllers/Application';
const storage = multer.memoryStorage();

const upload = multer({ storage });

const router = express.Router();

router.post('/upload', upload.single('file'), FileUpload.uploadZip);
router.get('/SendAllApplications', Application.SendAllApplications);
router.post('/SendSingleApplication', Application.SendSingleApplication);
router.post('/SendSingleNode', Application.SendSingleNode);
router.get('/case1', Application.Case1Send);
router.get('/case2', Application.Case2Send);

export = router;
