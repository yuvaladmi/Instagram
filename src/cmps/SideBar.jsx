import { Link,useLocation,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from 'react'

import { logout } from "../store/actions/user.actions.js";
import { sideBarSvg } from "./svg.jsx";

export default function Sidebar() {
	const user = useSelector(storeState => storeState.userModule.loggedInUser);
    const location = useLocation()
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    const isActive = (path) => location.pathname === path

    const navigate = useNavigate()  

    function handleLogout() {
        logout(); // קריאה ל-Redux או API
        navigate("/login");
    }
    
    return (
        <section className="sidebar-container">
            <nav className="sidebar">
                <ul>
                    <li className="logo">
                        <a aria-current="page" className="active" href="/">
                            <span className="svg-icon logo-txt">
                            

 <svg width="250" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#833ab4" stopOpacity="1" />
          <stop offset="25%" stopColor="#fd1d1d" stopOpacity="1" />
          <stop offset="50%" stopColor="#fcb045" stopOpacity="1" />
          <stop offset="75%" stopColor="#ffdd00" stopOpacity="1" />
          <stop offset="100%" stopColor="#fcb045" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Camera icon */}
      <rect x="10" y="20" width="40" height="40" rx="10" ry="10" fill="url(#instaGradient)" />
      <circle cx="30" cy="40" r="8" fill="white" />
      <circle cx="40" cy="30" r="3" fill="white" />

      {/* Text */}
      <text
        x="60"
        y="50"
        fontFamily="Arial, sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill="url(#instaGradient)"
      >
        InstaTime
      </text>
    </svg>


                            </span>
                        </a>
                    </li>
                    <li className={`go-to-li ${isActive('/post') ? 'active' : ''}`}>
                        <Link to="/post">
                            <span className="svg-icon bold">
                            <div className="svg-wrapper">
                            {isActive('/post') ? sideBarSvg.homeActive : sideBarSvg.home}
                            </div>
                            </span>
                            <span className="link-txt">Home</span>
                        </Link>
                    </li>
                    <li className={`go-to-li ${isActive('/search') ? 'active' : ''}`}>
                        <Link to="/search">
                            <span>
                            <div className="svg-wrapper">
                                {sideBarSvg.search}
                            </div>
                            </span>
                            <span className="link-txt">Search</span>
                        </Link>
                    </li>
                    <li className={`go-to-li ${isActive('/messages') ? 'active' : ''}`}>
                        <Link to="/messages">
                            <span>
                            <div className="svg-wrapper">
                                {sideBarSvg.messages}
                            </div>
                            </span>
                            <span className="link-txt">Messages</span>
                        </Link>
                    </li>
                    <li className={`go-to-li ${isActive('/create') ? 'active' : ''}`}>
                        <Link to="/create">
                            <span>
                            <div className="svg-wrapper">
                                {sideBarSvg.create}
                            </div>
                            </span>
                            <span className="link-txt">Create</span>
                        </Link>
                    </li>
                    <li className={`go-to-li ${isActive('/profile') ? 'active' : ''}`}>
                        <Link to={`/profile/${user._id}`}>
                            <div className="svg-wrapper">
                                <img className="profile-img" src={user.imgUrl} ></img>
                            </div>
                            <span className="link-txt">Profile</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            {/* <nav className="lower-nav">
                <div className="more-menu">
                    <button
                        onClick={() => setIsMoreOpen(prev => !prev)}
                        className="link"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16" stroke="black" strokeWidth="2" />
                        </svg>
                        <span className="font-bold">More</span>
                    </button>

                    {isMoreOpen && (
                        <div className="menu-content">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                        >
                            Log out
                        </button>
                        </div>
                    )}
                </div>
            </nav> */}
        </section>
    );
}
