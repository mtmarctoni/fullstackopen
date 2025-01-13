import { useEffect, useState } from 'react';
import EntryForm from './components/EntryForm';
import Entries from './components/Entries';
import { type Entry } from './types';
import entryService from './services/entryService';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    entryService.getEntries()
      .then(data => setEntries(data))
      .catch(err => console.error(err));

  }, []);

  return (
    <>
      <EntryForm
        setEntries={setEntries}
        entries={entries}
      />
      {entries && <Entries entries={entries} />}
    </>
  );
};

export default App;
