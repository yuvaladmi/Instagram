import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LoginSignup } from "./LoginSignup.jsx";

import "../assets/style/pages/SideBar.css";

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { logout } from "../store/actions/user.actions.js";

export default function Sidebar() {
	const user = useSelector(storeState => storeState.userModule.loggedInUser);
	console.log("User:", user);

	function onLogout() {
		logout()
			.then(() => {
				showSuccessMsg("Logout successfully");
			})
			.catch(err => {
				showErrorMsg("OOPs try again");
			});
	}
	return (
		<section className="sidebar-container">
			{/* User Info Section */}
			{user ? (
				<div className="user-info">
					<Link to={`/user/${user.id}`}>Hello, {user.fullname}</Link>
					<button onClick={onLogout}>Logout</button>
				</div>
			) : (
				<LoginSignup />
			)}

			{/* Navigation Section */}
			<nav className="sidebar">
				<ul>
					<li>
						<Link to="/post">🏠 Home</Link>
					</li>
					<li>
						<Link to="/search">🔍 Search</Link>
					</li>
					<li>
						<Link to="/messages">✉️ Messages</Link>
					</li>
					<li>
						<Link to="/profile">👤 Profile</Link>
					</li>
				</ul>
			</nav>
		</section>
	);
}
