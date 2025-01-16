import { v1 as uuid } from 'uuid';
import patients from '../db/patients';
import { type Patient, type NonSensitivePatient, type Id, type NewPatient, type NewEntry } from '../types';

const getPatientsFull = (): Patient[] => {
  return patients;
};

const getPatients = (): NonSensitivePatient[] => {
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
        ...newPatient,
        entries: []
    };
    patients.push(addPatient);
    return addPatient;
};

const findById = (id: Id): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addEntry = (id: Id, newEntry: NewEntry): Patient => {
    const patient = findById(id);
    if (!patient) {
        throw new Error('Patient not found');
    }
    const entryToAdd = {
        id: uuid(),
        ...newEntry,
    };
    patient.entries.push(entryToAdd);

    return patient;
};

export default {
    getPatientsFull,
    getPatients,
    addPatient,
    findById,
    addEntry
};