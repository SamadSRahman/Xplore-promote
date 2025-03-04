<script>
  import { onMount } from "svelte";
  import NewScreenPopup from "./NewScreenPopup.svelte";
  import { getAllLayoutNames } from "../utils/svelteUtils";
  import { getScreenName } from "../utils/services";
  import starIcon from "../../assets/kid_star.png";
  import arrowIcon from "../../assets/arrowDropDown.svg";

  let isNewScreenPopupVisible = false;
  const segments = window.location.pathname.split("/");
  let currentScreenName = segments[3] || "";
  const campaignId = segments[2];
  const origin = window.location.origin;
  let screens = [];
  onMount(async () => {
    screens = await getAllLayoutNames(campaignId);
    console.log("screens", screens);
  });
  // Get parts of the URL
  let isDropdownVisible = false;

  function handleScreenChange(event) {
    const selectedScreen = event.target.value;
    window.location.href = `${origin}/editor/${campaignId}/${selectedScreen}`;
  }

  // let screens = [];
  const screensData = localStorage.getItem("screens");
  if (screensData) {
    screens = JSON.parse(screensData);
  }
</script>

<div class="screen-selector-container" style="">
  {#if isNewScreenPopupVisible}
    <NewScreenPopup
      {campaignId}
      onClose={() => (isNewScreenPopupVisible = false)}
    />
  {/if}

  <!-- <select
    style="background-color: #39A6F5;color:#fff; border: none; width: max-content ; border-radius: 0.5rem; padding: 0.5rem; font-weight: bold; font-size: 15px; display: flex; align-items: center; gap: 0.4rem; cursor: pointer;"
    on:change={handleScreenChange}
    bind:value={currentScreenName}
  >
    {#each screens as screen, index}
      <option style="background-color:#fff; color:#000;" value={screen.path}>{screen.name}</option>
    {/each}
  </select> -->
  <!-- <div class="container"> -->
  <button
    class="select-btn"
    on:click={() => {
      isDropdownVisible = !isDropdownVisible;
    }}
  >
    <span class="label">Screen </span>
    <span class="name-span">
      {getScreenName(currentScreenName)}
      {#if screens.find((screen) => screen.path === currentScreenName)?.isInitial}
        <img class="star_img" src={starIcon} alt="" />
      {/if}
    </span>
    <img
      class="arrow_img"
      class:rotated={isDropdownVisible}
      src={arrowIcon}
      alt=""
    />
    {#if isDropdownVisible}
      <div class="dropdown">
        {#each screens as screen, index}
          <button
            type="button"
            style="padding: 0.5rem; background-color: #fff; cursor: pointer;"
            on:click={() => {
              window.location.href = `${origin}/editor/${campaignId}/${screen.path}`;
            }}
            aria-role="link"
          >
            <span>{screen.name}</span>
            {#if screen?.isInitial}
              <img class="star_img" src={starIcon} alt="" />
            {/if}
          </button>
        {/each}
      </div>
    {/if}
  </button>

  <!-- </div> -->

  <button
    style="background-color: #E6E6E6; border: none; border-radius: 0.5rem; padding: 0.5rem 1rem; font-weight: bold; font-size: 14px; display: flex; align-items: center; gap: 0.4rem; cursor: pointer;"
    on:click={() => (isNewScreenPopupVisible = true)}
  >
    Add Screen
    <!-- <IoMdAdd size={16} /> -->
  </button>
</div>

<style>
  .screen-selector-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: white;
    padding: 0.631rem;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    position: sticky;
    top: 0;z-index: 5;
  }
  .star_img {
    width: 16px;
    height: 16px;
  }
  .select-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem;
    border-radius: 0.6rem;
    background-color: #f5f5f5;
  }
  .label {
    color: #535353;
    border-right: 1px solid #000;
    padding-right: 0.5rem;
    margin-right: 0.5rem;
  }
  .arrow_img {
    width: 25px;
    height: 25px;
    transition: transform 0.3s ease;
  }
  .rotated {
    transform: rotate(180deg);
  }
  .name-span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: bold;
  }
  .dropdown {
    border-radius: 0.4rem;
    overflow: hidden;
    box-shadow: 2px 2px 5px rgb(0, 0, 0, 0.3);
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 3rem;
    right: 0rem;
    z-index: 5;
  }
  .dropdown > button {
    padding: 0.5rem 1rem;
  }
</style>
