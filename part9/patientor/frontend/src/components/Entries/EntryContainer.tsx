import { type Entry, type Code } from "../../types";
import { entryTypeIcon } from "../utils/helper";
import DiagnosisInfo from "../PatientPage/DiagnosisInfo";

interface Props {
    children: React.ReactNode;
    entry: Entry
}

const EntryContainer = ({ children, entry }: Props) => {
    return (
        <div key={entry.id} className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center mb-2">
                <span className="mr-2">{entryTypeIcon[entry.type as keyof typeof entryTypeIcon]}</span>
                <span className="font-semibold">{entry.date}</span>
            </div>
            <p className="text-gray-700">{entry.description}</p>
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                <div className="mt-2">
                    <span className="font-semibold">Diagnoses:</span>
                    <ul className="list-disc list-inside">
                        {entry.diagnosisCodes.map((code: Code) => <li key={code}>
                            <DiagnosisInfo code={code} />
                            </li>
                        )}
                    </ul>
                </div>
            )}
            {children}
            <p className="text-gray-700">{`Diagnose by ${entry.specialist}`}</p>
        </div>
    );
};

export default EntryContainer;