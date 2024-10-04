import { DashboardContextProvider } from "../../contexts/DashboardContext";
import Dashboard from "../Dashboard/Dashboard";
import "./App.scss";

function App() {
    return (
        <div className="App">
            <DashboardContextProvider>
                <Dashboard />
            </DashboardContextProvider>
        </div>
    );
}

export default App;
