import { type HospitalEntry } from "../../types";
import EntryContainer from "./EntryContainer";

interface Props {
    entry: HospitalEntry
}

const Hospital = ({ entry }: Props) => {
    return (
        <EntryContainer entry={entry}>
            <div>
                {entry.discharge && (
                    <div className="mt-2">
                        <span className="font-semibold">Discharge:</span> {entry.discharge.date} - {entry.discharge.criteria}
                    </div>
                )}
            </div>
        </EntryContainer>
    );
};

export default Hospital;