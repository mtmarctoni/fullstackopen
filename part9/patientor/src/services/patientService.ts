import patients from '../db/patients';
import { type Patient, type PatientFull } from '../types';

const getPatientsFull = (): Array<PatientFull> => {
  return patients;
};

const getPatients = (): Array<Patient> => {
    return patients.map(patient => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation
    }));
  };

const addPatient = (): Patient => {
    const newPatient: Patient = {
        id: '123',
        name: 'test',
        dateOfBirth: '29-10-1995',
        gender: 'male',
        occupation: 'test'
    }
  return newPatient;
};

export default {
    getPatientsFull,
    getPatients,
    addPatient
};