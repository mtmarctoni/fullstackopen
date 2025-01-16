import axios from 'axios';
import { type Diagnosis, type Code } from '../types';

const baseUrl = '/api/diagnoses';

const getAll = async () => {
  const response = await axios.get<Diagnosis[]>(baseUrl);
  return response.data;
};

const getDiagnosis = async (code: Code) => {
    const diagnoses = await getAll();
    const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === code);
    return diagnosis;
};

export default {
    getAll,
    getDiagnosis
};
