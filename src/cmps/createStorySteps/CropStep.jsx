import Cropper from 'react-easy-crop';
export function CropStep({ imageUrl, crop, zoom, setCrop, setZoom, setStep, setCroppedAreaPixels, showCroppedImage, createStorySVG }) {
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
}