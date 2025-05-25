import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storySvg } from "../cmps/svg.jsx";

import { userService } from "../services/user.service.js";
import { loadStoriesByUser } from "../store/actions/story.actions.js";

export function Profile() {
	const stories = useSelector(storeState => storeState.storyModule.loggedInUserStories);
	const user = useSelector(storeState => storeState.userModule.loggedInUser);

	const [details, setDetails] = useState({});
	const [gridPosts, setGridPosts] = useState([]);
	const [isActive, setIsActive] = useState("posts");

	useEffect(() => {
		userService.getById(user._id).then(setDetails);
		if (stories.length === 0) {
			const fetchData = async () => {
				await loadStoriesByUser(user._id);
			};
			fetchData();
		}
	}, []);

	useEffect(() => {
		setGridPosts(stories)
	}, [stories])

	const { username, fullname, imgUrl, following, followers, savedStoryIds } =
		user;

	const filteredPosts = () => {
		return setGridPosts(stories);
	};

	const filteredSaved = () => {	
		const filtered = [];
		savedStoryIds.forEach(savedId => {
			console.log(typeof savedId);
			stories.filter(story => {
				if (story._id === savedId) filtered.push(story);
			});
		});

		return filtered;
	};
console.log(JSON.stringify(stories));
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
							<span className="numbers">{stories?.length || 0}</span> posts
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
					<div
						className={`posts ${isActive === "posts" ? "active" : ""}`}
						onClick={() => {
							filteredPosts();
							setIsActive("posts");
						}}
					>
						<span className="nav_svg">{storySvg.profile_posts} </span> posts
					</div>
					<div
						className={`saved ${isActive === "saved" ? "active" : ""}`}
						onClick={() => {
							setGridPosts(filteredSaved);
							setIsActive("saved");
							console.log(filteredSaved());
						}}
					>
						<span className="nav_svg">{storySvg.profile_saved} </span> saved
					</div>
				</div>
				<div className="profile_stories_grid">
					{gridPosts.length > 0 ? (
						gridPosts.map(story => (
							<div className="profile_story" key={story.id}>
								<img src={story.imgUrl} alt="Story" />
								{isActive === "posts" ? (
									<p className="notes">
										<span className="likes">{storySvg.like("white")}</span>
										{story.likedBy.length}
										<span className="nav_svg comments">{storySvg.comment}</span>
										{story.comments.length}
									</p>
								) : (
									""
								)}
							</div>
						))
					) : (
						<h1>No posts</h1>
					)}
				</div>
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
