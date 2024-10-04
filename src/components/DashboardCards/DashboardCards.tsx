import { MouseEvent, useContext } from "react";
import DashboardContext from "../../contexts/DashboardContext";
// import { useNavigate } from "react-router-dom";
import "./DashboardCards.scss";
import SummaryCard from "../SummaryCard/SummaryCard";

const DashboardCards = () => {
    // const navigate = useNavigate()
    const { allEvents: events, allAttendees: attendees, getUpcomingEvents, getCompletedEvents } = useContext(DashboardContext);

    const handleOnCLickAddEvent = (ev: MouseEvent) => {
        ev.preventDefault();

        // navigate("/add-update-event")
    };

    return (
        <section className="cards-section">
            <h1>Dashboard</h1>
            <div className="card-wrapper">
                <div className="summary-cards">
                    <SummaryCard title="Upcoming Events" value={getUpcomingEvents().length} index={0} />
                    <SummaryCard title="Total Events" value={events.length} index={1} />
                    <SummaryCard title="Completed Events" value={getCompletedEvents().length} index={2} />
                    <SummaryCard title="Total Attendees" value={attendees.length} index={3} />
                </div>
                <div className="vr"></div>
                <div className="add-cards">
                    <div className="add-card" onClick={handleOnCLickAddEvent}>
                        <div className="padding">
                            <div className="lines">
                                <div className="hr"></div>
                                <div className="vr"></div>
                            </div>
                        </div>
                        <label>Add Events</label>
                    </div>

                    <div className="add-card">
                        <div className="padding">
                            <div className="lines">
                                <div className="hr"></div>
                                <div className="vr"></div>
                            </div>
                        </div>
                        <label>Add Attendees</label>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardCards;
