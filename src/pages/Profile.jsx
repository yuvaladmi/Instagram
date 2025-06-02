import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { storySvg } from "../cmps/svg.jsx";

import { userService } from "../services/user.service.remote.js";
import { loadStoriesByUser } from "../store/actions/story.actions.js";

export function Profile() {
	const stories = useSelector(storeState => storeState.storyModule.loggedInUserStories);
	const { userId } = useParams();

	const [gridPosts, setGridPosts] = useState([]);
	const [isActive, setIsActive] = useState("posts");
	const [userData, setUserData] = useState(null);

	// טען את הסטוריז של המשתמש כשמשתנה userId
	useEffect(() => {
		const fetchStories = async () => {
			await loadStoriesByUser(userId);
		};
		fetchStories();
	}, [userId]);

	// טען את פרטי המשתמש
	useEffect(() => {
		userService.getById(userId).then(user => {
			const { username, fullname, imgUrl, following, followers, savedStoryIds } = user;
			setUserData({ username, fullname, imgUrl, following, followers, savedStoryIds });
		});
	}, [userId]);

	// עדכן את gridPosts כאשר משתנה רשימת הסטוריז או סוג התצוגה (posts/saved)
	useEffect(() => {
		if (isActive === "posts") {
			setGridPosts(stories);
		}
	}, [stories, isActive]);

	// סינון סטוריז ששמורים על ידי המשתמש
	const filteredSaved = () => {
		if (!userData?.savedStoryIds) return [];
		return stories.filter(story => userData.savedStoryIds.includes(story._id));
	};

	if (!userData) return <div>Loading...</div>;

	return (
		<div className="profile_container">
			<header className="profile_contant">
				<section className="profile_img">
					<img src={userData.imgUrl} className="picture" alt="" />
				</section>
				<div className="profile_details">
					<div className="top">
						<span className="user_name">{userData.username}</span>
						<div className="profile-edit">Edit Profile</div>
					</div>
					<div className="middle">
						<div className="profile_posts">
							<span className="numbers">{stories?.length || 0}</span> posts
						</div>
						<div className="profile_followers">
							<span className="numbers">{userData.followers?.length || 0}</span> followers
						</div>
						<div className="profile_following">
							<span className="numbers">{userData.following?.length || 0}</span> following
						</div>
					</div>
					<div className="bottom">
						<span className="user_name">{userData.fullname}</span>
					</div>
				</div>
			</header>

			<main className="profile_main">
				<div className="profie_main_nav">
					<div
						className={`posts ${isActive === "posts" ? "active" : ""}`}
						onClick={() => {
							setGridPosts(stories);
							setIsActive("posts");
						}}
					>
						<span className="nav_svg">{storySvg.profile_posts} </span> posts
					</div>
					<div
						className={`saved ${isActive === "saved" ? "active" : ""}`}
						onClick={() => {
							setGridPosts(filteredSaved());
							setIsActive("saved");
						}}
					>
						<span className="nav_svg">{storySvg.profile_saved} </span> saved
					</div>
				</div>

				<div className="profile_stories_grid">
					{gridPosts.length > 0 ? (
						gridPosts.map(story => (
							<div className="profile_story" key={story._id}>
								<img src={story.imgUrl} alt="Story" />
								{isActive === "posts" && (
									<p className="notes">
										<span className="likes">{storySvg.like("white")}</span>
										{story.likedBy.length}
										<span className="nav_svg comments">{storySvg.comment}</span>
										{story.comments.length}
									</p>
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
