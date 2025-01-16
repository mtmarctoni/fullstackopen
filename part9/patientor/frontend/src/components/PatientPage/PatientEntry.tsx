import { assertNever } from '../utils/helper';
import { type Entry } from "../../types";
import HospitalEntry from '../Entries/HospitalEntry';
import OccupationalEntry from '../Entries/OccupationalEntry';
import HealthCheckEntry from '../Entries/HealthCheckEntry';

interface Props {
    entry: Entry
}

const PatientEntry = ({ entry }: Props) => {
    // add narrow type with case statement and render different components based on entry type

    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntry entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalEntry entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default PatientEntry;