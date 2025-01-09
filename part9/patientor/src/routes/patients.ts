const patientsRouter = require('express').Router();
import { type Patient, type PatientFull } from '../types';
import patientService from '../services/patientService';

patientsRouter.get('/', (_req: any, res: any) => {
    console.log('Getting patients...');
    const patients: Patient[] = patientService.getPatients();
    
    res.json(patients);
    
});
  
export default patientsRouter;