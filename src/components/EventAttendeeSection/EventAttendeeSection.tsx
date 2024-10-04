import { useContext, useState } from "react";
import DashboardContext from "../../contexts/DashboardContext";
import "./EventAttendeeSection.scss";
import { getDateString, getTimeString } from "../../helpers";
import { useNavigate } from "react-router-dom";
import AttendeeModal from "../AttendeeModal/AttendeeModal";

const EventAttendeeSection = () => {
    const navigate = useNavigate();

    const { currentEvents, currentAttendees, isEventActive, searchFilter, deleteEvent, deleteAttendee, allAttendees, changeActiveCard } =
        useContext(DashboardContext);

    const [showAttendeeModal, setShowAttendeeModal] = useState(false);
    const [editIdx, setEditIdx] = useState(-1);

    const eventTableHeading = ["Date", "Time", "Title", "Organizer", "Venue"];
    const attendeeTableHeading = ["Name", "Email"];

    const onEditClicked = (idx: number) => {
        setEditIdx(idx);
        setShowAttendeeModal(true);
    };

    return (
        <section className="display-section">
            <div className="head-wrapper">
                <div className="heading"></div>
                <div className="addon-buttons">
                    <input
                        type="text"
                        name=""
                        className="search-input"
                        onChange={searchFilter}
                        placeholder={`Search ${isEventActive ? "Event" : "Attendee"}`}
                    />
                    {/* //TODO: Custom select box for sorting */}
                </div>

                <table className="mapping-items">
                    <thead>
                        <tr>
                            {(isEventActive ? eventTableHeading : attendeeTableHeading).map((title: string) => (
                                <th key={title}>{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(isEventActive ? currentEvents : currentAttendees).map((item: MainEvent | Attendee, idx: number) => {
                            if (isEventActive && "dateTime" in item) {
                                const { dateTime, title, organizer, venue, id } = item;
                                return (
                                    <tr key={item.id}>
                                        <td>{getDateString(dateTime)}</td>
                                        <td>{getTimeString(dateTime)}</td>
                                        <td>{title}</td>
                                        <td>{organizer.name}</td>
                                        <td>{venue}</td>
                                        <td>
                                            <button type="button" onClick={() => navigate(`/add-edit-event/${id}`)}>
                                                Edit
                                            </button>
                                            <button type="button" onClick={() => deleteEvent(idx)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }

                            const { name, email } = item as Attendee;
                            return (
                                <tr key={email}>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onEditClicked(idx);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button type="button" onClick={() => deleteAttendee(idx)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {showAttendeeModal && (
                <AttendeeModal
                    attendees={allAttendees}
                    index={editIdx}
                    setFormFields={() => {}}
                    setShowAttendeeModal={setShowAttendeeModal}
                    reload={() => changeActiveCard(3)}
                    isUpdating
                />
            )}
        </section>
    );
};

export default EventAttendeeSection;
