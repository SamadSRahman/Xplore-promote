<script>
    import { onDestroy } from 'svelte';
    import { render, lottieExtensionBuilder } from '@divkitframework/divkit/client';
    import Lottie from 'lottie-web/build/player/lottie';
  
    // Props
    export let isOpen = false;
    export let onClose = () => {};
    export let jsonData;
  
    let previewContainer;
  
    // Create the extensions map
    const extensions = new Map();
    extensions.set('lottie', lottieExtensionBuilder(Lottie.loadAnimation));
  
    // This provider adds a @font-face rule for a custom font (if not already present)
    function typefaceProvider(fontName) {
      const fontFamily = `custom-font-${fontName}`;
      console.log(fontFamily);
      if (!document.getElementById(fontFamily)) {
        const style = document.createElement('style');
        style.id = fontFamily;
        style.textContent = `
          @font-face {
            font-family: 'custom-font-${fontName}';
            src: url(https://xplr.live/api/v1/font/getFontFile?specificName=${fontName}) format('truetype');
          }
        `;
        document.head.appendChild(style);
      }
      return `"custom-font-${fontName}", sans-serif`;
    }
  
    // Call the Divkit render function whenever isOpen and jsonData are set.
    // (In Svelte a reactive block with $: will run when dependencies change.)
    $: if (isOpen && previewContainer && jsonData) {
      let parsedJson;
      try {
        parsedJson = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      } catch (error) {
        console.error('Error parsing JSON data:', error);
        parsedJson = null;
      }
      if (parsedJson) {
        const configuration = {
          onCustomAction: (e) => console.log('Custom action:', e),
          id: 'preview-divkit-root',
          target: previewContainer,
          typefaceProvider,
          json: parsedJson,
          extensions,
          onError(details) {
            console.error('Preview rendering error:', details.error);
          },
        };
        render(configuration);
      }
    } else if (previewContainer) {
      // Clear the container when not open
      previewContainer.innerHTML = '';
    }
  
    // Ensure cleanup when the component is destroyed
    onDestroy(() => {
      if (previewContainer) {
        previewContainer.innerHTML = '';
      }
    });
  </script>
  
  {#if isOpen}
    <div class="preview-overlay">
      <div class="preview-container">
        <button
          on:click={onClose}
          class="preview-close-button"
          aria-label="Close preview"
        >
          <!-- Inline close icon (similar to IoClose) -->
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18.3 5.71a1 1 0 00-1.42 0L12 10.59 7.12 5.7A1 1 0 105.7 7.12L10.59 12l-4.89 4.88a1 1 0 101.42 1.42L12 13.41l4.88 4.89a1 1 0 001.42-1.42L13.41 12l4.89-4.88a1 1 0 000-1.41z"/>
          </svg>
        </button>
        <div class="preview-content">
          <div
            class="render-container"
            style="color: #000; height: 85vh;"
            bind:this={previewContainer}
          ></div>
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    .preview-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .preview-container {
      position: relative;
      background: white;
      padding: 1rem;
      border-radius: 4px;
      width: 90%;
      max-width: 800px;
      height: 90vh;
      display: flex;
      flex-direction: column;
    }
  
    .preview-close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: transparent;
      border: none;
      cursor: pointer;
    }
  
    .preview-content {
      margin-top: 40px;
      flex: 1;
      overflow: auto;
    }
  </style>
  