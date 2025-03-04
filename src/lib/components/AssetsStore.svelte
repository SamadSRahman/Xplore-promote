<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { encodeBackground } from "../utils/encodeBackground";
  import { APP_CTX, type AppContext } from "../ctx/appContext";
  import { AddLeafCommand } from "../data/commands/addLeaf";
  import { findLeaf } from "../utils/tree";
  import * as Lottie from "lottie-web"; 
   import LottieAction from "./LottieAction.svelte";

  type Asset = {
    id: string;
    originalName: string;
    cdnUrl: string;
    extension: string;
    type: "icon" | "image" | "gif" | "video";
  };

  type ApiResponse = {
    data: Asset[];
    pagination: {
      currentPage: 1,
      hasNextPage: true,
      hasPrevPage: false,
      totalAssets: 149,
      totalPages: 15,
    };
  };
  const { state, rendererApi } = getContext<AppContext>(APP_CTX);
    const {tree, selectedLeaf} = state
  let activeSection: "icon" | "image" | "gif" | "video" | "others" | "lottie"= "image";
  let assets: Asset[] = [];
  let currentPage = 1;
  let totalPages = 1;
  let isLoading = false;
  let error: string | null = null;

  const extensionMap = {
    images: ["jpg", "jpeg", "png", "webp", "svg"],
    gifs: ["gif"],
    videos: ["mp4", "mov", "avi", "mkv"],
    icons: ["svg", "ico"],
  };

  function onDragStart(event: DragEvent, type: string, url: string): void {
    if (event.dataTransfer) {
      // Store both values with different data types
      if(type==="others"){
        event.dataTransfer.setData("application/divnode", `_new:${"image"}`);
      }
      else if(type === "lottie"){
        event.dataTransfer.setData("application/divnode", `_new:${"_template_lottie"}`);
      }
      else{
        event.dataTransfer.setData("application/divnode", `_new:${type}`);
      }
      event.dataTransfer.setData("text/uri-list", url); // Standard MIME type for URLs
      event.dataTransfer.dropEffect = "copy";
    }
  }
  function lottieAction(node: HTMLElement, url: string) {
  const animation = Lottie.default.loadAnimation({
    container: node,
    renderer: 'svg', // or 'canvas'
    loop: true,
    autoplay: true,
    path: url, // Lottie JSON file URL
  });

  return {
    destroy() {
      animation.destroy();
    }
  };
}
  const fetchAssets = async () => {
    const token = localStorage.getItem("accessToken");
    const session = localStorage.getItem("channel");
    try {
      isLoading = true;
      error = null;

      const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
      };
      if (session) {
        headers['session'] = session;
      }

      const response = await fetch(
        `https://xplr.live/api/v1/content/getAssets?page=${currentPage}&limit=20&fileType=${activeSection}`,
        {
          headers,
        }
      );

      if (!response.ok) throw new Error("API request failed");
        if(response.status === 401) alert("Session Expired, please log in again")
      const { data, pagination }: ApiResponse = await response.json();
      assets = data;
      currentPage = pagination.currentPage;
      totalPages = pagination.totalPages
    } catch (err) {
            error = "Failed to load assets";
   
      assets = [];
    } finally {
      isLoading = false;
    }
  };
  function onClick(type: string, url:string): void {
    const newChild = state.getChild(`_new:${type==="others"?"image":type==="lottie"?"_template_lottie":type}`, true);
    if (!newChild) {
      return;
    }

    const childType = newChild.props.json.type;
    
      if(childType === "image") {
        newChild.props.json.image_url = url;
      } 
      else if(childType === "video"){
      newChild.props.json.video_sources[0].url = url;
    }
      else if(childType === "gif"){
      newChild.props.json.gif_url = url;
    }
      else if(childType === "_template_lottie"){
        console.log("line 125",newChild.props.json);
        
      newChild.props.json.lottie_params.lottie_url = url;
    }
    // "lottie_params": {
    //             "lottie_url": "https://xplore.objectstore.e2enetworks.net/1740745242384-bac3ef4dcc1d66d9.json"
    //           }
  
    state.pushCommand(
      new AddLeafCommand({
        parentId: $tree.id,
        insertIndex: $tree.childs.length,
        leaf: newChild,
      })
    );
    console.log("newChild", newChild);

    $selectedLeaf = findLeaf($tree, newChild.id) || null;

    rendererApi().focus();
  }

  $: {
    // Reset to first page when section changes
    let section = activeSection;
    currentPage = 1;
    fetchAssets();
  }

  $: currentPage, fetchAssets();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      currentPage = newPage;
    }
  };
