import { StoryPreview } from "./StoryPreview.jsx"
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStories, addComment, addLike } from '../store/actions/story.actions.js'
import { loadUsers, savedStoryUser } from  '../store/actions/user.actions.js';

export function StoriesList() {
//TODO - move to StoriesIndex
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const currentUser = useSelector(storeState => storeState.userModule.loggedInUser)

    useEffect(() => {
        if (stories.length && currentUser) return
        loadStories();
        loadUsers();
    }, [])

    function onSetNewComment(storyId, newComment){
        addComment(newComment, storyId, currentUser);
    }
    function onNewLike(storyId){
        addLike(storyId, currentUser);
    }

    function onSaveStory(storyId){
        savedStoryUser(storyId, currentUser._id)
    }
    
    if (!stories.length && !currentUser) return <div className="loading-page"><span className="loading"></span></div>
    return (
        <div className="test">
        <ul className="stories-list">
            {stories.map(story =>
                <li key={story._id}>
                    <StoryPreview   story={story} 
                                    onSetNewComment={onSetNewComment}
                                    onNewLike={onNewLike}
                                    onSaveStory={onSaveStory}
                                    isLikeByUser={story.likedBy.some(user => {return user._id === currentUser._id})}
                                    isSavedByUser={currentUser.savedStoryIds ? currentUser.savedStoryIds.some(savedStory => {return savedStory === story._id}) : false}
                                    />
                </li>
            )}
        </ul>
        </div>
    )
}