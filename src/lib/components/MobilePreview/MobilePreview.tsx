/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';

// Dummy components to represent rendering JSON data visually
import Renderer from './Renderer'; // Assume this is the visual rendering component for JSON data

// Viewports to simulate different mobile screen sizes
const VIEWPORT_LIST = [
    { value: '320x568', text: 'iPhone SE' },
    { value: '360x640', text: 'Small Android' },
    { value: '375x667', text: 'iPhone 8' },
    { value: '414x896', text: 'iPhone 11' },
    { value: '768x1024', text: 'iPad' }
];

const DEFAULT_VIEWPORT = '360x640';

const MobilePreview = ({ jsonData }: { jsonData: any }) => {
    const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
    const [viewportWidth, viewportHeight] = viewport.split('x').map(Number);

    const handleViewportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setViewport(event.target.value);
    };

    const [width, height] = viewport.split('x').map(Number);

    return (
        <div className="preview-container">
            {/* Top bar for viewport selection */}
            <div className="preview-topbar">
                <select onChange={handleViewportChange} value={viewport}>
                    {VIEWPORT_LIST.map(vp => (
                        <option key={vp.value} value={vp.value}>
                            {vp.text}
                        </option>
                    ))}
                </select>
            </div>

            {/* Renderer for JSON data */}
            <div
                className="preview-screen"
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    border: '1px solid #ccc',
                    margin: '20px auto',
                    overflow: 'auto',
                    position: 'relative',
                }}
            >
                {/* The Renderer component renders the JSON visually */}
                <Renderer data={jsonData} />
            </div>
        </div>
    );
};

export default MobilePreview;
