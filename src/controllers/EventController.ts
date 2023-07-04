import { CalendarEvent } from '../models/CalendarEvent';
import { Utils } from '../models/Utils';

export class EventController {

    private events: CalendarEvent[] = [];
    private eventsById: Map<string, CalendarEvent> = new Map();
    private eventsByDate: Map<string, CalendarEvent[]> = new Map();

    public getEvents(): CalendarEvent[] {
        return this.events;
    }

    public getEvent(id: string): CalendarEvent | null {
        return this.eventsById.get(id) || null;
    }

    public getEventsByDate(date: Date): CalendarEvent[] {
        return this.eventsByDate.get(Utils.getDateStr(date)) || [];
    }

    public addEvent(event: CalendarEvent): void {
        this.events.push(event);
        this.eventsById.set(event.id, event);
        if(this.eventsByDate.has(Utils.getDateStr(event.eventDate)))
            this.eventsByDate.get(Utils.getDateStr(event.eventDate))?.push(event);
        else
            this.eventsByDate.set(Utils.getDateStr(event.eventDate), [event]);
    }

    public updateEvent(id: string, event: CalendarEvent): void {
        const index = this.events.findIndex((event) => event.id === id);
        this.events[index] = event;
        this.eventsById.set(id, event);
        this.eventsByDate.forEach((events, date) => {
            this.eventsByDate.set(
                date,
                events.filter((event) => event.id !== id)
            );
        });
    }

    public deleteEvent(id: string): void {
        this.events = this.events.filter((event) => event.id !== id);
        this.eventsById.delete(id);
        this.eventsByDate.forEach((events, date) => {
            this.eventsByDate.set(
                date,
                events.filter((event) => event.id !== id)
            );
        });
    }
}