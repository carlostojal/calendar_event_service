import express, { Express, Request, Response } from 'express';
import { EventController } from './controllers/EventController';
import dotenv from 'dotenv';
import { CalendarEvent } from './models/CalendarEvent';

dotenv.config();

const app: Express = express();

const eventController = new EventController();

app.use(express.json());

app.get('/events', (req, res) => {
    res.json(eventController.getEvents());
});

// add a new event
app.put('/events', (req, res) => {
    const event = req.body;
    const newEvent = new CalendarEvent();
    newEvent.eventName = event.name || "New Event";
    newEvent.eventDescription = event.description || "";
    newEvent.eventDate = new Date(event.date) || new Date();
    newEvent.eventDayPeriod = event.dayPeriod || null;
    newEvent.isFlexible = event.flexible || true;
    newEvent.eventDurationMinutes = event.durationMinutes || 30;
    console.log(newEvent);
    eventController.addEvent(newEvent);
    // TODO: call the optimization service
    res.json(newEvent);
});

// events index
app.get('/events/:id', (req, res) => {
    const id = req.params.id;
    const event = eventController.getEvent(id);
    res.json(event);
});

// update an event
app.patch('/events/:id', (req, res) => {
    const id = req.params.id;
    const event = req.body;
    const updatedEvent = new CalendarEvent();
    updatedEvent.id = id;
    updatedEvent.eventName = event.eventName || "New Event";
    updatedEvent.eventDescription = event.eventDescription || "";
    updatedEvent.eventDate = new Date(event.eventDate) || new Date();
    updatedEvent.eventDayPeriod = event.eventDayPeriod || null;
    updatedEvent.isFlexible = event.isFlexible || true;
    eventController.updateEvent(id, updatedEvent);
    // TODO: call the optimization service
    res.json(updatedEvent);
});

app.get('/events/date/:date', (req, res) => {
    const date = req.params.date;
    const events = eventController.getEventsByDate(new Date(date));
    res.json(events);
});

// delete an event
app.delete('/events/:id', (req, res) => {
    const id = req.params.id;
    eventController.deleteEvent(id);
    res.json({ id });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Event service listening on port ${port}`);
});