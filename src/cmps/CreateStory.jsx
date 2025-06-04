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
import { SelectMediaStep } from "./createStorySteps/SelectMediaStep.jsx";
import { CropStep } from "./createStorySteps/CropStep.jsx";
import { EditStep } from './createStorySteps/EditStep.jsx';
import { CaptionStep } from './createStorySteps/CaptionStep.jsx';
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

        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        }, 0);
    };

    function renderContent() {
        switch (step) {
            case 'selectMedia':
                return (
                    <SelectMediaStep
                        fileInputRef={fileInputRef}
                        handleFileChange={handleFileChange}
                        createStorySVG={createStorySVG}
                    />
                );
            case 'crop':
                return (
                    <CropStep
                        imageUrl={imageUrl}
                        crop={crop}
                        zoom={zoom}
                        setCrop={setCrop}
                        setZoom={setZoom}
                        setStep={setStep}
                        setCroppedAreaPixels={setCroppedAreaPixels}
                        showCroppedImage={showCroppedImage}
                        createStorySVG={createStorySVG}
                    />
                );
            case 'edit':
                return (
                    <EditStep
                        imageUrl={imageUrl}
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        filters={filters}
                        adjustments={adjustments}
                        setAdjustments={setAdjustments}
                        getFilterStyle={getFilterStyle}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        setStep={setStep}
                        filtersImg={filtersImg}
                    />
                );
            case 'caption':
                console.log(user)
                return (
                    <CaptionStep
                        imageUrl={imageUrl}
                        getFilterStyle={getFilterStyle}
                        caption={caption}
                        setCaption={setCaption}
                        textareaRef={textareaRef}
                        pickerRef={pickerRef}
                        showPicker={showPicker}
                        togglePicker={togglePicker}
                        handleEmojiClick={handleEmojiClick}
                        location={location}
                        setLocation={setLocation}
                        handleShare={handleShare}
                        setStep={setStep}
                        createStorySVG={createStorySVG}
                    />
                );
            default:
                return null;
        }
    }
    return (
        <div className="modal-backdrop">
                {renderContent()}
        </div>
    );
}
