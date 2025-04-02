import { storyService } from "../../services/story.service.js";
import {
	ADD_STORY,
	REMOVE_STORY,
	SET_STORIES,
	SET_IS_LOADING,
	UNDO_STORIES,
	UPDATE_STORY,
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

export function addComment(txt, storyId, user) {
    const comment = storyService.createComment(txt, user);
    return storyService.getById(storyId)
        .then(story => {
            story.comments.push(comment);
            return storyService.save(story)
                .then((savedStory) => {
                    store.dispatch({ type: UPDATE_STORY, story: savedStory })
                })
                .catch(err => {
                    console.log('story action -> Cannot save story', err)
                    throw err
                })
        })
        .catch(err => {
            console.log('Had issues in new like', err)
        })
}

export function addLike(storyId,currentUser){
    storyService.getById(storyId)
        .then(story => {
            //TODO - move to function in service 
            const isLikedByUser = story.likedBy.some(like => like._id === currentUser._id);
            const updatedLikedBy = isLikedByUser ? story.likedBy.filter(userLike => userLike._id !== currentUser._id) // Remove user
                                    : [...story.likedBy, 
                                        {
                                            _id: currentUser._id,
                                            username: currentUser.username,
                                            fullname: currentUser.fullname,
                                            imgUrl: currentUser.imgUrl
                                        }]; // Add user

            story = { ...story, likedBy: updatedLikedBy };

            return storyService.save(story)
                    .then((savedStory) => {
                        store.dispatch({ type: UPDATE_STORY, story: savedStory })
                    })
                    .catch(err => {
                        console.log('story action -> Cannot save story', err)
                        throw err
                    })
        })
        .catch(err => {
            console.log('Had issues in new like', err)
        })
}
