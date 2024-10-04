import { useState } from "react";
import { LocalStorageKey } from "../enum/index";

const useLocalStorage = () => {
    const [events] = useState<MainEvents>(() => getFromStorage<MainEvents>(LocalStorageKey.Events) ?? []);
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
