/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
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

  const openInBrowser = () => {
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
    const isAndroid = /android/i.test(window.navigator.userAgent);

    try {
      if (isIOS) {
        // For iOS, directly use targetUrl without any URL scheme
        window.location.href = targetUrl;
      } else if (isAndroid) {
        // For Android, try Chrome first
        const chromeUrl = `googlechrome://navigate?url=${encodeURIComponent(targetUrl)}`;
        window.location.href = chromeUrl;
        
        // Fallback to direct URL after a delay if Chrome doesn't open
        setTimeout(() => {
          if (document.hasFocus()) {
            window.location.href = targetUrl;
          }
        }, 2000);
      } else {
        // For other platforms, just use the direct URL
        window.location.href = targetUrl;
      }
    } catch (e) {
      console.log('Redirect failed:', e);
      window.location.href = targetUrl;
    }
  };

  useEffect(() => {
    if (detectWebView()) {
      setShowRedirectPrompt(true);
      openInBrowser();
    }
  }, [targetUrl]);

  if (!showRedirectPrompt) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          Opening in Browser...
        </h2>
        <p className="mb-4">
          If the page doesn't open automatically, you can:
        </p>
        <ol className="list-decimal pl-5 mb-4">
          <li className="mb-2">Copy this link</li>
          <li className="mb-2">Open your browser</li>
          <li>Paste and go</li>
        </ol>
        <div className="bg-gray-100 p-2 rounded mb-4 break-all">
          {targetUrl}
        </div>
        <div className="flex gap-4">
          <button
            onClick={openInBrowser}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
          <button
            onClick={() => setShowRedirectPrompt(false)}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebViewRedirect;
