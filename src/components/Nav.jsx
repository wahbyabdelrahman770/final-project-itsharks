import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="text-center bg-cyan-800 p-4 text-2xl text-white flex flex-row justify-around">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
        </nav>
    );
};

export default Nav;