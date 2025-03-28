<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import axios from 'axios';
  import { onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  let fontName = '';
  let specificName = "";
  let selectedWeight = 'normal';
  let fontFile: File | null = null;
  let loading = false;
  let error: string | null = null;

  const weights = [
    { value: 'light', label: 'Light' },
    { value: 'normal', label: 'Normal' },
    { value: 'medium', label: 'Medium' },
    { value: 'bold', label: 'Bold' }
  ];

  const API_BASE_URL = window.location.origin === "https://pre.xplore.xircular.io" 
    ? 'https://pre.xplore.xircular.io/api'
    : 'https://xplr.live/api';

  async function handleSubmit() {
    if (!fontName || !fontFile) {
      error = 'Please fill in all fields';
      return;
    }

    loading = true;
    error = null;
    // specificName = fontName.toLowerCase().replace(/\s+/g, '') + "-" + selectedWeight;
    console.log("specific name:", specificName);
    
    try {
      const token = localStorage.getItem("accessToken");
      const session = localStorage.getItem("channel");

      const formData = new FormData();
      formData.append('name', fontName);
      formData.append('specificName', specificName);
      formData.append('fontWeightName', selectedWeight);
      formData.append('files', fontFile);

      const response = await axios.post(`${API_BASE_URL}/v1/font/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          session: session,
          Authorization: `Bearer ${token}`
        }
      });

      dispatch('fontAdded', response.data);
      dispatch('close');
    } catch (err) {
      error = 'Failed to add font. Please try again.';
      console.error('Error adding font:', err);
    } finally {
      loading = false;
    }
  }

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      fontFile = input.files[0];
    }
  }
</script>

<div class="popup-overlay" on:click={() => dispatch('close')}>
  <div class="popup-content" on:click|stopPropagation>
    <div class="popup-header">
      <h2>Add New Font</h2>
      <button class="close-button" on:click={() => dispatch('close')}>×</button>
    </div>

    <div class="popup-body">
      <div class="form-group">
        <label for="fontName">Font Name</label>
        <input
          type="text"
          id="fontName"
          bind:value={fontName}
          placeholder="Enter font name"
        />
      </div>
      <div class="form-group">
        <label for="specificName">Specific Name</label>
        <input
          type="text"
          id="specificName"
          bind:value={specificName}
          placeholder="Enter specific name"
        />
      </div>

      <div class="form-group">
        <label for="fontWeight">Font Weight</label>
        <select id="fontWeight" bind:value={selectedWeight}>
          {#each weights as weight}
            <option value={weight.value}>{weight.label}</option>
          {/each}
        </select>
      </div>

      <div class="form-group">
        <label for="fontFile">Font File</label>
        <input
          type="file"
          id="fontFile"
          accept=".ttf,.otf,.woff,.woff2"
          on:change={handleFileChange}
        />
        <div class="file-info">
          {#if fontFile}
            Selected: {fontFile.name}
          {:else}
            No file selected
          {/if}
        </div>
      </div>

      {#if error}
        <div class="error-message">{error}</div>
      {/if}
    </div>

    <div class="popup-footer">
      <button class="cancel-button" on:click={() => dispatch('close')}>
        Cancel
      </button>
      <button 
        class="submit-button" 
        on:click={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Font'}
      </button>
    </div>
  </div>
</div>

<style>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .popup-content {
    background: white;
    border-radius: 12px;
    width: 30%;
    max-width: 500px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    height: fit-content;
    padding: 0;
  }

  .popup-header {
    padding: 0.5rem 0.8rem;
    border-bottom: 1px solid #eee;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    /* border: 1px solid; */
  }

  .popup-header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 0.5rem;
    line-height: 1;
  }

  .popup-body {
    padding: 1rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    /* margin-bottom: 0.5rem; */
    font-weight: 500;
    color: #333;
    font-size: 0.8rem;
  }

  .form-group input[type="text"],
  .form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: border-color 0.2s ease;
    box-sizing: border-box;
  }

  .form-group input[type="text"]:focus,
  .form-group select:focus {
    outline: none;
    border-color: #39A6F5;
  }

  .form-group input[type="file"] {
    width: 100%;
    padding: 0.5rem;
    border: 2px dashed #ddd;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 0;
    box-sizing: border-box;

  }

  .file-info {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #666;
  }

  .error-message {
    color: #ff4d4f;
    font-size: 0.9rem;
    margin-top: 1rem;
    padding: 0.5rem;
    background: #fff1f0;
    border-radius: 4px;
  }

  .popup-footer {
    padding: 0.8rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    width: 100%;
    box-sizing: border-box;
  }

  .cancel-button,
  .submit-button {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 50%;
  }

  .cancel-button {
    background-color: #595959;
    border: 1px solid #ddd;
    /* color: #666; */
  }

  .submit-button {
    background: #39A6F5;
    border: none;
    color: white;
  }

  .submit-button:hover {
    background: #2B8CD9;
  }

  .submit-button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
</style> 