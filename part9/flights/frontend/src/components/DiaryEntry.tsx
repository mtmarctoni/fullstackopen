import { type Entry } from "../types";

const DiaryEntry = ({ entry }: { entry: Entry }) => {

    return (
        <div>
            <h3>{entry.date}</h3>
            <div>Visibility: {entry.visibility}</div>
            <div>Weather: {entry.weather}</div>
            <div>
                {(entry.comment
                    ? <p>Comment: {entry.comment}</p>
                    : <p>No comment</p>
                )}
            </div>
        </div>
    );
};

export default DiaryEntry;