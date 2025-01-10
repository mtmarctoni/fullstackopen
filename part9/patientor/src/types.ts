export type Code = string;
export type Name = string;
export type Latin = string;
export type Id = string;
export type DateOfBirth = string;
export type Ssn = string;
export enum Gender {male = 'male', female = 'female', other = 'other'}
export type Occupation = string;

export interface Diagnose {
    code: Code,
    name: Name,
    latin?: Latin
};

export interface PatientFull {
    id: Id,
    name: Name,
    dateOfBirth: DateOfBirth,
    ssn?: Ssn,
    gender: Gender,
    occupation: Occupation,
};

export type Patient = Omit<PatientFull, 'ssn'>;
export type NewPatient = Omit<PatientFull, 'id'>;
