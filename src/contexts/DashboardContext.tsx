import { ChangeEvent, createContext, ReactNode, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultContextValue: DashboardContextInterface = {
    allAttendees: [],
    allEvents: [],
    getUpcomingEvents: () => [],
    getCompletedEvents: () => [],
    activeCard: 0,
    changeActiveCard: () => {},
    isEventActive: true,
    currentEvents: [],
    currentAttendees: [],
    searchFilter: () => {},
    deleteEvent: () => { },
    deleteAttendee: () => {}
};

const DashboardContext = createContext<DashboardContextInterface>(defaultContextValue);

type ProviderProps = { children?: ReactNode };

export const DashboardContextProvider = ({ children }: ProviderProps) => {
    const { events: allEvents, attendees: allAttendees, changeEvents, changeAttendees } = useLocalStorage();

    const [currentEvents, setCurrentEvents] = useState<MainEvents>([]);
    const [currentAttendees, setCurrentAttendees] = useState<Attendees>([]);
    const [activeCard, setActiveCard] = useState(0);
    const [isEventActive, setIsEventActive] = useState(true);

    useEffect(() => {
        changeActiveCard(0);
    }, [allEvents]);

    const getUpcomingEvents = (): MainEvents => {
        const now = new Date();
        return allEvents.filter(({ dateTime }: MainEvent) => new Date(dateTime) > now);
    };

    const getCompletedEvents = (): MainEvents => {
        const now = new Date();
        return allEvents.filter(({ dateTime }: MainEvent) => dateTime <= now);
    };

    const changeActiveCard = (active: number) => {
        setActiveCard(active);
        setIsEventActive(active !== 3);

        switch (active) {
            case 0:
                setCurrentEvents(getUpcomingEvents());
                break;
            case 1:
                setCurrentEvents(allEvents);
                break;
            case 2:
                setCurrentEvents(getCompletedEvents());
                break;
            case 3:
                setCurrentAttendees(allAttendees);
                break;
            default:
                break;
        }
    };

    const searchFilter = (ev: ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target;

        if (value)
            if (isEventActive) {
                setCurrentEvents((_) => {
                    return allEvents.filter(
                        ({ title, organizer }: MainEvent) =>
                            title.toLowerCase().includes(value.toLowerCase()) || organizer.name.toLowerCase().includes(value.toLowerCase())
                    );
                });
            } else {
                setCurrentAttendees((_) => {
                    return allAttendees.filter(
                        ({ name, email }: Attendee) =>
                            name.toLowerCase().includes(value.toLowerCase()) || email.toLowerCase().includes(value.toLowerCase())
                    );
                });
            }
        else {
            changeActiveCard(activeCard);
        }
    };

    const deleteEvent = (idx: number) => {
        changeEvents(allEvents.filter((_: MainEvent, index: number) => idx !== index));
        changeActiveCard(activeCard);
    };

    const deleteAttendee = (idx: number) => {
        changeAttendees(allAttendees.filter((_: Attendee, index: number) => idx !== index));
        changeActiveCard(activeCard);
    };

    const contextValue: DashboardContextInterface = {
        allEvents,
        allAttendees,
        getUpcomingEvents,
        getCompletedEvents,
        activeCard,
        changeActiveCard,
        isEventActive,
        currentEvents,
        currentAttendees,
        searchFilter,
        deleteEvent,
        deleteAttendee
    };

    return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};

export default DashboardContext;
