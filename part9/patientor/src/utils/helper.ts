import { type NewPatient, type Name, Gender, DateOfBirth, Ssn, Occupation } from "../types";

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect data format");
    };
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object
        && 'occupation' in object && 'gender' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object?.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
        };
        
        return newPatient;
    };

    throw new Error("Incorrect data: some fields are missing");
};

const parseName = (name: unknown): Name => {
    if (name && isString(name)) {
        return String(name);
    }
    throw new Error("Incorrect data: name is missing");
};

const parseDateOfBirth = (dateOfBirth: unknown): DateOfBirth => {
    if (dateOfBirth && isString(dateOfBirth) && isValidDate(dateOfBirth)) {
        return String(dateOfBirth);
    }
    throw new Error("Incorrect data: Date of Birth has wrong the format");
};

const parseSsn = (ssn: unknown): Ssn => {
    if (ssn && isString(ssn)) {
        return String(ssn);
    }
    throw new Error("Incorrect data: Social Security Number is missing");
};

const parseGender = (gender: unknown): Gender => {
    if (gender && isString(gender) && isGender(gender)) {
        return gender;
    }
    throw new Error("Incorrect data: name is missing");
};

const parseOccupation = (occupation: unknown): Occupation => {
    if (occupation && isString(occupation)) {
        return String(occupation);
    }
    throw new Error("Incorrect data: occupation is missing");
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (option: string): option is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(option);
};

const isValidDate = (date: string): date is DateOfBirth => {
    // implement your date validation logic here YYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
};