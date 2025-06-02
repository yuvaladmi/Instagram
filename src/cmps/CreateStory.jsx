import { useState, useRef } from 'react'; 
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import Cropper from 'react-easy-crop';
import EmojiPicker from 'emoji-picker-react';

import getCroppedImg from '../utils/cropImage.js';
import { createStorySVG } from "./svg.jsx";
import filtersImg from '../assets/images/filters.png';
import { uploadService } from '../services/upload.service.js'
import {
	addStory
} from "../store/actions/story.actions.js";
import { Modal } from "./Modal.jsx"

export function CreateStory() {
    const fileInputRef = useRef();
    const [step, setStep] = useState('selectMedia');
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('original');
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const navigate = useNavigate()  
    const [adjustments, setAdjustments] = useState({
            brightness: 1,
            contrast: 1,
            saturate: 1,
            grayscale: 0,
            blur: 0
        });
    
    const [activeTab, setActiveTab] = useState('filters');
    const user = useSelector(storeState => storeState.userModule.loggedInUser);
	
    const filters = {
        Aden: 'hue-rotate(-20deg) brightness(1.15) saturate(0.85)',
        Clarendon: 'contrast(1.2) saturate(1.35)',
        Crema: 'contrast(0.9) brightness(1.05)',
        Gingham: 'brightness(1.05) hue-rotate(350deg)',
        Juno: 'saturate(1.4) contrast(1.15)',
        Lark: 'contrast(1.1) brightness(1.2)',
        Ludwig: 'saturate(1.25) brightness(0.9)',
        Moon: 'grayscale(1) contrast(1.1)',
        Original: '',
        Perpetua: 'saturate(1.1) brightness(1.1)',
        Reyes: 'brightness(1.1) sepia(0.22) contrast(0.85) saturate(0.75)',
        Slumber: 'saturate(0.66) brightness(1.05)',
    };
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);
    const textareaRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false)

    function togglePicker() {
        setShowPicker(prev => !prev);
    }
    function handleFileChange(ev) {
        console.log(ev.target.files[0]);
        const file = ev.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
            setStep('crop');
        };
        reader.readAsDataURL(file);
    }

    async function uploadImage(){
        setIsUploading(true)
        const { secure_url } = await uploadService.uploadImg(imageUrl)
        console.log(secure_url)
        setImageUrl(secure_url)
        setIsUploading(false)
        return secure_url;
    }

    async function handleShare() {
        const secure_url = await uploadImage();
        const story = {
            imgUrl: secure_url,
            txt: caption,
            location,
            filter: getFilterStyle(),
            createdAt: Date.now(),
        };
        addStory(story);
        onClose(); // סגירת המודל
    }
    async function showCroppedImage() {
        try {
            const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
            setImageUrl(croppedImage); // מחליף את התמונה המקורית
            setStep('edit'); // ממשיכים לשלב הבא
        } catch (e) {
            console.error(e);
        }
    }
    function getFilterStyle() {
        const {
            brightness = 100,
            contrast = 100,
            fade = 0,
            saturate = 100,
            temperature = 0
        } = adjustments;

        const base = filters[selectedFilter] || ''; // ← פה מחברים את הפילטר הנבחר
        const adjustmentsFilters = [];  

        adjustmentsFilters.push(`brightness(${(100 + brightness) / 100})`);
        adjustmentsFilters.push(`contrast(${(100 + contrast) / 100})`);
        adjustmentsFilters.push(`saturate(${(100 + saturate) / 100})`);
        adjustmentsFilters.push(`hue-rotate(${temperature * 0.3}deg)`);

        // FADE simulation
        if (fade !== 0) {
            const brightnessAdj = 1 - Math.abs(fade) / 300;
            const saturateAdj = 1 - Math.abs(fade) / 200;
            adjustmentsFilters.push(`brightness(${Math.max(0.2, brightnessAdj)})`);
            adjustmentsFilters.push(`saturate(${Math.max(0.2, saturateAdj)})`);
        }
        const finalFilter = [base, ...adjustmentsFilters].join(' ').trim();
        return finalFilter;
    }

    function onClose(){
        navigate('/post'); 
    }

    const handleEmojiClick = (emojiData) => {
        const emoji = emojiData.emoji;
        const textarea = textareaRef.current;
        
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newText =
            caption.slice(0, start) + emoji + caption.slice(end);

        setCaption(newText);

        // שמירת מיקום הסמן לאחר האימוג'י
        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        }, 0);
    };
    const renderAdjustmentsPanel = () => (
        <ul className="adjustments-panel">
        {[
            { name: 'Brightness', id: 'brightness', min: -100, max: 100, step: 1 },
            { name: 'Contrast', id: 'contrast', min: -100, max: 100, step: 1 },
            { name: 'Fade', id: 'fade', min: -100, max: 100, step: 1 },
            { name: 'Saturation', id: 'saturate', min: -100, max: 100, step: 1 },
            { name: 'Temperature', id: 'temperature', min: -100, max: 100, step: 1 },
            { name: 'Vignette', id: 'vignette', min: -100, max: 100, step: 1 },
        ].map(({ name, id, min, max, step }) => (
            <li className="adjustment-row" key={id}>
            <p>{name}</p>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={adjustments[id] || 0}
                onChange={(e) =>
                setAdjustments((prev) => ({ ...prev, [id]: parseFloat(e.target.value) }))
                }
            />
            <span>{(adjustments[id] || 0).toFixed(0)}</span>
            </li>
        ))}
        </ul>
    );
