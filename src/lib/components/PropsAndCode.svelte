<script lang="ts">
  import { getContext, onMount } from "svelte";
  import RadioSelector from "./controls/RadioSelector.svelte";
  import Props from "./Props.svelte";
  import TextEditor from "./TextEditor.svelte";
  import { LANGUAGE_CTX, type LanguageContext } from "../ctx/languageContext";
  import propsIcon from "../../assets/props.svg?url";
  import complexPropsIcon from "../../assets/complexProps.svg?url";
  import codeIcon from "../../assets/code.svg?url";
  import { APP_CTX, type AppContext } from "../ctx/appContext";
  import PreviewScreen from "./PreviewScreen.svelte";
  import publishIcon from "../../assets/publish.svg";
  import saveIcon from "../../assets/save.svg";
  import previewIcon from "../../assets/visibility.svg";
  import { saveLayout, updateProfile } from "../utils/svelteUtils";
  import QrPopup from "./QrPopup.svelte";

  let shortCode = "";
  let screenName = "";
  let layoutId = "";


  onMount(() => {
    const segments = window.location.pathname.split("/");
    screenName = segments[3];
    layoutId = localStorage.getItem("layoutId") || "";
    shortCode = localStorage.getItem("currentCampaignCode") || "";
  });
  const { l10n } = getContext<LanguageContext>(LANGUAGE_CTX);
  const { state } = getContext<AppContext>(APP_CTX);
  let panel = "props";
  const { divjsonStore } = state;

  
  let showPreview = false;
  let showQrPopup = false;

  function closePreview() {
    showPreview = false;
  }
  function handleSave() {
    layoutId = localStorage.getItem("layoutId") || "";
    console.log("triggered handleSave with layout id", layoutId);
    const page = window.location.pathname.split("/")[1];
    const profileId = window.location.pathname.split("/")[2]
    console.log("page", page);
    
    if (layoutId && page!=="profileDesign") {
      saveLayout(layoutId, $divjsonStore.fullString, screenName, true);
    }
    if(page==="profileDesign" && profileId){
      console.log(profileId)
      updateProfile(profileId,$divjsonStore.fullString )
    }
  }
</script>

<div>
  <div class="header-container">
    <button class="preview-btn" on:click={() => (showQrPopup = true)}>
      <img src={previewIcon} alt="" />
      Preview</button
    >
    <button class="save-btn" on:click={handleSave}>
      <img src={saveIcon} alt="" /> Save
    </button>
    <button class="publish-btn" on:click={() => (showQrPopup = true)}>
      <img src={publishIcon} alt="" /> Publish</button
    >

    <PreviewScreen
      isOpen={showPreview}
      onClose={closePreview}
      jsonData={$divjsonStore.fullString}
    />
    <QrPopup
      {shortCode}
      type="campaign"
      isOpen={showQrPopup}
      onClose={() => (showQrPopup = false)}
    />
  </div>
  <div class="props-and-code">
    <RadioSelector
      bind:value={panel}
      name="props-code"
      options={[
        {
          text: $l10n("componentProperties"),
          value: "props",
          icon: propsIcon,
        },
        {
          text: $l10n("complexComponentProperties"),
          value: "complexProps",
          icon: complexPropsIcon,
        },
        {
          text: $l10n("code"),
          value: "code",
          icon: codeIcon,
        },
      ]}
      theme="normal"
    />
  </div>
</div>
{#if panel === "props" || panel === "complexProps"}
  <Props showComplex={panel === "complexProps"} />
{:else}
  <TextEditor />
{/if}

<style>
  .header-container {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 0.7rem;
    border-bottom: 1px solid #ccc;
    padding: 0.8rem;
  }
  .props-and-code {
    margin: 16px 16px 4px;
  }
  .preview-btn,
  .save-btn,
  .publish-btn {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: #595959;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    font-weight: 500;
    font-size: 14px;
  }
  .save-btn {
    background-color: #39a6f5;
  }
  .publish-btn {
    background-color: #4caf50;
  }
  .preview-btn > img{
    transform: rotate(180deg);

  }
</style>
