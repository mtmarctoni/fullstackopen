import z from 'zod';

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

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().refine((val) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(Date.parse(val));
      }, {
        message: "Invalid date format. Please use YYYY-MM-DD."
      }),
    ssn: z.string().optional(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
}).strict();

export type NewPatient = z.infer<typeof newPatientSchema>;
