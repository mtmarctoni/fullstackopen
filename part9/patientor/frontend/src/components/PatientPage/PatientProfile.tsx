import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import { type Patient, type Entry, type NewEntry, type Notification } from "../../types";
import { genderIcon } from '../utils/helper';
import patientService from '../../services/patients';
import InfoRow from './InfoRow';
import PatientEntry from './PatientEntry';
import NewEntryModal from '../AddEntryModal/NewEntryModal';

const PatientProfile = () => {
    const [fullPatient, setFullPatient] = useState<Patient>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState<Notification | null>(null);
    const { id } = useParams();
    
    useEffect(() => {
        if (notification !== null) {
            setIsModalOpen(true);
        }
    }, [notification]);

    useEffect(() => {
        if (id !== undefined) {
            patientService.getFullPatient(id)
                .then((patient: Patient) => setFullPatient(patient))
                .catch((err: Error) => console.log(err));
        }
    }, [id]);
    
    if (!fullPatient) return <div>Patient Not Found</div>;
    
    const handleNewEntry = async (newEntry: NewEntry) => {
        try {
            const updatedPatient = await patientService.addEntry(fullPatient.id, newEntry);
            setFullPatient(updatedPatient);

        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.error[0].message);
                setNotification(error.response?.data.error[0].message);
            } else {
                console.error("Unkown error happend when trying to add new entry", error);
            }
        }
      };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                {fullPatient.name} 
                <span className="ml-2">{genderIcon[fullPatient.gender.toLowerCase() as keyof typeof genderIcon]}</span>
            </h2>
            <div className="space-y-4 mb-6">
                <InfoRow label="Date of Birth" value={fullPatient.dateOfBirth || ''} />
                <InfoRow label="SSN" value={fullPatient.ssn || 'Without SSN'} />
                <InfoRow label="Occupation" value={fullPatient.occupation} />
            </div>
            <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-4">Entries</h3>
                <ul className="list-none">
                {fullPatient.entries?.length > 0
                    ? (
                        fullPatient.entries.map((entry: Entry) => <li key={entry.id}>
                            <PatientEntry entry={entry} />
                        </li>
                    )
                )
                : (
                    <p>No entries available</p>
                )}
                </ul>
            </div>
            <div>
                <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded shadow-2xl"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add New Entry
                </button>
                <NewEntryModal
                    notification={notification}
                    setNotification={setNotification}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleNewEntry}
                />
            </div>
        </div>
    );
};

export default PatientProfile;
