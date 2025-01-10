import { v1 as uuid } from 'uuid';
import patients from '../db/patients';
import { type Patient, type PatientFull, type Id,type NewPatient } from '../types';

const getPatientsFull = (): PatientFull[] => {
  return patients;
};

const getPatients = (): Patient[] => {
    return patients.map(patient => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation
    }));
  };

const addPatient = (newPatient: NewPatient): Patient => {
    const addPatient = {
        id: uuid(),
        ...newPatient
    };
    patients.push(addPatient);
    return addPatient;
};

const findById = (id: Id): PatientFull | undefined => {
    return patients.find(patient => patient.id === id);
};

export default {
    getPatientsFull,
    getPatients,
    addPatient,
    findById
};