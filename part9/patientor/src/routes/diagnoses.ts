import express from 'express';
import { Router, Request, Response } from 'express';
import diagnoses from '../db/diagnoses';
import { Diagnose } from '../types';

const diagnosesRouter: Router = express.Router();

diagnosesRouter.get('/', (_req: Request, res: Response<Diagnose[]>) => {
    console.log('Getting diagnoses...');
    
    res.json(diagnoses);
    
});
  
export default diagnosesRouter;