import React from "react";
import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";

import "./assets/style/pages/App.css";

import SideBar from "./cmps/SideBar.jsx";
import { StoryDetails } from "./cmps/StoryDetails";
import { StoryIndex } from "./pages/StoryIndex";
// import CreateStoryModal from './cmps/create-modal'
import { LoginSignup } from "./cmps/LoginSignup";
import { UserDetails } from "./pages/userDetails";
import { Profile } from "./pages/Profile.jsx";
// import { MessagesPage } from './pages/messages'
// import { ChatApp } from './pages/chat-app'
// import { ReviewIndex } from './pages/review-index'
// import { Messanger } from './pages/messanger'
// import { MessangerContainer } from './cmps/messanger-container'

export default function App() {
	// const isModalOpen = useSelector(storeState => storeState.systemModule.isModalOpen)

	return (
		<div className="app-container">
			{/* {isModalOpen && <CreateStoryModal />} */}
			<SideBar />
			<main className="contant-container">
				<Routes>
					<Route path="/post" element={<StoryIndex />}>
						<Route path="/post/:id" element={<StoryDetails />} />
					</Route>
					<Route path="/:username" element={<UserDetails />} />
					<Route path="/profile" element={<Profile />} />
					{/* <Route path="inbox" element={<Messanger />} >
                        <Route path=":id" element={<Messanger />} />
                    </Route> */}
					{/* <Route path="/login" element={<LoginSignup />} /> */}
					{/* <Route path="chat" element={<ChatApp />} /> */}
				</Routes>
			</main>
		</div>
	);
}
