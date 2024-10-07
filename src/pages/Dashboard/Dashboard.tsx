import "./Dashboard.scss";
import DashboardCards from "../../components/DashboardCards/DashboardCards";
import EventAttendeeSection from "../../components/EventAttendeeSection/EventAttendeeSection";
import { useContext } from "react";
import DashboardContext from "../../contexts/DashboardContext";
import Loader from "../../components/Loader/Loader";

function Dashboard() {
    const { isLoading } = useContext(DashboardContext);

    if (isLoading) return <Loader />;

    return (
        <div className="dashboard-page">
            <DashboardCards />
            <EventAttendeeSection />
        </div>
    );
}

export default Dashboard;
