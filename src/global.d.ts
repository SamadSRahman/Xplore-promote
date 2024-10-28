/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window
  {
      chrome: Chrome;
  }

  interface Chrome
  {
      webview: WebView2;
  }

  interface WebView2
  {
    
  }
}
