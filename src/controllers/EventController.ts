import { CalendarEvent } from '../models/CalendarEvent';

export class EventController {

    private events: CalendarEvent[] = [];
    private eventsById: Map<string, CalendarEvent> = new Map();
    // TODO: events by date

    public getEvents(): CalendarEvent[] {
        return this.events;
    }

    public getEvent(id: string): CalendarEvent | null {
        return this.eventsById.get(id) || null;
    }

    public addEvent(event: CalendarEvent): void {
        this.events.push(event);
        this.eventsById.set(event.id, event);
    }

    public updateEvent(id: string, event: CalendarEvent): void {
        const index = this.events.findIndex((event) => event.id === id);
        this.events[index] = event;
        this.eventsById.set(id, event);
    }

    public deleteEvent(id: string): void {
        this.events = this.events.filter((event) => event.id !== id);
        this.eventsById.delete(id);
    }
}