// function closeDetailsModal(){
//         navigate('/post'); 
//     }
    function renderContent() {
        switch (step) {
            case 'selectMedia':
                return (
                    <section className='create-post-modal'>
                        <h2 className="title">Create New Post</h2>
                        <section>
                            <div className="upload-step">
                                {createStorySVG.addImg}
                                <h3>Drag photos and videos here</h3>
                                <button onClick={() => fileInputRef.current.click()}>Select from computer</button>
                                <input
                                    className="create-story-input"
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </section>
                    </section>
                );
            case 'crop':
                return (
                    <section className="create-post-modal">
                            <div className="modal-header">
                                <span className="svg-icon-btn">
                                    <span onClick={() => setStep('selectMedia')}>
                                        {createStorySVG.back}
                                    </span>
                                </span>
                                <h2>Crop</h2>
                                <span className="next-btn" onClick={showCroppedImage}>Next</span>
                            </div>
                            <section className="crop-container">
                                    <Cropper
                                        image={imageUrl}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={(croppedArea, croppedAreaPixels) => {
                                            setCroppedAreaPixels(croppedAreaPixels);
                                        }}
                                    />
                            </section>
                    </section>
                );
            case 'edit':
                return (
                    <section className="create-post-modal">
                            <div className="modal-header">
                                <span className="svg-icon-btn">
                                    <span onClick={() => setStep('crop')}>
                                        {createStorySVG.back}
                                    </span>
                                </span>
                                <h2>Edit</h2>
                                <span className="next-btn" onClick={() => setStep('caption')}>Next</span>
                            </div>
                            <section className="right-side-panel">
                                <img
                                    src={imageUrl}
                                    className="img-class"
                                    style={{ filter: getFilterStyle(), transition: 'filter 0.25s ease' }}
                                    />
                                <div className="tabs">
                                    <div className={activeTab === 'filters' ? 'selected' : 'unselect'} onClick={() => setActiveTab('filters')}>
                                        Filters
                                    </div>
                                    <div className={activeTab === 'adjustments' ? 'selected' : 'unselect'} onClick={() => setActiveTab('adjustments')}>
                                        Adjustments
                                    </div>
                                </div>
                                {activeTab === 'filters' ? (
                                    <ul className="img-filters">
                                        {Object.keys(filters).map((key) => (
                                            <li
                                                key={key}
                                                className={`${selectedFilter === key ? 'active' : ''}`}
                                                onClick={() => setSelectedFilter(key)}
                                            >
                                            <img
                                                src={filtersImg}
                                                alt={key}
                                                style={{ filter: filters[key] }}
                                            />
                                            <span>{key}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    ) : (
                                    renderAdjustmentsPanel()
                                )}
                            </section>
                    </section>
                );
            case 'caption':
                return (
                    <section className='create-post-modal'>
                            <div className="modal-header">
                                <span className="svg-icon-btn">
                                    <span onClick={() => setStep('crop')}>
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
                                                <EmojiPicker onEmojiClick={handleEmojiClick} height={350}  />
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
            default:
                return null;
        }
    }

    return (
        // <Modal isOpen={true} onClose={closeDetailsModal}>
        <div className="modal-backdrop">
                {renderContent()}
        </div>
        // {/* </Modal> */}
    );
}
