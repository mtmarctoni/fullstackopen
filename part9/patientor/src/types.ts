export type Code = string;
export type Name = string;
export type Latin = string;

export interface Diagnose {
    code: Code,
    name: Name,
    latin?: Latin
};

export interface PatientFull {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender: string,
    occupation: string,
};

export type Patient = Omit<PatientFull, 'ssn'>
