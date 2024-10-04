import { ChangeEvent, MouseEvent, useState } from "react";
import { createPortal } from "react-dom";
import { attendeeValidation } from "../../helpers";
import "./AttendeeModal.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LocalStorageKey } from "../../enum";

type PropTypes = {
    setShowAttendeeModal: (value: boolean) => void;
    setFormFields: (event: (prevEvent: IdOmittedEvent) => IdOmittedEvent) => void;
    attendees: Attendees;
};

const AttendeeModal = ({ setShowAttendeeModal, setFormFields, attendees }: PropTypes) => {
    const [attendee, setAttendee] = useState({ name: "", email: "" });
    const { attendees: localStorageAttendees, saveToStorage } = useLocalStorage();

    const closeModal = () => setShowAttendeeModal(false);

    const handleOnChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target;
        setAttendee((prev) => ({ ...prev, [name]: value }));
    };

    const handleOnClickAdd = (ev: MouseEvent) => {
        ev.preventDefault();

        if (!attendeeValidation(attendees, attendee)) {
            alert("//TODO: Toast - Invalid attendee data.");
            return;
        }

        setFormFields((prev) => ({
            ...prev,
            attendees: [...prev.attendees, attendee],
        }));

        saveToStorage(LocalStorageKey.Attendees, JSON.stringify([...localStorageAttendees, attendee]));
        closeModal();
    };

    const handleOnSelection = (ev: ChangeEvent<HTMLSelectElement>) => {
        ev.preventDefault();
        const selectedIndex = ev.target.selectedIndex - 1;
        if (selectedIndex >= 0) {
            const selectedAttendee = attendees[selectedIndex];
            setFormFields((prev) => ({
                ...prev,
                attendees: [...prev.attendees, selectedAttendee],
            }));
            closeModal();
        }
    };

    return createPortal(
        <>
            <div className="modal-background" onClick={closeModal}></div>

            <div className="attendee-modal">
                <button type="button" id="close-dialog-btn" onClick={closeModal}>
                    <div className="slant-lines">
                        <div className="ltr"></div>
                        <div className="rtl"></div>
                    </div>
                </button>

                <div className="add-attendee">
                    <h2>Add Attendee</h2>
                    <ul className="attendee-form">
                        <li className="input-wrapper">
                            <label>
                                Name <span>*</span>
                            </label>
                            <input type="text" name="name" onChange={handleOnChange} placeholder="Enter name" />
                        </li>
                        <li className="input-wrapper">
                            <label>
                                Email <span>*</span>
                            </label>
                            <input type="text" name="email" onChange={handleOnChange} placeholder="Enter email" />
                        </li>
                        <li className="form-buttons">
                            <button type="button" className="reset-btn" onClick={() => setAttendee({ name: "", email: "" })}>
                                Reset
                            </button>
                            <button type="button" className="submit-btn" onClick={handleOnClickAdd}>
                                Add
                            </button>
                        </li>
                    </ul>
                </div>

                {attendees.length !== 0 && (
                    <>
                        <div className="separator">
                            <div className="line"></div>
                            <h4>OR</h4>
                            <div className="line"></div>
                        </div>

                        <div className="select-attendee">
                            <h2>Select an Attendee</h2>
                            <div className="input-wrapper">
                                <select name="attendee" defaultValue="" onChange={handleOnSelection}>
                                    <option value="" disabled>
                                        --Select--
                                    </option>
                                    {attendees.map(({ name, email }: Attendee, idx: number) => (
                                        <option key={`attendee-modal-${email}-${idx}`}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>,
        document.querySelector("#modal-portal")!
    );
};

export default AttendeeModal;
