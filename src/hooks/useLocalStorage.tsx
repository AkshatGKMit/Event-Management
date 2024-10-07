import { useEffect, useState } from "react";
import { LocalStorageKey } from "../enum/index";

const useLocalStorage = () => {
    const [events, setEvents] = useState<MainEvents>([]);
    const [attendees, setAttendees] = useState<Attendees>([]);

    useEffect(() => {
        setEvents(getFromStorage<MainEvents>(LocalStorageKey.Events) ?? []);
        setAttendees(getFromStorage<Attendees>(LocalStorageKey.Attendees) ?? []);
    }, []);

    const changeEvents = (newEvents: MainEvents) => {
        setEvents(newEvents);
        saveToStorage(LocalStorageKey.Events, JSON.stringify(newEvents));
    };

    const changeAttendees = (newAttendees: Attendees) => {
        setAttendees(newAttendees);
        saveToStorage(LocalStorageKey.Attendees, JSON.stringify(newAttendees));
    };

    const saveToStorage = (key: LocalStorageKey, value: string) => {
        localStorage.setItem(key, value);
    };

    function getFromStorage<T>(key: LocalStorageKey): T | undefined {
        const item = localStorage.getItem(key);
        if (item) return JSON.parse(item) as T;
        return undefined;
    }

    return { events, attendees, changeEvents, changeAttendees };
};

export default useLocalStorage;
