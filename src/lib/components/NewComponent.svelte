<script lang="ts">
  import { getContext } from "svelte";
  import { capitalize } from "../utils/capitalize";
  import { LANGUAGE_CTX, type LanguageContext } from "../ctx/languageContext";
  import {
    additionalComponentsList,
    smallComponentsList,
  } from "../data/components";
  import Spoiler2 from "./controls/Spoiler2.svelte";
  import { AddLeafCommand } from "../data/commands/addLeaf";
  import { findLeaf } from "../utils/tree";
  import { APP_CTX, type AppContext } from "../ctx/appContext";
  import { encodeBackground } from "../utils/encodeBackground";
  import { onMount } from "svelte";
  import { ChangeCustomVariablesCommand } from "../data/commands/changeCustomVariables";
  import type { Variable } from "../data/customVariables";

  import headerIcon from "../../assets/headerIcon.svg";
  import AssetsStore from "./AssetsStore.svelte";
  import Screens from "./Screens.svelte";
  import Text from "./controls/Text.svelte";

  onMount(() => {
    import("../../webComponents/AssetsNavbarWebWrapper");
  });
  const { l10nString, lang } = getContext<LanguageContext>(LANGUAGE_CTX);
  const { state, rendererApi } = getContext<AppContext>(APP_CTX);
  const { userDefinedTemplates, selectedLeaf, tree } = state;
  const { customVariables } = state;
  let basicItems = smallComponentsList.map((it) => {
    return {
      name: it.name || (it.nameKey && $l10nString(it.nameKey)) || "<unknown>",
      type: it.type,
      description: it.description,
    };
  });
  $: filteredBasicItems = basicItems.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  let searchText = ""

  const additionalItems = additionalComponentsList.map((it) => {
    return {
      name: it.name || (it.nameKey && $l10nString(it.nameKey)) || "<unknown>",
      type: it.type,
      description: it.description,
    };
  });
  let activeSection : "design"|"assets"|"screens" = "design";

  const extraItems = additionalComponentsList
    .filter((it) => it.type === "input") // Filter items with type 'input'
    .map((it) => {
      return {
        name: it.name || (it.nameKey && $l10nString(it.nameKey)) || "<unknown>",
        type: it.type,
        description: it.description,
      };
    });
  basicItems.concat(extraItems);

  function onDragStart(event: DragEvent, type: string,): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData("application/divnode", `_new:${type}`);
      
      event.dataTransfer.dropEffect = "copy";
    }
  }

  function updateList(list: Variable[]): void {
    state.pushCommand(new ChangeCustomVariablesCommand(state, list));
    $customVariables = list;
    $tree = $tree;
  }

  function onClick(type: string): void {
    console.log("type line 92", type);
    let phoneInput = state.getChild(`_new:_template_input`, true)
    let countryCodeInput = state.getChild(`_new:_template_input`, true)
   
    const newChild = state.getChild(`_new:${type}`, true);
    if (!newChild || !phoneInput || !countryCodeInput) {
      return;
    }
     phoneInput.props.json.hint_text = "Enter phone number"
     
     countryCodeInput.props.json.hint_text = "Enter country code"
     countryCodeInput.props.json.text_variable = "country_code"
     phoneInput.props.json.text_variable = "phone"
    const childType = newChild.props.json.type;
    const childId = newChild.id;
    if (childType === "_template_input" || childType === "select"||childType==="whatsapp_button"||childType==="sms_button"
    ) {
      const variableName = `${childId}_value`;

      const newList = $customVariables.slice();
      if (childType === "_template_input" || childType === "select") {
      newList.push({
        id: state.genVariableId(),
        name: variableName,
        type: "string",
        value: "",
        isInput: true,
      });
    }

      
      if(type==="whatsapp_button" || type==="sms_button"
      ){
        newList.push({
        id: state.genVariableId(),
        name: "phone",
        type: "string",
        value: "",
        isInput: true,
      },{
        id: state.genVariableId(),
        name: "country_code",
        type: "string",
        value: "",
        isInput: true,
      });
      }
      updateList(newList);
      if(childType === "select") {
        newChild.props.json.value_variable = variableName;
      } else {
      newChild.props.json.text_variable = variableName;
    }
  }
    state.pushCommand(
      new AddLeafCommand({
        parentId: $tree.id,
        insertIndex: $tree.childs.length,
        leaf: phoneInput,
      })
    );
    state.pushCommand(
      new AddLeafCommand({
        parentId: $tree.id,
        insertIndex: $tree.childs.length,
        leaf: countryCodeInput,
      })
    );
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
  const handleNavigate = ()=>{
    const page = window.location.pathname.split('/')[1]
    console.log("page", page);
    if(page !== "profileDesign"){
      window.location.href=`${window.location.origin}/home`;
    }
    else
    window.location.href=`${window.location.origin}/home?tab=Profiles`;
  }
  
</script>

<div>
  <div class="header-container">
    <button class="header-logo-button" on:click={handleNavigate}>
      <img src={headerIcon} alt="logo" />
    </button>
   <h6> {localStorage.getItem("currentCampaign") || ""}</h6>
  </div>
  <div class="new-component">
   
    <div class="navbar-container">
      <button on:click={()=>activeSection="design"} class= {activeSection==="design"? "navbar-button-active":"navbar-button-inactive"} >Design</button>
      <button on:click={()=>activeSection="assets"}  class= {activeSection==="assets"? "navbar-button-active":"navbar-button-inactive"}>Assets</button>
      <button on:click={()=>activeSection="screens"}  class= {activeSection==="screens"? "navbar-button-active":"navbar-button-inactive"}>Screens</button>
    </div>
    <!-- <asset-navbar-web-component component-type={"AssetsNavber"}></asset-navbar-web-component> -->
    <!-- <Spoiler2 theme="props"> -->
    <!-- <div slot="title">
        {$l10nString("basicComponents")}
      </div> -->
    {#if activeSection==="assets"}
    <AssetsStore/>
    {/if}
    {#if activeSection==="screens"}
    <Screens/>
    {/if}
    {#if activeSection==="design"}
    <div class="search-wrapper">
      <Text
      placeholder="Search components"
      value={searchText}
      on:change={(e)=>searchText = e.detail.value}
      
      />
     </div>
    <div class="new-component__items">
  
      {#each filteredBasicItems as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="new-component__item"
          draggable="true"
          on:dragstart={(event) => onDragStart(event, item.type)}
          on:click={() => onClick(item.type)}
          title={item.description ? item.description[$lang] : ""}

        >
          <div class="new-component__icon">
            <div
              class="new-component__icon-inner"
              style:background-image="url({encodeBackground(
                state.componentIcon(item.type)
              )})"
            ></div>
          </div>
          <div class="new-component__text">
            {capitalize(item.name || item.type)}
          </div>
        </div>
      {/each}
    </div>
    {/if}
    <!-- </Spoiler2> -->
  
    <!-- <Spoiler2 theme="props" open={false}> -->
    <!-- <div slot="title">
        {$l10nString("additionalComponents")}
      </div> -->
  
    <!-- <div class="new-component__items"> -->
    <!-- {#each additionalItems as item} -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- <div
              class="new-component__item"
              draggable="true"
              on:dragstart={(event) => onDragStart(event, item.type)}
              on:click={() => onClick(item.type)}
              title={item.description ? item.description[$lang] : ""}
            >
              <div class="new-component__icon">
                <div
                  class="new-component__icon-inner"
                  style:background-image="url({encodeBackground(
                    state.componentIcon(item.type)
                  )})"
                ></div>
              </div>
              <div class="new-component__text">
                {capitalize(item.name || item.type)}
              </div>
            </div> -->
    <!-- {/each} -->
    <!-- </div> -->
    <!-- </Spoiler2> -->
  
    <!-- {#if $userDefinedTemplates.length} -->
    <!-- <Spoiler2 theme="props" open={false}> -->
    <!-- <div slot="title">
          {$l10nString("userDefinedComponents")}
        </div> -->
  
    <div class="new-component__items">
      {#each $userDefinedTemplates as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- <div
              class="new-component__item"
              draggable="true"
              on:dragstart={(event) => onDragStart(event, item)}
              on:click={() => onClick(item)}
              title={item}
            >
              <div class="new-component__icon">
                <div
                  class="new-component__icon-inner"
                  style:background-image="url({encodeBackground(
                    state.componentIcon(item)
                  )})"
                ></div>
              </div>
              <div class="new-component__text">
                {item}
              </div>
            </div> -->
      {/each}
    </div>
    <!-- </Spoiler2> -->
    <!-- {/if} -->
  </div>
</div>

<style>

.search-wrapper{
  width: 80%;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.new-component__items {
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
  .new-component__item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0.5rem;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    width: 18%;
    background: var(--fill-transparent-1);}
  .header-logo-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .header-logo-button img {
    display: block;
  }

  
  .header-container {
    border-bottom: 1px solid #ccc;
    padding: 1.2rem 1rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    position: sticky;
    top:0;
    background-color: white;
    z-index: 5;
  }
  .navbar-container {
    border-bottom: 1px solid #ccc;
    padding: 0.7rem;
    display: flex;
    justify-content: left;
    gap: 1rem;
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
  .new-component__icon {
    width: 25px;
    height: 25px;
    border-radius: 10px;
    /* padding: 10px; */
    /* border: 1px solid; */
  }

  .new-component__icon-inner {
    width: 100%;
    height: 100%;
    background: no-repeat 50% 50%;
    background-size: contain;
    filter: var(--icon-filter);
  }

  .new-component__item:hover {
    background: var(--fill-transparent-2);
  }

  .new-component__item:active {
    background: var(--fill-transparent-3);
  }

  .new-component__text {
    box-sizing: border-box;
    max-width: 100%;
    max-height: 20px;
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    line-height: 20px;
  }
</style>
