<script>
    import { onMount } from 'svelte';
    import publishIcon from "../../assets/publish.svg";
    import previewIcon from "../../assets/visibility.svg";
import closeIcon from '../../assets/closeIcon.svg'
    export let onClose = () => {};
     
    export let type = '';
    export let shortCode = '';
    export let isOpen = false;
    let campaignName = '';
    let qrCanvas;
    // Compute the URL based on the shortCode
    $: url = `https://xplr.live/${shortCode}`;
  
    // Generate the QR code using the qrcode library
    function generateQRCode() {
  import('qrcode').then(({ toCanvas }) => {
    toCanvas(qrCanvas, url, {
      width: 150,
      margin: 0,
      padding:10,
      color: {
        dark: "#000",
        light: "#fff"
      }
    }).then(() => {
      // Load and overlay the image
      const ctx = qrCanvas.getContext('2d');
      const logo = new Image();
      logo.style = objectFit = 'contain'
      logo.src = "https://xplore.objectstore.e2enetworks.net/1740737833833-d6a959d2195ccfac.png"; // Replace with your actual logo path
      logo.onload = () => {
        const size = 40; // Logo size
        const x = (qrCanvas.width - size) / 2;
        const y = (qrCanvas.height - size) / 2;

        // Draw a white background for the logo
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, size, size);

        // Draw the logo on top of the white background
        ctx.drawImage(logo, x, y, size, size);
      };
    }).catch((error) => {
      console.error(error);
    });
  });
}

    onMount(() => {
      campaignName = localStorage.getItem("currentCampaign")
      if (!shortCode || !isOpen) {
        onClose();
      } else {
        generateQRCode();
      }
    });
  
    // Regenerate the QR code when the canvas is available
    $: if (qrCanvas) {
      generateQRCode();
    }
  
    // Download the canvas as a PNG image
    function handleDownload() {
      if (!qrCanvas) return;
      const qrDataUrl = qrCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = qrDataUrl;
      link.download = `${campaignName.toLowerCase().replace(/ /g, "_")}_QR.png`;
      link.click();
    }
    function handlePreview(){
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.click();
    }
  </script>
  
  {#if isOpen}
    <div class="overlay">
      <div class="popup">
        <div class="headers">
          <span>{campaignName}</span>
          <button class="closeButton" on:click={onClose} aria-label="Close">
            <img src={closeIcon} alt="">
          </button>
        </div>
        <div class="content">
          <div class="qrContainer">
            <!-- <h2 class="subTitle">{campaignName}</h2> -->
            <canvas bind:this={qrCanvas}></canvas>
          </div>
          <div class="btn-wrapper">
            <!-- <a target="_blank" href={url} rel="noreferrer">
              Click here to visit your {type}
            </a> -->
            <button class="downloadButton" on:click={handleDownload}>
              <img src={publishIcon} alt="" style="transform: rotate(180deg);">
              Download QR 
            </button>
            <button class="publishButton" on:click={handlePreview}>
              <img src={previewIcon} alt="">
              View campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .popup {
      background-color: white;
      width: 25%;
      max-width: 600px;
      /*  */
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
      position: relative;
    }
    
    .headers {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 1rem;
    }
    
    .headers > span {
      font-size: 16px;
      font-weight: 600;
      color: black;
    }
    
    .closeButton {
      background-color: transparent;
     
      cursor: pointer;
      padding: 0;
      color: #808080;
      transition: color 0.3s;
    }
    .closeButton > img{
      width: 22px;
    }
    .closeButton:hover {
      color: #333;
    }
    
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    
    .content input {
      background-color: white;
      color: black;
    }
    
    .qrContainer {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .subTitle {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    .linkWrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .btn-wrapper{
      display: flex;
      padding: 1rem;
      gap: 0.5rem;
      box-sizing: border-box;
      justify-content: center;
      width: 100%;
      border-top: 1px solid #ccc;
    }
    
    .downloadButton {
      background-color: #808080;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.3s;
      width: 50%;
    }
  
    
    .downloadButton:hover {
      background-color: #555;
    }
    
    .publishButton {
      background-color: #39A6F5;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.3s;
      width: 50%;
    }
    
    .publishButton:hover {
      background-color: #0056b3;
    }
    
    .publishButton:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  </style>
  