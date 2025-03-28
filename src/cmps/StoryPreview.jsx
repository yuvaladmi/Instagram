import { useState } from 'react'
import { storySvg } from './svg.jsx'

import { Modal } from "./Modal.jsx"; 
import { Link } from "react-router-dom";
export function StoryPreview({ story, onSetNewComment, onNewLike, onSaveStory }) {
    const [newComment, setNewComment] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    function handleAddComment() {
        if (!newComment.trim()) return;

        // Here you can update the story comments in state or send it to the backend
        console.log("New Comment:", newComment);
        setNewComment(""); // Clear input after posting
        onSetNewComment(story._id, newComment);
    }

    function handleLike(){
        onNewLike(story._id);
    }

    function handleSave(){
        onSaveStory(story._id);
    }

    function openModal(){
        console.log("Opening modal..."); // Debugging
        setMenuOpen(true);
    }

    function closeModal(){
        console.log("Closing modal..."); // Debugging
        setMenuOpen(false);
    }
    
    return (
        <article className="story-preview">
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
        
            <section className="story-body">
                <img className="story-img" src={story.imgUrl} />
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
                        <Link to={`/story/${story.id}/comments`} className="view-comments-link">
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
    
    )
}
