import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardContextProvider } from "../../contexts/DashboardContext";
import Dashboard from "../Dashboard/Dashboard";
import "./App.scss";
import Navbar from "../../components/Navbar/Navbar";
import Page404 from "../Page404/Page404";
import AddEditEvent from "../AddEditEvent/AddEditEvent";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <DashboardContextProvider>
                                <Dashboard />
                            </DashboardContextProvider>
                        }
                    />
                    <Route path="/add-edit-event/:eventId" Component={AddEditEvent} />
                    <Route path="*" Component={Page404} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
