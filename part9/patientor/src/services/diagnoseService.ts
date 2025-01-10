import diagnoses from '../db/diagnoses';
import { type Diagnose } from '../types';

// if we have not typed the diagnose in db, we need to type it here
// const diagnoses: Array<Diagnose> = diagnoseData;

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

const addDiagnose = (): Diagnose => {
    const newDiagnose: Diagnose = {
        code: '123',
        name: 'test',
        latin: 'testum'
    };
  return newDiagnose;
};

export default {
    getDiagnoses,
    addDiagnose
};