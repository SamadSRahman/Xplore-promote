<script>
  import { onDestroy, onMount } from "svelte";
  import { deleteLayout, getAllLayoutNames, setInitialLayout } from "../utils/svelteUtils";
  import { getScreenName } from "../utils/services";
  import screenIcon from "../../assets/screen-icon.svg";
  import starIcon from "../../assets/kid_star.png";
  import moreIcon from "../../assets/more_vert.svg";
import deleteIcon from '../../assets/delete.svg'

  const segments = window.location.pathname.split("/");
  let currentScreenName = segments[3] || "";
  const campaignId = segments[2];
  const origin = window.location.origin;
  let screens = [];
  onMount(async () => {
    screens = await getAllLayoutNames(campaignId);
    console.log("screens", screens); document.addEventListener('click', handleClickOutside);
  });
  onDestroy(() => {
    // Clean up listener when component unmounts
    document.removeEventListener('click', handleClickOutside);
  });
  let selectedScreenId = null;
  let popupPosition = { x: 0, y: 0 };

  async function handleDelete(screenId) {
 
      await deleteLayout(screenId);
      screens = screens.filter(s => s.id !== screenId);
      selectedScreenId = null;

    
  }

  async function handleSetInitial(screenId) {
    await setInitialLayout(screenId);
    screens = screens.map(s => ({ ...s, isInitial: s.id === screenId }));
    selectedScreenId = null;
  }

  function openPopup(event, screen) {
    event.stopPropagation();
    selectedScreenId = screen.id;
    popupPosition = {
      x: event.clientX,
      y: event.clientY
    };
  }

  function handleClickOutside(event) {
    if (!event.target.closest('.popup')) {
      selectedScreenId = null;
    }
  }

  function handleScreenChange(screen) {
    window.location.href = `${origin}/editor/${campaignId}/${screen.path}`;
  }
</script>

<div class="screen-container" >
    <div class="screen-list">
      {#each screens as screen}
        <button
          class={currentScreenName === screen.path
            ? "screen-item-active"
            : "screen-item"}
        >
          <div
            role="button"
            tabindex="0"
            on:click={() => handleScreenChange(screen)}
            on:keydown={(e) => e.key === "Enter" && handleScreenChange(screen)}
            class="left-section"
          >
            <div class="img-wrapper">
              <img src={screenIcon} alt="" />
            </div>
            {screen.name}
            {#if screen.isInitial}
              <img src={starIcon} class="star-icon" alt="" />
            {/if}
          </div>
          <div class="icon-wrapper" on:click={e => openPopup(e, screen)}>
            <img src={moreIcon} alt="" />
            {#if selectedScreenId === screen.id}
              <div class="popup" style={`left: ${popupPosition.x}px; top: ${popupPosition.y}px;`}>
                <button on:click={() => handleSetInitial(screen.id)}>
                    <img class="star-icon" src={starIcon} alt="">
                    Set as Initial</button>
                <button on:click={() => handleDelete(screen.id)}>
                    <img class="delete-icon" src={deleteIcon} alt="">
                    Delete Screen</button>
              </div>
            {/if}
          </div>
        </button>
      {/each}
    </div>
  </div>

<style>
  .screen-container {
    /* width: 45vw; */
  }
  .screen-list {
    display: flex;
    align-items: left;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1rem;
  }
  .screen-item,
  .screen-item-active {
    padding: 0.5rem;
    margin: auto;
    width: 95%;
    display: flex;
    align-items: top;
    justify-content: space-between;
    gap: 0.5rem;
    background-color: white;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
    border: 0.6px solid #ccc;
    border-radius: 0.6rem;
  }
  .screen-item-active {
    box-shadow: 2px 2px 5px 0px rgb(57, 166, 245, 0.3);
    border: 0.6px solid rgb(57, 166, 245, 0.5);
  }
  .img-wrapper {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    width: min-content;
    background-color: #f0f0f0;
    position: relative;
  }
  .star-icon {
    width: 15px;
   
  }
  .left-section {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 0.5rem;
    width: 100%;
  }
  .icon-wrapper{
    background-color: #f0f0f0;
    height: min-content;
    border-radius: 0.3rem;
    box-shadow: 0.778px 1.556px 1.556px 0px rgba(0, 0, 0, 0.12);
  }

  .popup {
    position: fixed;
    /* left: 0px; */
    background: white;
    border: 1px solid #ccc;
    border-radius: 0.6rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 0.5rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .popup button {
    padding: 0.5rem 0.5rem;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .popup button:hover {
    background-color: #f5f5f5;
  }

  .icon-wrapper {
    position: relative;
    background-color: #f0f0f0;
    height: min-content;
    border-radius: 0.3rem;
    box-shadow: 0.778px 1.556px 1.556px 0px rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }
.delete-icon{
    width: 15px;
}
</style>
