import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LoginSignup } from "./LoginSignup.jsx";

import "../assets/style/pages/SideBar.css";

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { logout } from "../store/actions/user.actions.js";
import { sideBarSvg } from "./svg.jsx";

export default function Sidebar() {
	const user = useSelector(storeState => storeState.userModule.loggedInUser);
	console.log("User:", user);

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }
    return (
        <section className="sidebar-container">
            {/* Navigation Section */}
            <nav className="sidebar">
                <ul>
                    <li className="logo">
                        <a aria-current="page" className="active" href="/">
                            <span class="svg-icon logo-txt">
                               {sideBarSvg.instagramLogo}
                            </span>
                        </a>
                    </li>
                    <li>
                        <Link to="/post">
                            <span class="svg-icon bold">
                                {sideBarSvg.home}
                            </span>
                            <span className="link-txt">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/search">
                            <span>
                                {sideBarSvg.search}
                            </span>
                            <span className="link-txt">Search</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/messages">
                            <span>
                                {sideBarSvg.messages}
                            </span>
                            <span className="link-txt">Messages</span>
                        </Link>
                    </li>
                    <li><Link to="/profile">👤 Profile</Link></li>
                </ul>
            </nav>
             {/* User Info Section */}
             {user ? (
                <div className="user-info">
                    <Link to={`/user/${user.id}`}>Hello, {user.fullname}</Link>
                    <button onClick={onLogout}>Logout</button>
                </div>
            ) : (
                <LoginSignup />
            )}
        </section>
    );
}
