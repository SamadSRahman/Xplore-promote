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

  const { l10nString, lang } = getContext<LanguageContext>(LANGUAGE_CTX);
  const { state, rendererApi } = getContext<AppContext>(APP_CTX);
  const { userDefinedTemplates, selectedLeaf, tree } = state;

  const basicItems = smallComponentsList.map((it) => {
    return {
      name: it.name || (it.nameKey && $l10nString(it.nameKey)) || "<unknown>",
      type: it.type,
      description: it.description,
    };
  });

  const additionalItems = additionalComponentsList.map((it) => {
    return {
      name: it.name || (it.nameKey && $l10nString(it.nameKey)) || "<unknown>",
      type: it.type,
      description: it.description,
    };
  });
  
  const extraItems = additionalComponentsList
  .filter(it => it.type === "input") // Filter items with type 'input'
  .map(it => {
    return {
      name: it.name || (it.nameKey && $l10nString(it.nameKey)) || "<unknown>",
      type: it.type,
      description: it.description,
    };
  });
  basicItems.concat(extraItems);

  function onDragStart(event: DragEvent, type: string): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData("application/divnode", `_new:${type}`);
      event.dataTransfer.dropEffect = "copy";
    }
  }

  function onClick(type: string): void {
    const newChild = state.getChild(`_new:${type}`, true);
    if (!newChild) {
      return;
    }

    state.pushCommand(
      new AddLeafCommand({
        parentId: $tree.id,
        insertIndex: $tree.childs.length,
        leaf: newChild,
      })
    );

    $selectedLeaf = findLeaf($tree, newChild.id) || null;

    rendererApi().focus();
  }
</script>

<div class="new-component">
  <!-- <Spoiler2 theme="props"> -->
    <!-- <div slot="title"> -->
      <!-- {$l10nString("basicComponents")}
    </div> -->

    <div class="new-component__items">
      {#each basicItems as item}
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
         <div
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
          </div>
        {/each}
      </div>
    <!-- </Spoiler2> -->
  <!-- {/if} -->
</div>

<style>
  .new-component__items {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;
    gap: 20px;
    padding: 10px;
    font-family: "Open Sans", sans-serif;
    justify-content: space-around;
    align-items: center;
  }  .new-component__item {
    display: flex;
    gap: 0px;
    align-items: center;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    width: 100%;
    background: var(--fill-transparent-1);
    /* border: 1px solid; */
  }

  .new-component__icon {
    width: 25px;
    height: 25px;
    border-radius: 10px;
    padding: 10px;
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
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 20px;
  }
</style>
