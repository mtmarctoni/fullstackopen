import { type Entry, type NewEntry } from '../types';

const baseUrl = 'http://localhost:5173/api/diaries';

const getEntries = async (): Promise<Entry[]> => {
    const res = await fetch(baseUrl);
    const data: Entry[] = await res.json() as Entry[];
    console.log('Entries :', data);

    return data;
};

const addEntry = async (newEntry: NewEntry): Promise<Entry> => {
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
    });
    const data: Entry = await res.json() as Entry;
    console.log('Entry added :', data);
    return data;
};
    
  
export default {
    getEntries,
    addEntry
};