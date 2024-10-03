declare interface Attendee {
    name: string;
    email: string;
}

declare interface MainEvent {
    readonly id: string;
    title: string;
    dateTime: Date;
    description: string;
    attendeeLimit: number;
    venue: Venue;
    organizer: Attendee;
    attendees: Attendee[];
}

type Attendees = Attendee[];
type MainEvents = MainEvent[];
type IdOmittedEvent = Omit<MainEvent, "id">;