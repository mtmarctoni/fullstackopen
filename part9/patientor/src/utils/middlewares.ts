import z from 'zod';
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

import { newPatientSchema, newHospitalEntrySchema, newOccupationalHealthcareEntrySchema, newHealthCheckEntrySchema } from "../types";
import { type NewEntry } from "../types";
import { assertNever } from './helper';

export const validateNewPatient = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next();  
    } catch (err) {
        next(err);
    };
};

export const validateNewEntry = (req: Request, _res: Response, next: NextFunction) => {
    const newEntry: NewEntry = req.body as NewEntry;
    try {
        switch (newEntry.type) {
            case 'Hospital':
                newHospitalEntrySchema.parse(req.body);
                next();
                break;
            case 'OccupationalHealthcare':
                newOccupationalHealthcareEntrySchema.parse(req.body);
                next();
                break;
            case 'HealthCheck':
                newHealthCheckEntrySchema.parse(req.body);
                next();
                break;
            default:
                assertNever(newEntry);
        }
    } catch (err) {
        next(err);
    };
};

export const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof z.ZodError) {
        res.status(400).send({
            error: err.issues
        });
        console.log('Zod error: ', err.issues);
        
    } else {
        next(err);
    }
};