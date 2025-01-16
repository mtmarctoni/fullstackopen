import z from 'zod';

export type Code = string;
export type Name = string;
export type Latin = string;
export type Id = string;
export type DateOfBirth = string;
export type Date = string;
export type Ssn = string;
export enum Gender {male = 'male', female = 'female', other = 'other'}
export type Occupation = string;
export type Description = string;
export type Specialist = string;
export enum HealthCheckRating {'healthy' = 0, 'LowRisk' = 1, 'HighRisk' = 2, 'CriticalRisk' = 3}
export type Criteria = string;

export interface Discharge {
  date: Date,
  criteria: Criteria
}
export interface SickLeave {
  startDate: Date,
  endDate: Date
}

export interface BaseEntry {
  id: Id,
  description: Description,
  date: Date,
  specialist: Specialist,
// eslint-disable-next-line @typescript-eslint/array-type
  diagnosisCodes?: Array<Diagnose['code']>
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating,
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: Name,
  sickLeave?: SickLeave
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: Discharge,
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export interface Diagnose {
    code: Code,
    name: Name,
    latin?: Latin
};

export interface Patient {
  id: Id,
  name: Name,
  dateOfBirth: DateOfBirth,
  ssn?: Ssn,
  gender: Gender,
  occupation: Occupation,
  entries: Entry[]
};

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
    // dateOfBirth: z.string().refine((val) => {
    //     return /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(Date.parse(val));
    //   }, {
    //     message: "Invalid date format. Please use YYYY-MM-DD."
    //   }),
    ssn: z.string().optional(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
}).strict();

export type NewPatient = z.infer<typeof newPatientSchema>;

export const newBaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
}).strict();

export const newHospitalEntrySchema = newBaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
}).strict();

export const newOccupationalHealthcareEntrySchema = newBaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
  }),
}).strict();
export const newHealthCheckEntrySchema = newBaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
}).strict();

export type NewHospitalEntry = z.infer<typeof newHospitalEntrySchema>;
export type NewOccupationalHealthcareEntry = z.infer<typeof newOccupationalHealthcareEntrySchema>;
export type NewHealthCheckEntry = z.infer<typeof newHealthCheckEntrySchema>;
export type NewEntry = z.infer<typeof newHealthCheckEntrySchema | typeof newHospitalEntrySchema | typeof newOccupationalHealthcareEntrySchema>;
  
