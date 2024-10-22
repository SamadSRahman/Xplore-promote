/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

const Renderer = ({ data }: { data: any }) => {
    return (
        <div style={{ padding: '10px' }}>
            {Object.keys(data).map(key => (
                <div key={key} style={{ marginBottom: '10px' }}>
                    <strong>{key}:</strong> {JSON.stringify(data[key], null, 2)}
                </div>
            ))}
        </div>
    );
};

export default Renderer;
