const diagnosesRouter = require('express').Router();
import diagnoses from '../db/diagnoses';

diagnosesRouter.get('/', (_req: any, res: any) => {
    console.log('Getting diagnoses...');
    
    res.json(diagnoses);
    
});
  
export default diagnosesRouter;