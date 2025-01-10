// const patientsRouter = require('express').Router();
import express from 'express';
import { type Router, type Request, type Response } from 'express';
import { type Patient, type PatientFull, type NewPatient } from '../types';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils/helper';

const patientsRouter: Router = express.Router();

patientsRouter.get('/', (_req: Request, res: Response<Patient[]>) => {
    console.log('Getting patients...');
    const patients: Patient[] = patientService.getPatients();
    
    res.json(patients);
    
});

patientsRouter.get('/:id', (req: Request, res: Response<Patient>) => {
    const { id } = req.params;
    console.log('Getting patient with id ', id);
    const patient = patientService.findById(id);
   
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    };
});

patientsRouter.post('/', (req: Request, res: Response<PatientFull>) => {
    const newPatient: NewPatient = toNewPatient(req.body);
    const patientAdded: PatientFull = patientService.addPatient(newPatient);
    console.log('Patient added: ', patientAdded);
    
    res.json(patientAdded);

});

  
export default patientsRouter;