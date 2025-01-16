export type Id = string;
export type Name = string;
export type Code = string;
export type Description = string;
export type Date = string;
export type Specialist = string;
export enum HealthCheckRating {'healthy' = 0, 'LowRisk' = 1, 'HighRisk' = 2, 'CriticalRisk' = 3}
export type Criteria = string;
export type Notification = string;

export interface Diagnosis {
  code: Code;
  name: Name;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;



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
  diagnosisCodes?: Array<Diagnosis['code']>
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

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;