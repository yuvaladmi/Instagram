export function EditStep({ imageUrl, selectedFilter, setSelectedFilter, filters, adjustments, setAdjustments, getFilterStyle, activeTab, setActiveTab, setStep, filtersImg }) {
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

    return (
        <section className="create-post-modal">
            <div className="modal-header">
                <span className="svg-icon-btn">
                    <span onClick={() => setStep('crop')}>
                        ←
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
}