// const patientsRouter = require('express').Router();
import express from 'express';
import { type Router, type Request, type Response } from 'express';
import { type Patient, type NonSensitivePatient, type NewPatient, NewEntry } from '../types';
import patientService from '../services/patientService';
import { validateNewPatient, validateNewEntry } from '../utils/middlewares';

const patientsRouter: Router = express.Router();

patientsRouter.get('/', (_req: Request, res: Response<NonSensitivePatient[]>) => {
    console.log('Getting patients...');
    const patients: NonSensitivePatient[] = patientService.getPatients();
    
    res.json(patients);
    
});

patientsRouter.get('/:id', (req: Request, res: Response<NonSensitivePatient>) => {
    const { id } = req.params;
    console.log('Getting patient with id ', id);
    const patient = patientService.findById(id);
    
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    };
});

patientsRouter.post('/', validateNewPatient, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const patientAdded: Patient = patientService.addPatient(req.body);
    console.log('Patient added: ', patientAdded);
    
    res.json(patientAdded);

});

patientsRouter.post('/:id/entries', validateNewEntry, (req: Request, res: Response) => {
    const { id } = req.params;
    const newEntry = req.body as NewEntry;
    const updatedPatient = patientService.addEntry(id, newEntry);
    console.log('Entry added to patient with id ', id);

    res.json(updatedPatient);
});

  
export default patientsRouter;