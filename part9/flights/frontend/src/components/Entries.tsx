import { type Entry } from "../types";
import DiaryEntry from './DiaryEntry';

const Entries = ({ entries }: { entries: Entry[] }) => {
    
    return (
        <section>
            <h2>Entries</h2>
            {(entries.length === 0)
                ? <p>No entries yet.</p>
                : 
            <ul>
                {entries.map(entry => 
                    <DiaryEntry key={entry.id} entry={entry} />
                )}
            </ul>
            }
        </section>
    );
};

export default Entries;