import { storyService } from "../../services/story.service.js";
import {
	ADD_STORY,
	REMOVE_STORY,
	SET_STORIES,
	SET_IS_LOADING,
	UNDO_STORIES,
	UPDATE_STORY,
	ADD_STORY_COMMENT,
	ADD_STORY_LIKE,
	SET_STORIES_PROFILE
} from "../reducers/story.reducer.js";
import { store } from "../store.js";

export function loadStories() {
	const filterBy = store.getState().storyModule.filterBy;
	store.dispatch({ type: SET_IS_LOADING, isLoading: true });
	return storyService
		.query(filterBy)
		.then(stories => {
			store.dispatch({ type: SET_STORIES, stories });
		})
		.catch(err => {
			console.log("story action -> Cannot load stories", err);
			throw err;
		})
		.finally(() => {
			store.dispatch({ type: SET_IS_LOADING, isLoading: false });
		});
}

export function loadStoriesByUser(userId) {
	store.dispatch({ type: SET_IS_LOADING, isLoading: true });
	return storyService
		.getStoriesByUser(userId)
		.then(stories => {
			console.log(stories);
			store.dispatch({ type: SET_STORIES_PROFILE, loggedInUserStories: stories });
		})
		.catch(err => {
			console.log("story action -> Cannot load stories", err);
			throw err;
		})
		.finally(() => {
			store.dispatch({ type: SET_IS_LOADING, isLoading: false });
		});
}

export function removeStoryOptimistic(storyId) {
	store.dispatch({ type: REMOVE_STORY, storyId });
	return storyService.remove(storyId).catch(err => {
		store.dispatch({ type: UNDO_STORIES });
		console.log("story action -> Cannot remove story", err);
		throw err;
	});
}

export function removeStory(storyId) {
	return storyService
		.remove(storyId)
		.then(() => {
			store.dispatch({ type: REMOVE_STORY, storyId });
		})
		.catch(err => {
			console.log("story action -> Cannot remove story", err);
			throw err;
		});
}

export function saveStory(story) {
	const type = story._id ? UPDATE_STORY : ADD_STORY;
	return storyService
		.save(story)
		.then(savedStory => {
			store.dispatch({ type, story: savedStory });
			return savedStory;
		})
		.catch(err => {
			console.log("story action -> Cannot save story", err);
			throw err;
		});
}

export async function addComment(txt, storyId) {
    const comment = await storyService.addStoryComment(txt, storyId);
	store.dispatch(getCmdAddStoryComment(comment,storyId));
    return comment;
}

export async function addLike(storyId){
	const like = await storyService.addStoryLike(storyId);
	store.dispatch(getCmdAddStoryLike(like,storyId));
    return like;
}

export async function addStory(params) {
	const story = await storyService.addStoryStory(params);
	store.dispatch({story: story, type: ADD_STORY});
    return story;
}

function getCmdAddStoryComment(comment,storyId) {
    return {
        type: ADD_STORY_COMMENT,
        comment,
		storyId
    }
}

function getCmdAddStoryLike(like,storyId) {
    return {
        type: ADD_STORY_LIKE,
        like,
		storyId
    }
}