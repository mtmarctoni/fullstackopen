import { type OccupationalHealthcareEntry } from "../../types";
import EntryContainer from "./EntryContainer";

interface Props {
    entry: OccupationalHealthcareEntry
}

const Occupational = ({ entry }: Props) => {
    return (
        <EntryContainer entry={entry} >
            <div className="mt-2">
                <span className="font-semibold">Employer:</span> {entry.employerName}
            </div>
        </EntryContainer>
    );
};

export default Occupational;