import { StoryPreview } from "./StoryPreview.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
	loadStories,
	addComment,
	addLike,
} from "../store/actions/story.actions.js";
import { loadUsers, savedStoryUser } from "../store/actions/user.actions.js";
import { userService } from "../services/user.service.js";

export function StoriesList() {
	const stories = useSelector(storeState => storeState.storyModule.stories);
	const user = useSelector(storeState => storeState.userModule.loggedInUser);

	useEffect(() => {
		if (stories.length && user) return;
		const fetchData = async () => {
			await loadStories();
			await loadUsers();
		};
		fetchData();
	}, []);

	function onSetNewComment(storyId, newComment) {
		addComment(newComment, storyId, user);
	}
	function onNewLike(storyId) {
		addLike(storyId, user);
	}

	function onSaveStory(storyId) {
		savedStoryUser(storyId);
	}

	if (!stories.length)
		return (
			<div className="loading-page">
				<span className="loading"></span>
			</div>
		);
	return (
		<ul className="stories-list">
			{stories.map(story => (
				<li key={story._id}>
					<StoryPreview
						story={story}
						onSetNewComment={onSetNewComment}
						onNewLike={onNewLike}
						onSaveStory={onSaveStory}
					/>
				</li>
			))}
		</ul>
	);
}
