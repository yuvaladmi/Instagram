export function SelectMediaStep({ fileInputRef, handleFileChange, createStorySVG }) {
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
}