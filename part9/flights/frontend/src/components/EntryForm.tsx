import z from 'zod';
import { useState } from 'react';
import { type Notification, Visibility, Weather, type NewEntry, type Entry, NewEntrySchema, type FormElements, NotificationType } from "../types";
import entryService from '../services/entryService';
import NotificationInfo from './NotificationInfo';

const EntryForm = ({
        setEntries,
        entries
    }
    : {
        setEntries: React.Dispatch<React.SetStateAction<Entry[]>>,
        entries: Entry[]
    }) => {
    
    const [notification, setNotification] = useState<Notification>({
    message: '',
    type: NotificationType.empty,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // console.log(e);
        // console.log(e.target);
        // console.log(e.currentTarget);
        
        const form: HTMLFormElement = e.currentTarget;
        const formElements: FormElements = form.elements as FormElements;
        try {
            const newEntry: NewEntry = NewEntrySchema.parse({
                date: formElements.date.value,
                visibility: formElements.visibility.value,
                weather: formElements.weather.value,
                comment: formElements.comment.value,
            });

            entryService.addEntry(newEntry)
                .then((entryAdded: Entry) => {
                    setEntries([...entries, entryAdded]);
                })
                .catch((error: Error) => {
                    console.error(error);
                });
            
            setNotification({
                message: 'Entry added successfully',
                type: NotificationType.success,
            });

        } catch (err: unknown) {
            if (err instanceof z.ZodError) {
                // console.error('Validiting error:', err.issues);
                setNotification({
                    message: `Validiting error: ${err.issues[0].message}`,
                    type: NotificationType.error,
                });
            } else {
                // console.error('Something unexpected happend: ', err);
                setNotification({
                    message: `Something unexpected happend ${err}`,
                    type: NotificationType.error,
                });
            }
        }     
    };

    return (
        <section>
            <h2>Entry Form</h2>
            <NotificationInfo notification={notification} />
            <form onSubmit={handleSubmit}>
                <div>Date: <input type="date" name="date" />
                </div>
                <div>Visibility:
                    {Object.values(Visibility).map((o): JSX.Element =>
                        <div key={o}>
                            <input key={o} type="radio" name="visibility" value={o} />{o}
                        </div>
                )}
                </div>
                <div>Weather:
                    {Object.values(Weather).map((o): JSX.Element =>
                        <div key={o}>
                            <input type="radio" name="weather" value={o} />{o}
                        </div>
                )}
                </div>
                <div>Comment : <input type="string" name="comment" /></div>
            <button type="submit">Add Entry</button>
            </form>
        </section>
    );
};

export default EntryForm;