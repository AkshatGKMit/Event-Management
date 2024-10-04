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

declare interface DashboardContextInterface {
    allEvents: MainEvents;
    allAttendees: Attendees;
    getUpcomingEvents: () => MainEvents;
    getCompletedEvents: () => MainEvents;
    activeCard: number;
    changeActiveCard: (value: number) => void;
    isEventActive: boolean;
    currentEvents: MainEvents;
    currentAttendees: Attendees
    searchFilter: (ev: ChangeEvent<HTMLInputElement>) => void;
}
