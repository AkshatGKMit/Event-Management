import { useState } from "react";
import { LocalStorageKey } from "../enum";

const useLocalStorage = () => {
    //TODO: Implement its useEffect when context is ready
    const [events] = useState<MainEvents>(() => getFromStorage<MainEvents>(LocalStorageKey.Events) ?? []);
    //TODO: Implement its useEffect when context is ready
    const [attendees] = useState<Attendees>(() => getFromStorage<Attendees>(LocalStorageKey.Attendees) ?? []);

    const saveToStorage = (key: LocalStorageKey, value: string) => {
        localStorage.setItem(key, value);
    };

    function getFromStorage<T>(key: LocalStorageKey): T | undefined {
        const item = localStorage.getItem(key);
        if (item) return JSON.parse(item) as T;
        return undefined;
    }

    return { events, attendees, saveToStorage };
};

export default useLocalStorage;
