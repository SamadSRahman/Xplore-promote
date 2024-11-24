<script lang="ts">
  import { getContext } from "svelte";
  import type { Action } from "@divkitframework/divkit/typings/common";
  import {
    LANGUAGE_CTX,
    type LanguageContext,
  } from "../../ctx/languageContext";
  import Select from "../Select.svelte";
  import Text from "../controls/Text.svelte";
  import ContextDialog from "./ContextDialog.svelte";
  import { parseAction, type ArgResult } from "../../data/actions";
  import {
    APP_CTX,
    type Actions2DialogShowProps,
    type AppContext,
  } from "../../ctx/appContext";
  import type { ActionDesc } from "../../../lib";

  const { l10n, lang } = getContext<LanguageContext>(LANGUAGE_CTX);
  const { state } = getContext<AppContext>(APP_CTX);
  const { customActions } = state;

  $: if (isShown && !readOnly && callback) {
    if (!value.log_url) {
      delete value.log_url;
    }
    callback(value);
  }
  let updatedScreens = [];
  interface screen{
    name: string;
    path: string;
  }

$: {
    const screens = JSON.parse(localStorage.getItem("screens") || "[]");
    updatedScreens = screens.map((screen: screen) => ({
        text: screen.name,
        value: screen.path,
    }));
}

  export function show(props: Actions2DialogShowProps): void {
    callback = props.callback;
    target = props.target;
    value = props.value;
    readOnly = props.readOnly;
    isShown = true;
    const parsed = parseAction(props.value?.url, $customActions);
    subtype = parsed.type;
    customDesc = parsed.desc;
    actionArgs = parsed.args || [];
  }

  export function hide(): void {
    isShown = false;
  }

  let target: HTMLElement;
  let subtype = "url";
  let actionArgs: ArgResult[] = [];
  let isShown = false;
  let value: Action;
  let callback: ((val: Action) => void) | undefined;
  let readOnly: boolean | undefined;
  let customDesc: ActionDesc | undefined;

  function onClose(): void {
    isShown = false;
  }

  interface variables {
    value: string;
    text: string;
  }
  function customActionToUrl(desc: ActionDesc, args: ArgResult[]): string {
    const searchParams = new URLSearchParams();
    for (const arg of args) {
      const value = arg.value;
      if (value) {
        searchParams.set(arg.desc.name, value);
      }
    }
    return (
      desc.baseUrl + (searchParams.size ? "?" + searchParams.toString() : "")
    );
  }

function onSubtypeChange(): void {
    if (subtype === "submit-form") {
        value.url = "submit-form";
        if (!value.selected_variables) {
            value.selected_variables = [];
        }
    } else if (subtype === "map") {
        value.url = "xplore-promote://map";  // Default map URL
        value.latitude = "";
        value.longitude = "";
    } else {
        customDesc = subtype.startsWith("custom:")
            ? $customActions[Number(subtype.split(":")[1])]
            : undefined;

        if (customDesc) {
            value.url = customActionToUrl(customDesc, []);
            actionArgs =
                customDesc.args?.map((desc) => {
                    return {
                        value: "",
                        desc,
                    };
                }) || [];
        } else {
            actionArgs = [];
        }
    }
}

  function onArgChange(): void {
    console.log(
      "line 79",
      customDesc,
      actionArgs,
      customActionToUrl(customDesc, actionArgs)
    );

    if (!customDesc) {
      return;
    }

    value.url = customActionToUrl(customDesc, actionArgs);
  }
