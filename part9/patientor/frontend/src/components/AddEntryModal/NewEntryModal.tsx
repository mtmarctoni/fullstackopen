import React, { useEffect, useState } from 'react';

import { type Entry, type NewEntry, type Code, type Notification } from '../../types';
import { assertNever } from '../utils/helper';
import HospitalFields from './HospitalEntryForm';
import HealthCheckFields from './HealthCeckEntryForm';
import OccupationalHealthcareFields from './OccupationalEntryForm';
import NotificationEntry from '../NotificationEntryForm';

interface Props {
  notification: Notification | null;
  setNotification: (notification: Notification | null) => void;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newEntry: NewEntry) => void;
}


const NewEntryModal = ({ notification, setNotification, isOpen, onClose, onSubmit }: Props) => {
  const [entryType, setEntryType] = useState<Entry['type']>('HealthCheck');
  // const [notification, setNotification] = useState<Notification | null>(null);
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (notification !== null) {
      timer = setTimeout(() => {
        setNotification(null);
      
      }, 5000);
    }

    return () => clearTimeout(timer);
  });

  const parseDiagnosisCodes = (codes: string): Code[] => {
    if (codes) {
      return codes.split(' ');
    }
    return [];
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    let newEntry: NewEntry;
  
    try {
      switch (entryType) {
        case 'Hospital':
          newEntry = {
            type: 'Hospital',
            description: form.description.value,
            date: form.date.value,
            specialist: form.specialist.value,
            diagnosisCodes: parseDiagnosisCodes(form.codes.value),
            discharge: {
              date: form.dischargeDate.value,
              criteria: form.dischargeCriteria.value,
            }
          };
          onSubmit(newEntry);
          break;
        case 'HealthCheck':
          newEntry = {
            type: 'HealthCheck',
            description: form.description.value,
            date: form.date.value,
            specialist: form.specialist.value,
            diagnosisCodes: parseDiagnosisCodes(form.codes.value),
            healthCheckRating: Number(form.healthCheckRating.value)
          };
          onSubmit(newEntry);
          break;
        case 'OccupationalHealthcare':
          newEntry = {
            type: 'OccupationalHealthcare',
            description: form.description.value,
            date: form.date.value,
            specialist: form.specialist.value,
            diagnosisCodes: parseDiagnosisCodes(form.codes.value),
            employerName: form.employerName.value,
            sickLeave: {
              startDate: form.sickLeaveStartDate.value,
              endDate: form.sickLeaveEndDate.value,
            }
          };
          onSubmit(newEntry);
          break;
          default:
            assertNever(entryType);
        }
      } catch (error) {
        if (error instanceof Error) {
          setNotification(error.message);
        } else {
          setNotification(`An unknown error occurred. Please try again later.`);
        }
    }
    onClose();
  };
  

  if (!isOpen) return null;

  // try to set options of entry type from the enum and not manualltyç

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <NotificationEntry notification={notification} />
        <h3 className="text-lg font-bold mb-4">Add New Entry</h3>
        <form onSubmit={handleSubmit}>
          <select 
            value={entryType} 
            onChange={(e) => setEntryType(e.target.value as Entry['type'])}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="HealthCheck">Health Check</option>
            <option value="Hospital">Hospital</option>
            <option value="OccupationalHealthcare">Occupational Healthcare</option>
          </select>
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="date"
            name="date"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="text"
            name="specialist"
            placeholder="Specialist"
            className="w-full p-2 mb-4 border rounded"
          />
          <label className="block mb-2">Diagnosis Codes</label>
          <input
            type="text"
            name="codes"
            placeholder="Separated codes with one space"
            className="w-full p-2 mb-4 border rounded"
          />
          {entryType === 'HealthCheck' && <HealthCheckFields />}
          {entryType === 'Hospital' && <HospitalFields />}
          {entryType === 'OccupationalHealthcare' && <OccupationalHealthcareFields />}
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEntryModal;
