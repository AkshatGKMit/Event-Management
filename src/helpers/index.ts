export const formattedDateForInput = (dateTime: Date) => {
    const year = dateTime.getFullYear().toString();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const date = dateTime.getDate().toString().padStart(2, "0");
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${date}T${hours}:${minutes}`;
};

export function generateId<T extends { id: string }>(list: T[]): string {
    let isIdUnique = false;
    let id: number;

    do {
        const randNum = Math.random();
        const fiveDigitNum = Math.floor(10000 + randNum * 90000);
        id = fiveDigitNum;

        const idIndex = list.findIndex((item: T) => fiveDigitNum.toString() === item.id);

        isIdUnique = idIndex === -1;
    } while (!isIdUnique);

    return `ev${id.toString()}`;
}

function isAtLeastOneHourAhead(dateToCheck: Date): boolean {
    const now = new Date();
    const minimumAllowedDate = new Date(now.getTime() + 30 * 60 * 1000);

    return dateToCheck >= minimumAllowedDate;
}

export function eventValidation(event: IdOmittedEvent): boolean {
    const { title, dateTime } = event;

    if (title === "") {
        alert("// TODO: Toast - Title should be there");
        return false;
    }

    const isDateTimeCorrect = isAtLeastOneHourAhead(dateTime);
    if (!isDateTimeCorrect) {
        alert("//TODO: Toast - Date time incorrect");
        return false;
    }

    return true;
}

export function attendeeValidation(attendees: Attendees, attendee: Attendee): boolean {
    const { name, email } = attendee;

    if (name === "" || email === "") {
        alert("// TODO: Toast - Name should be there");
        return false;
    }

    const isEmailPresent = attendees.find(({ email: findingEmail }: Attendee) => findingEmail === email);

    if (isEmailPresent) {
        alert("//TODO: Toast - Email already present");
        return false;
    }

    return true;
}

export function getDateString(incomingDate: Date): string {
    const date = new Date(incomingDate);

    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
}

export function getTimeString(incomingDate: Date): string {
    const date = new Date(incomingDate);

    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:00`;
}
