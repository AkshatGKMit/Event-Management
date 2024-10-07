import "./Navbar.scss";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const navLinkClassName = ` nav-link ${({ isActive }: { isActive: boolean }) => (isActive ? "active" : null)}`;

    return (
        <header>
            <h1 className="heading">
                <NavLink className={`logo ${navLinkClassName}`} to={"/"}>
                    Event Management
                </NavLink>
            </h1>
            <div className="nav-links">
                <NavLink className={navLinkClassName} to={"/settings"}>
                    Settings
                </NavLink>
            </div>
        </header>
    );
};

export default Navbar;
