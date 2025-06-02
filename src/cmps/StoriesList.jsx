import { StoryPreview } from "./StoryPreview.jsx";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import {
	loadStories,
	addComment,
	addLike,
} from "../store/actions/story.actions.js";
import { loadUsers, savedStoryUser } from "../store/actions/user.actions.js";
import { FollowBtn } from "./followButton.jsx";

export function StoriesList() {
	//TODO - move to StoriesIndex
	const stories = useSelector(storeState => storeState.storyModule.stories);
	const currentUser = useSelector(
		storeState => storeState.userModule.loggedInUser
	);
	const users = useSelector(storeState => storeState.userModule.users);

	useEffect(() => {
		if (stories.length && currentUser && users.length) return;
		loadStories();
		loadUsers();
	}, []);

	function onSetNewComment(storyId, newComment) {
		addComment(newComment, storyId);
	}
	function onNewLike(storyId) {
		addLike(storyId, currentUser);
	}

	function onSaveStory(storyId) {
		savedStoryUser(storyId, currentUser._id);
	}

	if (!stories.length && !currentUser && !users.length)
		return (
			<div className="loading-page">
				<span className="loading"></span>
			</div>
		);
	return (
		<div className="stories-list">
			<ul className="stories-list-ul">
				{stories.map(story => (
					<li key={story._id}>
						<StoryPreview
							story={story}
							onSetNewComment={onSetNewComment}
							onNewLike={onNewLike}
							onSaveStory={onSaveStory}
							isLikeByUser={story.likedBy.some(user => {
								return user._id === currentUser._id;
							})}
							isSavedByUser={
								currentUser.savedStoryIds
									? currentUser.savedStoryIds.some(savedStory => {
											return savedStory === story._id;
									  })
									: false
							}
						/>
					</li>
				))}
			</ul>
			<div className="suggestions-bar">
				<div className="bar-container">
					<div className="current-user">
						<div className="user-info">
							<img src={currentUser.imgUrl}/>
							<div className="names">
								<p className="username">{currentUser.username}</p>
								<p className="fullname">{currentUser.fullname}</p>
							</div>
						</div>
						<button>
							<p>Switch</p>
						</button>
					</div>
					<div className="suggested-headline">
						<p>Suggested for you</p>
						<button>
							<p>See All</p>
						</button>
					</div>
					<ul className="users-list">
					{Array.isArray(users) && users.map(user => {
						const isAlreadyFollowing = currentUser.following?.includes(user._id)
						const isSelf = user._id === currentUser._id
						if (isSelf || isAlreadyFollowing) return null // ⛔ הסתרה

						return (
						<li className="user-prop">
							<div className="user-info">
								<img src={user.imgUrl}/>
								<div className="names">
									<p className="username">{user.username}</p>
									<p className="sub-line">Suggested for you</p>
								</div>
							</div>
							<FollowBtn targetUserId={user._id}/>
						</li>
						)})}
					</ul>
				</div>
			</div>
		</div>
	);
}
