<script>
import closeIcon from '../../assets/closeIcon.svg'
  import { getScreenPath } from '../utils/services';
  import { blankBackgroundJSON } from '../utils/splashScreenData';
  import { createLayout } from '../utils/svelteUtils';

export let onClose;
let screenName = "";
  
    // Dummy function – integrate your API call here.
    // function createLayout(layoutJSON, screenName) {
    //   console.log("createLayout called with:", layoutJSON, campaignId, screenName);
    //   const campaignId = window.location.pathname[1]
    //   console.log(campaignId);
      
    // }
  
 async function handleOnSubmit() {
      if (screenName === "contact_us_screen") {
        alert("Cannot create screen with this name. Please use the Contact Us component to create a screen with this name.");
        return;
      }
      if (screenName === "chatbot_screen") {
        alert("Cannot create screen with this name. Please use the ChatBot component to create a screen with this name.");
        return;
      }
      if (screenName.length > 5) {
        // Check for special characters that could affect routing
        const invalidChars = /[\/\\?%*:|"<>]/;
        if (invalidChars.test(screenName)) {
          alert("Screen name cannot contain special characters like /, \\, ?, %, *, :, |, \", <, or >");
          return;
        }

        const segments = window.location.pathname.split("/");
        
        // You can replace the JSON below with your blankBackgroundJSON.
        const campaignId = segments[2]
       const isAdded =  await createLayout(JSON.stringify(blankBackgroundJSON), campaignId, screenName, false)
       if(isAdded){
        alert(`${screenName} added!`);
        onClose();
        window.location.href = `${window.location.origin}/${segments[1]}/${segments[2]}/${getScreenPath(screenName)}`
       }
      } else {
        alert("Screen name should be of at least 5 letters");
      }
    }
  </script>
  
  <div class="overlay">
    <div class="popup">
      <div class="headers">
        <span>Add new screen</span>
        <button class="close-button" on:click={onClose} aria-label="Close">
            <img src={closeIcon} alt="">
        </button>
      </div>
      <div class="content">
        <label for="pageName">Screen Name (Should be unique)</label>
        <input id="pageName" type="text" bind:value={screenName} placeholder="Ex: Landing screen, Product screen " />
      <div class="btn-container">
        <button class="cancel-button" on:click={onClose}>Cancel</button>
        <button  class="submit-button" on:click={handleOnSubmit}>Create Screen</button>
      </div>
      </div>
    </div>
  </div>
  
  <style>
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .popup {
      background: #fff;
      border-radius: 8px;
      /* padding: 1rem; */
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      width: 400px;
      max-width: 90%;
    }
    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 1rem;
      padding:0.8rem
    }
    .content{
      padding: 1rem;
      gap:0.8rem;

    }
    .close-button {
      cursor: pointer;
      background-color: transparent;
    }
    .close-button > img{
      width: 1.4rem;
    }
    .content label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    .content input {
      width: 100%;
      box-sizing: border-box;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 1rem;
      background-color: #F5F5F5;
      outline: none;
    }
    .btn-container{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
    }
    
    .submit-button, .cancel-button {
      background-color: #39A6F5;
      color: white;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 7px;
      cursor: pointer;
      border: none;
      width: 100%;
      min-width: fit-content;
      height: 2.5rem;
      transition: all 0.2s ease-in-out;
    }
    .cancel-button{
      background-color: #595959;
    }
    .submit-button:hover {
      background-color: #2B8CD9;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(57, 166, 245, 0.2);
    }
    .cancel-button:hover {
      background-color: #404040;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(89, 89, 89, 0.2);
    }
  </style>
  