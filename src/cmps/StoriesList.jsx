import { StoryPreview } from "./StoryPreview.jsx"

export function StoriesList({ stories }) {
    function onSetNewComment(storyId, newComment){
        
    }

    return (
        <ul className="stories-list">
            {stories.map(story =>
                <li key={story._id}>
                    <StoryPreview story={story} onSetNewComment={onSetNewComment}/>
                </li>
            )}
        </ul>
    )
}