let selectedVariables: string[] = [];
  // $: types = [{
  //     value: 'url',
  //     text: $l10n('actions-url')
  // }]  // Action list removed

  $: types = [
    {
      value: "url",
      text: $l10n("actions-url"),
    },
    { value: "submit-form", text: "Submit" },
    { value: "map", text: "Open Map" },  // Add map option
  ].concat(
    $customActions.map((actionDesc, i) => ({
      value: `custom:${i}`,
      text: actionDesc.text[$lang] || actionDesc.baseUrl,
    }))
  );

  interface Variable {
    name: string;
  }

  let variables: variables[] = [];
  $: {
    const storedVars = (() => {
      try {
        const stored = localStorage.getItem("variables");
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.warn("Error parsing variables from localStorage:", e);
        return [];
      }
    })() as Variable[];
    console.log("line 153", storedVars);
    if (storedVars && Array.isArray(storedVars)) {
      variables = storedVars.map((variable) => ({
        text: variable.name,
        value: variable.name
      }));
      console.log("Variables after mapping:", variables);
    } else {
      console.warn("storedVars is not an array:", storedVars);
      variables = [];
    }
  }
  function onVariableChange(selectedVars: string[]): void {
    console.log("line 170", selectedVars);
    value.selected_variables = selectedVars;
    const variableParams = selectedVars.map(v => `${v}=@{${v}}`).join('&');
    value.url = `xplore-promote://submit?${variableParams}`;
    value.log_url = value.url; // Set the log_url to match the url
  }

console.log("line 164", variables);

function onMapCoordinatesChange(): void {
  console.log("line 183", value.latitude, value.longitude);
    if (value.latitude && value.longitude) {
        value.url = `xplore-promote://map?lat=${value.latitude}&lng=${value.longitude}`;
        value.log_url = value.url;
    }
}
</script>

{#if isShown && target}
  <ContextDialog {target} on:close={onClose} canMove={true}>
    <div class="actions2-dialog__content">
      <Select
        items={types}
        bind:value={subtype}
        theme="normal"
        size="medium"
        disabled={readOnly}
        on:change={onSubtypeChange}
      />

      {#if subtype === "url"}
        <div>
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label>
            <div class="actions2-dialog__label">
              {$l10n("actions-url")}
            </div>
            <Text bind:value={value.url} disabled={readOnly} />
          </label>
        </div>
      {:else if subtype === "submit-form"}
        <div>
          <label>
            <div class="actions2-dialog__label">
              Select Variables
            </div>
            <Select
              items={variables}
              bind:value={selectedVariables}
              theme="normal"
              size="medium"
              disabled={readOnly}
              multiple={true}
              on:change={(e) => onVariableChange(e.detail)}
            />
          </label>
        </div>
      {:else if subtype === "map"}
        <div>
          <label>
            <div class="actions2-dialog__label">
              Latitude
            </div>
            <Text bind:value={value.latitude} disabled={readOnly} on:change={onMapCoordinatesChange} />
          </label>
        </div>
        <div>
          <label>
            <div class="actions2-dialog__label">
              Longitude
            </div>
            <Text bind:value={value.longitude} disabled={readOnly} on:change={onMapCoordinatesChange} />
          </label>
        </div>
      {:else if actionArgs.length}
        {#each actionArgs as arg, index}
          <div>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>
              {arg.desc.text[$lang] || arg.desc.name}
              <div class="actions2-dialog__label">
                {(arg.desc.text[$lang] || arg.desc.name) === "ID"
                  ? "Select screen to open"
                  : arg.desc.text[$lang] || arg.desc.name}
              </div>
              
              <!-- Conditional Select or Text Input based on argument type -->
              {#if (arg.desc.text[$lang] || arg.desc.name) === "ID"}
                <!-- Dropdown for selecting screen names when argument is 'ID' -->
               
                <Select
                  items={updatedScreens}
                  bind:value={arg.value}
                  theme="normal"
                  size="medium"
                  disabled={readOnly}
                  on:change={() => onArgChange(index)}
                />
              {:else}
                <!-- Text input for other types of arguments -->
                <Text
                  bind:value={arg.value}
                  disabled={readOnly}
                  on:change={() => onArgChange(index)}
                />
              {/if}
            </label>
          </div>
        {/each}
      {/if}
      <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>
          <div class="actions2-dialog__label">
            {$l10n("actions-log-id")}
          </div>
          <Text bind:value={value.log_id} disabled={readOnly} />
        </label>
      </div>

      <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>
          <div class="actions2-dialog__label">
            {$l10n("actions-log-url")}
          </div>
          <Text bind:value={value.log_url} disabled={readOnly} />
        </label>
      </div>
    </div>
  </ContextDialog>
{/if}

<style>
  .actions2-dialog__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 16px;
  }

  .actions2-dialog__label {
    margin-bottom: 6px;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-secondary);
  }

  .map-inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-group input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .url-preview {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #666;
    word-break: break-all;
  }
</style>
