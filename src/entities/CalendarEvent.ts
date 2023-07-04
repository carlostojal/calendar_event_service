import { v4 as uuidv4 } from 'uuid';
import { DayPeriod } from './DayPeriod';

export class CalendarEvent {
    
    private _id: string;
    private name: string = "New Event";
    private description: string = "";

    // the starting date
    private date: Date = new Date();
    // can optimization move the event?
    private flexible: boolean = true;
    private preferredDayPeriod: DayPeriod;

    constructor() {
        // generate a new id
        this._id = uuidv4();
    }

    public get id(): string {
        return this._id;
    }

    public get eventName(): string {
        return this.name;
    }

    public set eventName(name: string) {
        this.name = name;
    }

    public get eventDescription(): string {
        return this.description;
    }

    public set eventDescription(description: string) {
        this.description = description;
    }

    public get isFlexible(): boolean {
        return this.flexible;
    }

    public set isFlexible(flexible: boolean) {
        this.flexible = flexible;
    }

    public get eventDate(): Date {
        return this.date;
    }

    public set eventDate(date: Date) {
        this.date = date;
    }

    public get eventDayPeriod(): DayPeriod {
        return this.preferredDayPeriod;
    }

    public set eventDayPeriod(dayPeriod: DayPeriod) {
        this.preferredDayPeriod = dayPeriod;
    }
}