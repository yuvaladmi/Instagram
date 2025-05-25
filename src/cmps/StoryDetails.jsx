import { storyService } from "../services/story.service.js"

import Picker from '@emoji-mart/react';
import { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Modal } from "./Modal.jsx"
import { storySvg } from './svg.jsx'

export function StoryDetails() {
    const [story, setStory] = useState(null)
    const [isLikedByUser, setIsLikedByUser] = useState(false)
    const [isSavedByUser, setIsSavedByUser] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);
    const currentUser = useSelector(
        storeState => storeState.userModule.loggedInUser
    );
    
    const { storyId } = useParams()
    const navigate = useNavigate()        

    function togglePicker() {
        setShowPicker(prev => !prev);
    }
    useEffect(() => {
        if (storyId) loadStory()
    }, [storyId])

    function loadStory() {
        storyService.getById(storyId)
            .then(story => {
                setStory(story);
                setIsLikedByUser(story.likedBy.some(user => {
                    return user._id === currentUser._id;
                }));
                setIsSavedByUser(currentUser.savedStoryIds
									? currentUser.savedStoryIds.some(savedStory => {
											return savedStory === story._id;
									  })
									: false);
            })
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

    // function handleLike(){
    //     onNewLike(story._id);
    // }

    // function handleSave(){
    //     onSaveStory(story._id);
    // }

    // function handleAddComment() {
    //     if (!newComment.trim()) return;

    //     // Here you can update the story comments in state or send it to the backend
    //     console.log("New Comment:", newComment);
    //     setNewComment(""); // Clear input after posting
    //     onSetNewComment(story._id, newComment);
    // }

    // function onSetNewComment(storyId, newComment){
    //     addComment(newComment, storyId);
    // }
    
    // function onNewLike(storyId){
    //     addLike(storyId, user);
    // }

    // function onSaveStory(storyId){
    //     savedStoryUser(storyId)
    // }

    function getFilterStyle(){
        return story.filter;
    }

    if (!story) return <div>Loading...</div>
    return (
        <Modal isOpen={true} onClose={closeDetailsModal}>
            <article className="story-details">
                {/* <section className="story-img-body"> */}
                <img className="story-img" src={story.imgUrl} 
                    style={{ 
                            filter: getFilterStyle(), 
                            transition: 'filter 0.25s ease' 
                        }}   />
                {/* </section> */}
                {/* <section className="story-details-info"> */}
                    {/* <section className="story-header"> */}
                        <div className="uploader">
                            <img className="profile-img" src={story.by.imgUrl} />
                            <a className="username">{story.by.fullname}</a>
                            <span className='created-at'></span>
                            <button className="menu-button" onClick={openModal}>
                                {storySvg.threeDots}
                            </button>
                        </div>
                    {/* </section> */}
                    <section className="story-details-txt">
                        <div className="story-user-txt">
                            <img className="profile-img" src={story.by.imgUrl} />
                            <a className="username">{story.by.fullname}</a>
                            <span>{story.txt}</span>
                        </div>
                        <ul className="story-comments-list">
                            {story.comments.map(comment => (
                                <li key={comment.id}>
                                    <div className="comment-info">
                                        <img src={comment.by.imgUrl}/>
                                        <div>
                                            <p>
                                                <span className="user">{comment.by.fullname}</span> 
                                                &nbsp;{comment.txt}
                                            </p>
                                            <div className="comment-controls">
                                              {comment?.likedBy?.length > 0 && (
                                                <p>{comment.likedBy.length} likes</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div class="like-comment">
                                    //add svg
                                    </div> */}
                                </li>
                            ))}
                        </ul>
                    </section>
                
                    <section className="story-footer">
                        <div className="story-actions">
                            <div className="left-actions">
                                <div className="story-like" onClick={() => handleLike()}>
                                    {storySvg.like(isLikedByUser ? "red" : "none")}
                                </div>

                                <div className="story-comment" onClick={() => handleAddComment()}>
                                    {storySvg.comment}
                                </div>
                            </div>

                            <div className="save-button" onClick={() => handleSave(story.id)}>
                                {storySvg.save(isSavedByUser ? "black" : "none")}
                            </div>
                        </div>

                        {/* <div>
                            <Link to={story.by.username} className="story-user-name link">{story.by.username}</Link> 
                            <span className="story-text"></span>
                        </div> */}
                        <div className="story-likes">
                            {story.likedBy.length} likes
                        </div>
                        <div className="comments-section">
                            <form>         
                                <textarea
                                    name="comment"
                                    placeholder="Add a comment..."
                                    autoComplete="off"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                ></textarea>
                
                                {newComment.trim() && (
                                    <button type="submit" className="post-btn" onClick={handleAddComment}>Post</button>
                                )}
                                <div className="emoji-container" style={{ position: "relative" }}>
                                    {/* <button type="button" onClick={togglePicker} className="emoji-button">😀</button> */}
                                    <svg onClick={togglePicker} xmlns="http://www.w3.org/2000/svg" aria-label="Emoji" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="13" role="img" viewBox="0 0 24 24" width="13"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                
                                    {showPicker && (
                                        <div className="picker-popover" ref={pickerRef}>
                                            <Picker  />
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </section>
                {/* </section> */}
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