</script>

<div class="assets-store">
  <div class="navbar-container">
    <!-- <button
      class={activeSection === "icon"
        ? "navbar-button-active"
        : "navbar-button-inactive"}
      on:click={() => (activeSection = "icon")}
    >
      Icons
    </button> -->
    <button
      class={activeSection === "image"
        ? "navbar-button-active"
        : "navbar-button-inactive"}
      on:click={() => (activeSection = "image")}
    >
      Images
    </button>
    <button
      class={activeSection === "gif"
        ? "navbar-button-active"
        : "navbar-button-inactive"}
      on:click={() => (activeSection = "gif")}
    >
      GIFs
    </button>
    <button
      class={activeSection === "video"
        ? "navbar-button-active"
        : "navbar-button-inactive"}
      on:click={() => (activeSection = "video")}
    >
      Videos
    </button>
    <button
      class={activeSection === "lottie"
        ? "navbar-button-active"
        : "navbar-button-inactive"}
      on:click={() => (activeSection = "lottie")}
    >
      Lottie
    </button>
    <button
      class={activeSection === "others"
        ? "navbar-button-active"
        : "navbar-button-inactive"}
      on:click={() => (activeSection = "others")}
    >
      Others
    </button>
  </div>

  {#if isLoading}
    <div class="loading">Loading assets...</div>
  {:else if error}
    <div class="error">{error}</div>
  {:else}
    <div class="assets-grid">
      {#each assets as asset}
        <div
          class="asset-item"
          draggable
          on:dragstart={(event) => onDragStart(event, activeSection, asset.cdnUrl)}
          on:click={() => onClick(activeSection, asset.cdnUrl)}

        >
          <div class="asset-thumbnail">
          {#if activeSection==="image" || activeSection==="others"|| activeSection==="gif"}
          <img
          src={asset.cdnUrl}
          alt={asset.originalName}
          class="thumbnail-image"
          loading="lazy"
        />
        {/if}
          {#if activeSection==="video"}
          <video
          src={asset.cdnUrl}
          class="thumbnail-img"
        />
        {/if}
        {#if activeSection === "lottie"}
        <div use:lottieAction={asset.cdnUrl} class="lottie-container"></div>
      {/if}
          </div>
          <div class="asset-name">{asset.originalName}</div>
        </div>
      {/each}
    </div>

    <div class="pagination-controls">
      <button
        on:click={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        Previous
      </button>

      <span class="page-info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        on:click={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
      >
        Next
      </button>
    </div>
  {/if}
</div>

<style>
  /* Previous styles remain the same */
  .assets-store{
   
  }
  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    padding: 1rem;
  }
  .navbar-container {
    border-bottom: 1px solid #ccc;
    padding: 0.7rem;
    display: flex;
    justify-content: left;
    gap: 0.7rem;
    /* position: sticky;
    top:2rem;
    background-color: white; */
  }
  .navbar-button-active {
    background-color: rgb(215, 238, 255);
    color: rgb(57, 166, 245);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 14px;
    border: none;
  }
  .navbar-button-inactive {
    background-color: transparent;
    color: rgb(0, 0, 0);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 14px;
    border: none;
  }
  .pagination-controls button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pagination-controls button:hover:not(:disabled) {
    background: #f0f0f0;
  }

  .pagination-controls button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-info {
    font-size: 0.9rem;
    color: #666;
  }
  .asset-name {
    box-sizing: border-box;
    max-width: 100%;
    max-height: 20px;
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    line-height: 20px;
  }
  .assets-grid {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
   
    box-sizing: border-box;
    gap: 10px;
    padding: 10px;
    /* font-family: "Open Sans", sans-serif; */
    justify-content: left;
    align-items: left;
  }
  .asset-item:hover {
    background: var(--fill-transparent-2);
  }

  .asset-item:active {
    background: var(--fill-transparent-3);
  }
  .asset-thumbnail {
    width: 100%;
    overflow: hidden;
  }
  .asset-thumbnail > img, .asset-thumbnail > video , .lottie-container{
    width: 100%;
    object-fit: contain;
    height: 5rem;
  }
  .asset-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0.5rem;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    width: 18%;
 
    background: var(--fill-transparent-1);
  }
  .header-logo-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  
</style>




