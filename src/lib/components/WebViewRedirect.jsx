/* eslint-disable no-console */
import { useEffect, useState } from 'react';

// Utility function to detect various webviews
const detectWebView = () => {
    if (typeof window === 'undefined') return false;

    const ua = window.navigator.userAgent.toLowerCase();

    // Common webview indicators
    const isInstagram = ua.includes('instagram');
    const isFacebook = ua.includes('fban') || ua.includes('fbav');
    const isLinkedIn = ua.includes('linkedin');
    const isLine = ua.includes('line');

    // iOS webview detection
    const isIOSWebView = /(iphone|ipod|ipad).*applewebkit(?!.*safari)/i.test(ua);

    // Android webview detection
    const isAndroidWebView = ua.includes('wv');

    return isInstagram || isFacebook || isLinkedIn || isLine || isIOSWebView || isAndroidWebView;
};

const WebViewRedirect = ({ targetUrl }) => {
    const [showRedirectPrompt, setShowRedirectPrompt] = useState(false);

    useEffect(() => {
        if (detectWebView()) {
            setShowRedirectPrompt(true);

            // Try different methods to open in external browser
            const urlScheme = `googlechrome://${encodeURIComponent(targetUrl)}`;
            const fallbackUrl = targetUrl;

            // Method 1: Using window.open with _system target
            try {
                window.open(targetUrl, '_system');
            } catch (e) {
                console.log('Method 1 failed:', e);
            }

            // Method 2: Using location.href
            setTimeout(() => {
                try {
                    window.location.href = urlScheme;
                } catch (e) {
                    console.log('Method 2 failed:', e);
                }
            }, 100);

            // Method 3: Final fallback
            setTimeout(() => {
                try {
                    window.location.href = fallbackUrl;
                } catch (e) {
                    console.log('Method 3 failed:', e);
                }
            }, 200);
        }
    }, [targetUrl]);

    if (!showRedirectPrompt) return null;

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          Please Open in External Browser
        </h2>
        <p className="mb-4">
          For the best experience please open this link in your default browser (Chrome, Safari, etc.).
        </p>
        <p className="mb-4">
          You can copy and paste this URL into your browser:
        </p>
        <div className="bg-gray-100 p-2 rounded mb-4 break-all">
          {targetUrl}
        </div>
        <button
          onClick={() => setShowRedirectPrompt(false)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Got it
        </button>
      </div>
    </div>
    );
};

export default WebViewRedirect;
