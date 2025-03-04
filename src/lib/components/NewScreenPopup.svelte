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
          <!-- <IoMdClose size={24} /> -->
           <!-- ❌ -->
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
      padding: 1.5rem;
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
    }
    .close-button {
      cursor: pointer;
      background-color: transparent;
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
    }
    .btn-container{
      display: flex;
      align-items: center;
      gap: 0.5rem;
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
      height: 2.5rem;
    }
    .cancel-button{
      background-color: #595959;
    }
  </style>
  