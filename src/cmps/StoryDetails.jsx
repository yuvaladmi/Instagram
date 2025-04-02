import { storyService } from "../services/story.service.js"

import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Modal } from "./Modal.jsx"
import { storySvg } from './svg.jsx'

export function StoryDetails() {
    const [story, setStory] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false);
    const [newComment, setNewComment] = useState("");

    const { storyId } = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (storyId) loadStory()
    }, [storyId])

    function loadStory() {
        storyService.getById(storyId)
            .then(story => setStory(story))
            .catch(err => {
                console.log('Had issues in story details', err)
                navigate('/post')
            })
    }
    function openModal(){
        setMenuOpen(true);
    }
    
    function closeModal(){
        setMenuOpen(false);
    }

    function closeDetailsModal(){
        navigate('/post'); 
    }

    function handleLike(){
        onNewLike(story._id);
    }

    function handleSave(){
        onSaveStory(story._id);
    }


    function handleAddComment() {
        if (!newComment.trim()) return;

        // Here you can update the story comments in state or send it to the backend
        console.log("New Comment:", newComment);
        setNewComment(""); // Clear input after posting
        onSetNewComment(story._id, newComment);
    }

    function onSetNewComment(storyId, newComment){
        addComment(newComment, storyId, user);
    }
    
    function onNewLike(storyId){
        addLike(storyId, user);
    }

    function onSaveStory(storyId){
        savedStoryUser(storyId)
    }

    if (!story) return <div>Loading...</div>
    return (
        <Modal isOpen={true} onClose={closeDetailsModal}>
            <article className="story-details">
                <section className="story-img-body">
                    <img className="story-img" src={story.imgUrl} />
                </section>
                <section className="story-header">
                <div className="story-user">
                    <img className="profile-img" src={story.by.imgUrl} />
                    <a className="username">{story.by.fullname}</a>
                    <span className='created-at'></span>
                </div>
                    <button className="menu-button" onClick={openModal}>
                        {storySvg.threeDots}
                    </button>
                </section>
            
            
                <section className="story-footer">
                    <div className="story-actions">
                        <div className="left-actions">
                            <div className="story-like" onClick={() => handleLike()}>
                                {storySvg.like}
                                <span>{story.likedBy.length}</span>
                            </div>

                            <div className="story-comment" onClick={() => handleAddComment()}>
                                {storySvg.comment}
                                <span>{story.comments.length}</span>
                            </div>
                        </div>

                        <div className="save-button" onClick={() => handleSave(story.id)}>
                            {storySvg.save}
                        </div>
                    </div>

                    <div>
                        <Link to={story.by.username} className="story-user-name link">{story.by.username}</Link> 
                        <span className="story-text"></span>
                    </div>
                    <div className="comments-section">
                        {story.comments.length > 0 && (
                            <Link to={`/post/${story._id}`} className="view-comments-link">
                                View all {story.comments.length} comments
                            </Link>
                        )}
                        <div className="add-comment">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="comment-input"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button className="post-btn" onClick={handleAddComment} disabled={!newComment.trim()}>
                                Post
                            </button>
                        </div>
                    </div>
                </section>
                {/* Reusable Modal Component */}
                <Modal isOpen={menuOpen} onClose={closeModal}>
                    <ul className="dropdown-list">
                        <li>Go To Post</li>
                        <li>Follow</li>
                        <li onClick={closeModal}>Cancel</li>
                    </ul>
                </Modal>

            </article>
        </Modal>
    );
}