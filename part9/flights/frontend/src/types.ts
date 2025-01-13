import z from 'zod';

export type Id = number;
export type Date = string;
export enum Weather {
    rainy = "rainy",
    sunny = "sunny",
    cloudy = "cloudy",
    windy = "windy",
    stormy = "stormy",
};
export enum Visibility {
    great = 'great',
    good = 'good',
    ok = 'ok',
    poor = 'poor',
};
export type Comment = string;
export type Message = string;
export enum NotificationType {
    success = 'success',
    error = 'error',
    empty = ''
};

export interface Notification {
    message: Message,
    type: NotificationType
};

export interface Entry {
    id: Id;
    date: Date;
    weather: Weather;
    visibility: Visibility;
    comment?: Comment;
};

export type NewEntry = Omit<Entry, 'id'>;

export const NewEntrySchema = z.object({
    date: z.string().date(),
    // date: z.string().refine((val) => {
    //     const regex = /^\d{4}-\d{2}-\d{2}$/;
    //     return regex.test(val);
    // }),
    weather: z.nativeEnum(Weather),
    visibility: z.nativeEnum(Visibility),
    comment: z.string().min(3).optional(),
});

export interface FormElements extends HTMLFormControlsCollection {
    date: HTMLInputElement;
    visibility: HTMLInputElement;
    weather: HTMLInputElement;
    comment: HTMLInputElement;
};
    