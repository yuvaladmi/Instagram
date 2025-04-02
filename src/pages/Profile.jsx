import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../assets/style/pages/Profile.css";
import { storySvg } from "../cmps/svg.jsx";
import { loadUsers, savedStoryUser } from "../store/actions/user.actions.js";
import { userService } from "../services/user.service.js";
import { utilService } from "../services/util.service.js";
import { loadStories } from "../store/actions/story.actions.js";

export function Profile() {
	const stories = useSelector(storeState => storeState.storyModule.stories);
	const user = useSelector(storeState => storeState.userModule.loggedInUser);

	const [details, setDetails] = useState({});
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		userService.getById(user._id).then(setDetails);
		if (stories.length === 0) {
			const fetchData = async () => {
				await loadStories();
			};
			fetchData();
		}
		const savedStories = stories.map(story => {});
	}, []);

	details ? console.dir(details) : console.log("no details");

	const { username, fullname, imgUrl, following, followers, savedStoryIds } =
		details;

	return (
		<div className="profile_container">
			<header className="profile_contant">
				<section className="profile_img">
					<img src={`${imgUrl}`} className="picture" alt="" />
				</section>
				<div className="profile_details">
					<div className="top">
						<span className="user_name">{username}</span>
						<div className="profile-edit">Edit Profile</div>
					</div>
					<div className="middle">
						<div className="profile_posts">
							<span className="numbers">{savedStoryIds?.length || 0}</span> posts
						</div>
						<div className="profile_followers">
							<span className="numbers">{followers?.length || 0}</span> followers
						</div>
						<div className="profile_following">
							<span className="numbers">{following?.length || 0}</span> following
						</div>
					</div>
					<div className="bottom">
						<span className="user_name">{fullname}</span>
					</div>
				</div>
			</header>
			<main className="profile_main">
				<div className="profie_main_nav">
					<div className="posts active">
						<span className="nav_svg">{storySvg.profile_posts} </span> posts
					</div>
					<div className="saved">
						<span className="nav_svg">{storySvg.profile_saved} </span> saved
					</div>
				</div>
				<div className="profile_storie_grid"></div>
			</main>
		</div>
	);
}

// const user = {
// 	_id: "Xma2l",
// 	username: "koko",
// 	password: "1234",
// 	fullname: "Koko Jambo",
// 	imgUrl: "https://randomuser.me/api/portraits/women/16.jpg",
// 	following: [
// 		{
// 			_id: "u106",
// 			fullname: "Dob",
// 			imgUrl: "https://randomuser.me/api/portraits/women/25.jpg",
// 		},
// 	],
// 	followers: [
// 		{
// 			_id: "u105",
// 			fullname: "Bob",
// 			imgUrl: "https://randomuser.me/api/portraits/men/75.jpg",
// 		},
// 	],
// 	savedStoryIds: ["s590", "2134", "s245"],
// };
