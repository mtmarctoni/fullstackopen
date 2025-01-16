import axios from "axios";
import { Id, Patient, PatientFormValues, type NewEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getFullPatient = async (id: Id) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};  

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export const addEntry = async (patientId: Id, entry: NewEntry) => {
  const {data} = await axios.post<Patient>(`${apiBaseUrl}/patients/${patientId}/entries`, entry);

  return data;
};

export default {
  getAll,
  getFullPatient,
  create,
  addEntry
};

