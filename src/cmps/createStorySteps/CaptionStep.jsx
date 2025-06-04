import EmojiPicker from 'emoji-picker-react';
import { useSelector } from "react-redux";

export function CaptionStep({ imageUrl, getFilterStyle, caption, setCaption, textareaRef, pickerRef, showPicker, togglePicker, handleEmojiClick, location, setLocation, handleShare, setStep, createStorySVG }) {
    const user = useSelector(storeState => storeState.userModule.loggedInUser);
      if (!user || Object.keys(user).length === 0) {
        console.warn('No user loaded in Redux');
        return <div>Loading user...</div>;
      }
    return (
        <section className='create-post-modal'>
            <div className="modal-header">
                <span className="svg-icon-btn">
                    <span onClick={() => setStep('edit')}>
                        {createStorySVG.back}
                    </span>
                </span>
                <h2>Create New Post</h2>
                <span className="next-btn" onClick={handleShare}>Share</span>
            </div>
            <section className="right-side-panel-caption">
                <img
                    className="post-img"
                    src={imageUrl}
                    style={{ filter: getFilterStyle(), transition: 'filter 0.25s ease' }}
                />
                <div className="uploader">
                    <img className="profile-img" src={user.imgUrl} />
                    <span className="caption-header">{user.fullname}</span>
                </div>
                <textarea
                    ref={textareaRef}
                    className="create-story-input"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    rows={4}
                    maxLength={2200}
                />
                <div className="emoji-container">
                    <span className="svg-icon">
                        <svg onClick={togglePicker} xmlns="http://www.w3.org/2000/svg" aria-label="Emoji" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="13" role="img" viewBox="0 0 24 24" width="13"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                        {showPicker && (
                            <div className="picker-popover" ref={pickerRef}>
                                <EmojiPicker onEmojiClick={handleEmojiClick} height={350} />
                            </div>
                        )}
                    </span>
                    <span className="char-count">
                        <span>
                            {caption.length} / 2,200
                        </span>
                    </span>
                </div>
                <div className="settings">
                    <input
                        className="create-story-input"
                        type="text"
                        placeholder="Add location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button className="option-btn">Tag people</button>
                    <button className="option-btn">Add collaborators</button>
                    <button className="option-btn">Accessibility</button>
                </div>
            </section>
        </section>
    );
}