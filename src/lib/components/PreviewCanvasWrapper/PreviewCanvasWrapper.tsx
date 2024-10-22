/* eslint-disable @typescript-eslint/no-explicit-any */
// PreviewCanvasWrapper.tsx
import React, { useEffect, useRef } from 'react';
import PreviewCanvas from '../PreviewCanvas.svelte';

interface PreviewCanvasProps {
  jsonData: object;
  theme?: 'light' | 'dark';
  className?: string;
}

// Create a wrapper component for the Svelte PreviewCanvas
export const PreviewCanvasWrapper: React.FC<PreviewCanvasProps> = ({
    jsonData,
    theme = 'light',
    className = ''
}) => {
    const svelteRef = useRef<HTMLDivElement>(null);

    const componentRef = useRef<any>(null);

    useEffect(() => {
        if (svelteRef.current && !componentRef.current) {
            // Initialize the Svelte component
            componentRef.current = new PreviewCanvas({
                target: svelteRef.current,
                props: {
                    jsonData,
                    theme
                }
            });
        }

        // Cleanup on unmount
        return () => {
            if (componentRef.current) {
                componentRef.current.$destroy();
            }
        };
    }, []); // Only run on mount/unmount

    // Update props when they change
    useEffect(() => {
        if (componentRef.current) {
            componentRef.current.$set({ jsonData, theme });
        }
    }, [jsonData, theme]);

    return <div ref={svelteRef} className={className} />;
};