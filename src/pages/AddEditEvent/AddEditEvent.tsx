import { useNavigate, useParams } from "react-router-dom";
import "./AddEditEvent.scss";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Venue } from "../../enum";
import AttendeeModal from "../../components/AttendeeModal/AttendeeModal";
import useLocalStorage from "../../hooks/useLocalStorage";
import { eventValidation, formattedDateForInput, generateId } from "../../helpers";
import Loader from "../../components/Loader/Loader";

type ParamsType = { eventId: string };

const defaultFormValues: IdOmittedEvent = {
    title: "",
    dateTime: new Date(),
    description: "",
    attendeeLimit: 1,
    venue: Venue.AdminRoom,
    organizer: {
        name: "",
        email: "",
    },
    attendees: [],
};

const AddEditEvent = () => {
    const navigate = useNavigate();
    const Params = useParams<ParamsType>();

    const { events, attendees, changeEvents } = useLocalStorage();

    const [eventId, setEventId] = useState<undefined | string>(undefined);
    const [formFields, setFormFields] = useState(defaultFormValues);
    const [attendeesList, setAttendeesList] = useState<Attendees>([]);
    const [showAttendeeModal, setShowAttendeeModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    function getEventId() {
        const eventId = Params?.eventId || undefined;
        if (eventId) {
            setEventId(eventId);

            const updatingEvent = events.find(({ id }: MainEvent) => eventId === id)!;
            const { dateTime } = updatingEvent;
            setFormFields({ ...updatingEvent, dateTime: new Date(dateTime) });
        } else {
            setFormFields(defaultFormValues);
        }
    }

    function loadStart() {
        return new Promise((resolve) => {
            setTimeout(() => {
                getEventId();
                setAttendeesList(attendees);
                setIsLoading(false);
            }, 0);
        });
    }

    //* Set event ID and populate form fields for adding or updating
    useEffect(() => {
        async function loadAsyncData() {
            try {
                await loadStart();
            } catch (error) {
                alert("Error loading tasks:" + error);
            }
        }

        loadAsyncData();
    }, [attendees]);

    //* Filter available attendees for selection
    const availableAttendees = attendeesList.filter(
        ({ email }: Attendee) => !formFields.attendees.some(({ email: addedEmail }: Attendee) => addedEmail === email)
    );

    //* Handle Input changes
    const handleOnChangeInput = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = ev.target;

        setFormFields({ ...formFields, [name]: name === "dateTime" ? new Date(value) : value });
    };

    //* Handle selection of organizer
    const handleOnChangeSelection = (ev: ChangeEvent<HTMLSelectElement>) => {
        const selectedEmail = ev.target.value;
        const selectedAttendee = attendeesList.find(({ email }: Attendee) => email === selectedEmail);

        if (selectedAttendee) {
            setFormFields((prev) => ({
                ...prev,
                organizer: selectedAttendee,
            }));
        }
    };

    //* Handle adding an attendee
    function handleOnClickAddAttendee() {
        const { name } = formFields.organizer;
        if (name === "") {
            alert("//TODO: Toast - Add organizer first");
            return;
        }

        setShowAttendeeModal(true);
    }

    //* Remove attendee from list
    const removeAttendee = (ev: MouseEvent, index: number) => {
        ev.preventDefault();
        setFormFields({ ...formFields, attendees: formFields.attendees.filter((_: Attendee, idx: number) => idx !== index) });
    };

    const handleReset = (ev: MouseEvent) => {
        ev.preventDefault();
        setFormFields(defaultFormValues);
    };

    const handleSubmit = (ev: MouseEvent) => {
        ev.preventDefault();

        const isEventValid = eventValidation(formFields);
        if (!isEventValid) {
            handleReset(ev);
            return;
        }

        changeEvents([
            ...events.filter(({ id }: MainEvent) => id !== eventId),
            {
                ...formFields,
                id: eventId ?? generateId(events),
            },
        ]);

        handleReset(ev);
        navigate("/");
    };

    if (isLoading) return <Loader />;

    return (
        <div className="add-edit-event-page">
            <div className="add-edit-event-form">
                <div className="head">{eventId ? "Update " : "Add "} Event</div>
                <ul className="form-inputs">
                    {/* //* Event Title */}
                    <li className="input-wrapper">
                        <label>
                            Title <span>*</span>
                        </label>
                        <input type="text" name="title" placeholder="Enter title" value={formFields.title} onChange={handleOnChangeInput} />
                    </li>

                    {/* //* Event Organizer */}
                    <li className="input-wrapper">
                        <label>
                            Organizer <span>*</span>
                        </label>
                        <select name="organizer" value={formFields.organizer.email} onChange={handleOnChangeSelection}>
                            <option value={""} disabled>
                                --Select An Organizer--
                            </option>
                            {availableAttendees.map(({ name, email }: Attendee, idx: number) => (
                                <option key={`organizer${email}${idx}`} value={email}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </li>

                    {/* //* Event Date & Time */}
                    <li className="input-wrapper">
                        <label>
                            Date & Time <span>*</span>
                        </label>
                        <input
                            type="datetime-local"
                            name="dateTime"
                            value={formattedDateForInput(formFields.dateTime!)}
                            onChange={handleOnChangeInput}
                        />
                    </li>

                    {/* //* Event Description */}
                    <li className="input-wrapper">
                        <label>Description</label>
                        <textarea
                            minLength={30}
                            cols={100}
                            rows={4}
                            name="description"
                            placeholder="Enter description"
                            value={formFields.description}
                            onChange={handleOnChangeInput}
                        />
                    </li>

                    {/* //* Number of attendees in event */}
                    <li className="input-wrapper">
                        <label>
                            Number of attendees <span>*</span>
                        </label>
                        <input
                            type="number"
                            name="attendeeLimit"
                            placeholder="Enter number of attendees"
                            value={formFields.attendeeLimit}
                            onChange={handleOnChangeInput}
                            min={1}
                        />
                    </li>

                    {/* //* Event Venue */}
                    <li className="input-wrapper">
                        <label>
                            Venue <span>*</span>
                        </label>
                        <select name="venue" value={formFields.venue} onChange={handleOnChangeSelection}>
                            {Object.values(Venue).map((venue: Venue, idx: number) => (
                                <option key={`venue-options${idx}`}>{venue}</option>
                            ))}
                        </select>
                    </li>

                    {/* //* Event Attendees */}
                    <li className="input-wrapper">
                        <label>
                            Attendees
                            {formFields.attendees.length < formFields.attendeeLimit && (
                                <button id="add-attendee" onClick={handleOnClickAddAttendee}>
                                    +
                                </button>
                            )}
                        </label>

                        <div className="attendee-wrapper">
                            {formFields.attendees.map(({ name, email }: Attendee, idx: number) => (
                                <div key={`add-attendee${email}${idx}`} className="attendee">
                                    <label>{name}</label>
                                    <button className="remove-attendee" onClick={(ev) => removeAttendee(ev, idx)}>
                                        -
                                    </button>
                                </div>
                            ))}
                            {!formFields.attendees.length && <div className="no-attendee">No Attendee selected</div>}
                        </div>
                    </li>

                    <div className="form-buttons">
                        <button className="reset-btn" onClick={handleReset}>
                            Clear All
                        </button>
                        <button className="submit-btn" onClick={handleSubmit}>
                            {eventId ? "Update" : "Submit"}
                        </button>
                    </div>
                </ul>

                {showAttendeeModal && (
                    <AttendeeModal
                        attendees={availableAttendees.filter(({ email }: Attendee) => email !== formFields.organizer.email)}
                        setFormFields={(updateFunc) => setFormFields((prev) => updateFunc(prev))}
                        setShowAttendeeModal={setShowAttendeeModal}
                    />
                )}
            </div>
        </div>
    );
};

export default AddEditEvent;
