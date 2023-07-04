import { v4 as uuidv4 } from 'uuid';

class CalendarEvent {
    
    private _id: string;
    private name: string = "New Event";
    private description: string = "";

    // the starting date
    private date: Date = new Date();
    // can optimization move the event?
    private flexible: boolean = true;

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
}