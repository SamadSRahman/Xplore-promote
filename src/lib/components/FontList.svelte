<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllFonts } from '../utils/fonts';
  import arrowDropDown from '../../assets/arrowDown2.svg';
  import AddFontPopup from './AddFontPopup.svelte';
  import file from '../../assets/fontFile.svg'

  interface FontWeight {
    id: string;
    fontWeightName: string;
    specificName: string;
    fontWeightFile: string;
  }

  interface Font {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    fontWeights: FontWeight[];
  }

  let fonts: Font[] = [];
  let loading = true;
  let error: string | null = null;
  let expandedFontId: string | null = null;
  let loadedFonts = new Set<string>();
  let showAddPopup = false;

  onMount(async () => {
    await loadFonts();
  });

  async function loadFonts() {
    try {
      const response = await getAllFonts();
      fonts = response.data.data;
      // Load all fonts initially
      fonts.forEach(font => {
        font.fontWeights.forEach(weight => {
          loadFont(weight.specificName, weight.fontWeightFile);
        });
      });
    } catch (err) {
      error = 'Failed to load fonts';
      console.error('Error loading fonts:', err);
    } finally {
      loading = false;
    }
  }

  function loadFont(fontName: string, fontUrl: string) {
    if (loadedFonts.has(fontName)) return;

    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: '${fontName}';
        src: url('${fontUrl}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
    loadedFonts.add(fontName);
  }

  function toggleFont(fontId: string) {
    expandedFontId = expandedFontId === fontId ? null : fontId;
  }

  function handleFontAdded() {
    loadFonts();
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
</script>

<div class="font-list">
  <div class="add-section">
    <button class="add-button" on:click={() => showAddPopup = true}>
      Add +
    </button>
  </div>

  {#if showAddPopup}
    <AddFontPopup
      on:close={() => showAddPopup = false}
      on:fontAdded={handleFontAdded}
    />
  {/if}

  {#if loading}
    <div class="loading">Loading fonts...</div>
  {:else if error}
    <div class="error">{error}</div>
  {:else}
    {#each fonts as font (font.id)}
      <div 
        class="font-card" 
        class:expanded={expandedFontId === font.id}
        on:click={() => toggleFont(font.id)}
        role="button"
        tabindex="0"
        aria-expanded={expandedFontId === font.id}
      >
        <div class="font-header">
          <div class="font-info"><img src={file} alt="">
            <h3 class="font-name">{font.name}</h3>
            <!-- <div class="font-meta">
              <span class="font-date">Added: {formatDate(font.createdAt)}</span>
              <span class="font-weights-count">{font.fontWeights.length} weights</span>
            </div> -->
            <!-- <div class="font-preview" style="font-family: '{font.fontWeights[0].specificName}'">
              The quick brown fox jumps over the lazy dog
            </div> -->
          </div>
          <div class="font-actions">
            <button 
              class="dropdown-button"
              on:click|stopPropagation={() => toggleFont(font.id)}
            >
              <img 
                src={arrowDropDown} 
                alt="Toggle font details"
                class:rotated={expandedFontId === font.id}
              />
            </button>
          </div>
        </div>
        
        {#if expandedFontId === font.id}
          <div class="font-weights">
            {#each font.fontWeights as weight}
              <div class="weight-item">
                <div class="weight-info">
                  <span class="weight-name">{weight.fontWeightName}</span>
                  <span class="weight-specific-name">{weight.specificName}</span>
                  <div class="weight-preview" style="font-family: '{weight.specificName}'">
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
                <div class="weight-actions">
                  <a 
                    href={weight.fontWeightFile} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="preview-button"
                    on:click|stopPropagation
                  >
                    Download
                  </a>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</div>

<style>
  .font-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-width: 800px;
    margin: 0 auto;
    font-family: Sora;
  }

  .font-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: all 0.2s ease;
    cursor: pointer;
    border: 1px solid #f0f0f0;
  }

  .font-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  .font-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5rem;
  }

  .font-info {
    display: flex;
    /* flex-direction: column; */
    gap: 0.75rem;
    flex: 1;
  }
  .font-info > img{
    width: 0.9rem;
  }

  .font-name {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: capitalize;
    color: #1a1a1a;
  }

  .font-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: #666;
  }

  .font-preview {
    font-size: 1.1rem;
    color: #333;
    line-height: 1.5;
    padding: 0.5rem 0;
  }

  .font-actions {
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }

  .dropdown-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    transition: transform 0.3s ease;
  }

  .dropdown-button img {
    width: 30px;
    height: 30px;
    transition: transform 0.3s ease;
  }

  .dropdown-button img.rotated {
    transform: rotate(180deg);
  }

  .font-weights {
    padding: 0 1.25rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    border-top: 1px solid #f0f0f0;
  }

  .weight-item {
    padding: 0.75rem;
    border-radius: 8px;
    background: #fafafa;
    transition: all 0.2s ease;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border: 1px solid #f0f0f0;
  }

  .weight-item:hover {
    background: #f5f5f5;
    transform: translateX(2px);
  }

  .weight-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .weight-name {
    font-weight: 600;
    text-transform: capitalize;
  }

  .weight-specific-name {
    font-size: 0.9rem;
    color: #666;
  }

  .weight-preview {
    font-size: 1rem;
    color: #333;
    line-height: 1.5;
    padding: 0.5rem 0;
  }

  .preview-button {
    background: #39A6F5;
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    text-decoration: none;
    font-size: 0.85rem;
    transition: all 0.2s ease;
    font-weight: 500;
  }

  .preview-button:hover {
    background: #2B8CD9;
    transform: translateY(-1px);
  }

  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  .error {
    text-align: center;
    padding: 2rem;
    color: #ff4d4f;
    background: #fff1f0;
    border-radius: 8px;
  }

  .add-section {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.5rem;
  }

  .add-button {
    background: transparent;
    color: black;
    border: none;
    /* padding: 0.75rem 1.5rem; */
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .add-button:hover {
    /* background: #2B8CD9; */
    transform: translateY(-1px);
  }
</style> 