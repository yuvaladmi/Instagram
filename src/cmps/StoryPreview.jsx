import { useState,useRef } from 'react'
import { storySvg } from './svg.jsx'
import Picker from '@emoji-mart/react';

import { Modal } from "./Modal.jsx"; 
import { Link } from "react-router-dom";
export function StoryPreview({ story, onSetNewComment, onNewLike, onSaveStory, isLikeByUser, isSavedByUser }) {
    const [newComment, setNewComment] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);

    function togglePicker() {
        setShowPicker(prev => !prev);
    }

    // function handleEmojiSelect(emoji) {
    //     console.log("Selected emoji:", emoji.native);
    //     setShowPicker(false); // Close picker after selecting an emoji (optional)
    // }

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
        <section className="story-preview">
            <section className="story-header">
            <div className="story-user">
                <img className="profile-img" src={story.by.imgUrl} />
                <p className="username">{story.by.fullname}</p>
                <span className='created-at'></span>
            </div>
                <button className="menu-button" onClick={openModal}>
                    {storySvg.threeDots}
                </button>
            </section>
        
            <section className="story-img-container">
                <img className="story-img" src={story.imgUrl} />
            </section>
        
            <section className="story-footer">
                <div className="story-actions">
                    <div className="left-actions">
                        <div className="story-like" onClick={() => handleLike()}>
                            {storySvg.like(isLikeByUser ? "red" : "none")}
                            {/* <span>{story.likedBy.length}</span> */}
                        </div>

                        <div className="story-comment">
                            {storySvg.comment}
                            {/* <span>{story.comments.length}</span> */}
                        </div>
                    </div>
                    

                    <div className="save-button" onClick={() => handleSave(story.id)}>
                        {storySvg.save(isSavedByUser ? "black" : "none")}
                    </div>

                </div>

                <section className="story-likes-number">
                    {story.likedBy.length} likes
                </section>
                <section className='story-txt'>
                    <p>
                        <span className="story-txt-user-name">
                            {story.by.fullname}
                        </span>&nbsp;
                         {story.txt}
                    </p> 
                </section>
                <div className="comments-count">
                    {story.comments.length > 0 && (
                        <Link to={`/post/${story._id}`} className="view-comments-link">
                            View all {story.comments.length} comments
                        </Link>
                    )}
                </div>
                <div className="add-comment">
                <form>
                {/* <textarea name="comment" placeholder="Add a comment..." autoComplete="off" ></textarea> */}
                <textarea
                    name="comment"
                    placeholder="Add a comment..."
                    autoComplete="off"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>

                {newComment.trim() && (
                    <button type="submit" className="post-btn" onSubmit={handleAddComment}>Post</button>
                )}
                <div className="emoji-container" style={{ position: "relative" }}>
                    {/* <button type="button" onClick={togglePicker} className="emoji-button">😀</button> */}
                    <svg onClick={togglePicker} xmlns="http://www.w3.org/2000/svg" aria-label="Emoji" class="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="13" role="img" viewBox="0 0 24 24" width="13"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>

                    {showPicker && (
                        <div className="picker-popover" ref={pickerRef}>
                            <Picker  />
                        </div>
                    )}
                </div>
                </form>
                    {/* <input
                        type="text"
                        placeholder="Add a comment..."
                        className="comment-input"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className="post-btn" onClick={handleAddComment} disabled={!newComment.trim()}>
                        Post
                    </button> */}
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

        </section>
    
    )
}
