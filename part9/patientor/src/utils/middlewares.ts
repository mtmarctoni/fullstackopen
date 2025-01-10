import z from 'zod';
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

import { newPatientSchema } from "../types";

export const validateNewPatient = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next();  
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