import "./Dashboard.scss";
import DashboardCards from "../../components/DashboardCards/DashboardCards";
import EventAttendeeSection from "../../components/EventAttendeeSection/EventAttendeeSection";

function Dashboard() {
    return (
        <div className="dashboard-page">
            <DashboardCards />
            <EventAttendeeSection />
        </div>
    );
}

export default Dashboard;
