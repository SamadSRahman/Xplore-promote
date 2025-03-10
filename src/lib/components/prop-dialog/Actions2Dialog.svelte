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
  import { sub } from "date-fns";

  const { l10n, lang } = getContext<LanguageContext>(LANGUAGE_CTX);
  const { state } = getContext<AppContext>(APP_CTX);
  const { customActions } = state;

  $: if (isShown && !readOnly && callback) {
    if (!value.log_url) {
      delete value.log_url;
    }
    callback(value);
  }
  let updatedScreens: { text: string; value: string }[] = [];
  interface screen {
    name: string;
    path: string;
  }

  $: {
    const screens = JSON.parse(localStorage.getItem("screens") || "[]");
    console.log("screens", screens);

    updatedScreens = screens
      .filter((screen: screen) => screen.path !== "splash_screen")
      .map((screen: screen) => ({
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
  let value: Action = { model_name: "", url: "" } as Action;
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
        // Special handling for screen ID parameter
        if (arg.desc.name === "id") {
          return `xplore-promote://open?screen_name=${value}`;
        }
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
    } else if (subtype === "webLink") {
      value.url = "xplore-promote://webLink";
      value.webUrl = "";
    } else if (subtype === "share") {
      value.url = "xplore-promote://share";
      value.attachmentUrl = "";
    } else if (subtype === "chatbot") {
      value.url = "xplore-promote://chatbot";
      value.model_name = "";
      value.name = "";
      // value.attachmentUrl = "";
    } else if (subtype === "camera") {
      value.url = "xplore-promote://camera";
      value.screen_name = "";
      // value.attachmentUrl = "";
    } else if (subtype === "email") {
      value.url = "xplore-promote://emailAddress";
      value.email = ""; // Add email field to value
    } else if (subtype === "phone") {
      value.url = "xplore-promote://phoneNumber";
      value.phone = ""; // Add phone field to value
    } else if (subtype === "social") {
      value.url = "xplore-promote://socialMedia";
      value.socialPlatform = ""; // Add platform selection
      value.socialProfile = ""; // Add profile URL field
    } else if (subtype === "map") {
      value.url = "xplore-promote://map";
      value.latitude = 0;
      value.longitude = 0;
    } else if (subtype === "backBtn") {
      value.url = "xplore-promote://backBtn"; // Default backBtn URL
      actionArgs = [
        {
          value: "",
          desc: {
            name: "screen_name",
            text: { en: "Select screen to go back to" },
            type: "string",
          },
        },
      ];
    } else if (subtype === "contact") {
      value.url = "xplore-promote://contact?screen_name=contact_us_screen";
      value.interested_product = "";
    } else if (subtype === "productDetails") {
      value.url = "xplore-promote://productDetails";
      actionArgs = [
        {
          value: "",
          desc: {
            name: "screen_name",
            text: { en: "Select screen to open" },
            type: "string",
          },
        },
      ];
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

  function onArgChange(index: number): void {
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

  const socialPlatforms = [
    { value: "linkedIn", text: "LinkedIn" },
    { value: "twitter", text: "Twitter" },
    { value: "facebook", text: "Facebook" },
    { value: "instagram", text: "Instagram" },
  ];

  function onWebLinkChange(): void {
    if (value.webUrl) {
      value.url = `xplore-promote://webLink?webUrl=${value.webUrl}`;
      value.log_url = value.webUrl;
    }
  }
  function onShareChange(): void {
    console.log(value);

    if (value.attachmentUrl) {
      value.url = `xplore-promote://share?attachment_link=${value.attachmentUrl}`;
    }
  }
  function onEmailChange(): void {
    if (value.email) {
      value.url = `xplore-promote://emailAddress?email=${encodeURIComponent(value.email)}`;
      value.log_url = value.url;
    }
  }

  function onPhoneChange(): void {
    if (value.phone) {
      value.url = `xplore-promote://phoneNumber?phone=${encodeURIComponent(value.phone)}`;
      value.log_url = value.url;
    }
  }

  function onSocialChange(): void {
    if (value.socialPlatform && value.socialProfile) {
      value.url = `xplore-promote://socialMedia?${value.socialPlatform}=${value.socialProfile}`;
      value.log_url = value.url;
    }
  }
  $: types = [
    {
      value: "url",
      text: $l10n("actions-url"),
    },
    { value: "submit-form", text: "Submit" },
    { value: "camera", text: "Camera" },
    { value: "backBtn", text: "Back" },
    { value: "map", text: "Open Map" },
    { value: "contact", text: "Contact" },
    { value: "productDetails", text: "Product Details" },
    { value: "email", text: "Email" },
    { value: "phone", text: "Phone" },
    { value: "social", text: "Social links" },
    { value: "webLink", text: "Web link" },
    { value: "share", text: "Share" },
    { value: "chatbot", text: "Chatbot" },
    { value: "whatsapp-login", text: "WhatsApp Login" },
    { value: "sms-integration", text: "SMS Login" },
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
    if (storedVars && Array.isArray(storedVars)) {
      variables = storedVars.map((variable) => ({
        text: variable.name,
        value: variable.name,
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
    const variableParams = selectedVars.map((v) => `${v}=@{${v}}`).join("&");
    const screenParam = value.screen_name
      ? `&screen_name=${value.screen_name}`
      : "";
    value.url = `xplore-promote://submit?${variableParams}${screenParam}`;
    value.log_url = value.url;
  }

  function onScreenChange(screenName: string): void {
    value.screen_name = screenName;
    const variableParams =
      value.selected_variables?.map((v: string) => `${v}=@{${v}}`).join("&") ||
      "";
    value.url = `xplore-promote://submit?${variableParams}&screen_name=${screenName}`;
    value.log_url = value.url;
  }

  function onMapCoordinatesChange(): void {
    console.log("line 183", value.latitude, value.longitude);
    if (value.latitude && value.longitude) {
      value.url = `xplore-promote://map?lat=${value.latitude}&lng=${value.longitude}`;
      value.log_url = value.url;
    }
  }

  function onProductChange(): void {
    if (value.interested_product) {
      value.url = `xplore-promote://contact?screen_name=contact_us_screen&interested_product=${value.interested_product}`;
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
      {:else if subtype === "webLink"}
        <div>
          <label for="webUrl">
            <div class="actions2-dialog__label">Web URL</div>
          </label>
          <Text
            id="webUrl"
            bind:value={value.webUrl}
            disabled={readOnly}
            on:change={onWebLinkChange}
          />
        </div>
      {:else if subtype === "share"}
        <div>
          <label>
            <div class="actions2-dialog__label">Attachment URL</div>
            <Text
              bind:value={value.attachmentUrl}
              disabled={readOnly}
              on:change={onShareChange}
            />
          </label>
          <label>
            <div class="actions2-dialog__label">Url</div>
            <Text
              bind:value={value.url}
              disabled={readOnly}
              on:change={onWebLinkChange}
            />
          </label>
        </div>
      {:else if subtype === "contact"}
        <div>
          <label>
            <div class="actions2-dialog__label">Interested Product</div>
            <Text
              bind:value={value.interested_product}
              disabled={readOnly}
              on:change={onProductChange}
            />
          </label>
        </div>
      {:else if subtype === "submit-form"}
        <div>
          <label>
            <div class="actions2-dialog__label">Select Variables</div>
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
        <div>
          <label>
            <div class="actions2-dialog__label">
              Select Screen to Navigate after Submit
            </div>
            <Select
              items={updatedScreens}
              bind:value={value.screen_name}
              theme="normal"
              size="medium"
              disabled={readOnly}
              on:change={(e) => onScreenChange(e.detail)}
            />
          </label>
        </div>
      {:else if subtype === "email"}
        <div>
          <label>
            <div class="actions2-dialog__label">Email Address</div>
            <Text
              bind:value={value.email}
              disabled={readOnly}
              on:change={onEmailChange}
            />
          </label>
        </div>
      {:else if subtype === "phone"}
        <div>
          <label>
            <div class="actions2-dialog__label">Phone Number</div>
            <Text
              bind:value={value.phone}
              disabled={readOnly}
              on:change={onPhoneChange}
            />
          </label>
        </div>
      {:else if subtype === "social"}
        <div>
          <label>
            <div class="actions2-dialog__label">Social Platform</div>
            <Select
              items={socialPlatforms}
              bind:value={value.socialPlatform}
              theme="normal"
              size="medium"
              disabled={readOnly}
              on:change={onSocialChange}
            />
          </label>
        </div>
        <div>
          <label>
            <div class="actions2-dialog__label">Profile URL</div>
            <Text
              bind:value={value.socialProfile}
              disabled={readOnly}
              on:change={onSocialChange}
            />
          </label>
        </div>
      {:else if subtype === "map"}
        <div>
          <label>
            <div class="actions2-dialog__label">Latitude</div>
            <Text
              bind:value={value.latitude}
              disabled={readOnly}
              on:change={onMapCoordinatesChange}
            />
          </label>
        </div>
        <div>
          <label>
            <div class="actions2-dialog__label">Longitude</div>
            <Text
              bind:value={value.longitude}
              disabled={readOnly}
              on:change={onMapCoordinatesChange}
            />
          </label>
        </div>
      {:else if subtype === "backBtn"}
        <div>
          <label>
            <div class="actions2-dialog__label">
              Select screen to go back to
            </div>
            <Select
              items={updatedScreens}
              bind:value={value.url}
              theme="normal"
              size="medium"
              disabled={readOnly}
              on:change={(e) => {
                value.url = `xplore-promote://backBtn?screen_name=${e.detail}`;
                value.log_url = value.url;
              }}
            />
          </label>
        </div>
      {:else if subtype === "chatbot"}
        <div>
          <label for="chatbot_name">
            <div class="actions2-dialog__label">Name</div>
            <Text
              bind:value={value.name}
              id="chatbot_name"
              on:change={(e) => {
                value.url = `xplore-promote://chatbot?adapter_name=${value.model_name}&&chatbot_name=${e.detail}`;
                value.log_url = value.url;
              }}
            />
          </label>
          <label for="adapter_name">
            <div class="actions2-dialog__label">Select adapter for chatbot</div>
            <Select
              items={[
                { value: "adapter1", text: "Adapter 1" },
                { value: "adapter2", text: "Adapter 2" },
                { value: "adapter3", text: "Adapter 3" },
              ]}
              bind:value={value.model_name}
              theme="normal"
              size="medium"
              disabled={readOnly}
              on:change={(e) => {
                value.url = `xplore-promote://chatbot?adapter_name=${e.detail}&&chatbot_name=${value.name}`;
                value.log_url = value.url;
              }}
            />
          </label>

          <label for="action_url">
            <div class="actions2-dialog__label">Action URL</div>
            <Text id="action_url" bind:value={value.url} disabled={true} />
          </label>
        </div>
      {:else if subtype === "camera"}
        <div>
          <label>
            <div class="actions2-dialog__label">
              Select screen to redirect after capturing image
            </div>
            <Select
              items={updatedScreens}
              bind:value={value.screen_name}
              theme="normal"
              size="medium"
              disabled={readOnly}
              on:change={(e) => {
                value.url = `xplore-promote://camera?screen_name=${e.detail}`;
                value.log_url = value.url;
              }}
            />
          </label>
          <label>
            <div class="actions2-dialog__label">Action URL</div>
            <Text bind:value={value.url} disabled={true} />
          </label>
        </div>
      {:else if subtype === "productDetails"}
        <div>
          <label for="screens">
            <div class="actions2-dialog__label">Select screen to open</div>
            <Select
              items={updatedScreens}
              bind:value={value.url}
              theme="normal"
              size="medium"
              disabled={readOnly}
              on:change={(e) => {
                value.url = `xplore-promote://productDetails?screen_name=${e.detail}`;
                value.log_url = value.url;
              }}
            />
          </label>
        </div>
      {:else if subtype === "whatsapp-login"}
        <div>
          <label for="function">
            <div class="actions2-dialog__label">Select function</div>
            <Select
              items={[
                { value: "getOtp", text: "Get OTP" },
                { value: "verifyOtp", text: "Verify OTP" },
              ]}
              bind:value={value.function}
              theme="normal"
              size="medium"
              disabled={readOnly}
              on:change={(e) => {
                value.url = `xplore-promote://whatsappOtpIntegration/${e.detail}${value.function==="verifyOtp"?"?otp=@{otp_value}":"?phone=@{phone}&country_code=@{country_code}"}`;
                value.log_url = value.function;
              }}
            />
          </label>
            {#if value.function==="verifyOtp"}
            <div>
              <label>
                <div class="actions2-dialog__label">
                  Select screen to redirect after OTP verification
                </div>
                <Select
                  items={updatedScreens}
                  bind:value={value.screen_name}
                  theme="normal"
                  size="medium"
                  disabled={readOnly}
                  on:change={(e) => {
                  value.url = `xplore-promote://whatsappOtpIntegration/${value.function==="verifyOtp"?`?otp=@{otp_value}&screen_name=${e.detail}`:"?phone=@{phone}&country_code=@{country_code}"}`;
                  value.log_url = value.url;
                  }}
                />
              </label>
            </div>
            {/if}
          <label for="url">
            <div class="actions2-dialog__label">URL</div>
            <Text
              id="webUrl"
              value={`xplore-promote://whatsappOtpIntegration/${value.function}${value.function==="verifyOtp"?`?otp=@{otp_value}&screen_name=${value.screen_name}`:"?phone=@{phone}&country_code=@{country_code}"}`}
              disabled={true}
            />
          </label>
        </div>
      {:else if subtype === "sms-integration"}
        <div class="actions-field-container">
          <label for="service">
            <div class="actions2-dialog__label">Select service</div>
            <Select
              items={[
                { value: "twillo", text: "Twillo" },
                { value: "kaleyra", text: "Kaleyra" },
              ]}
              bind:value={value.service}
              theme="normal"
              size="medium"
              disabled={readOnly}
              on:change={(e) => {
                value.url = `xplore-promote://smsIntegration/${value.function}?provider=${e.detail}${value.function==="verifyOtp"?"&otp=@{otp_value}":"&phone=@{phone}&country_code=@{country_code}"}`;
                value.log_url = value.service;
              }}
            />
          </label>
          <label for="function">
            <div class="actions2-dialog__label">Select function</div>
            <Select
              items={[
                { value: "getOtp", text: "Get OTP" },
                { value: "verifyOtp", text: "Verify OTP" },
              ]}
              bind:value={value.function}
              theme="normal"
              size="medium"
              disabled={readOnly}
              on:change={(e) => {
                value.url = `xplore-promote://smsIntegration/${e.detail}?provider=${value.service}${value.function==="verifyOtp"?"&otp=@{otp_value}":"&phone=@{phone}&country_code=@{country_code}"}`;
                value.log_url = value.function;
                value.function = e.detail;
                value.otp = "@{otp_value}"
                value.phone = "@{phone}"
                value.country_code = "@{country_code}"
              }}
            />
          </label>
          {#if value.function==="verifyOtp"}
          <div>
            <label>
              <div class="actions2-dialog__label">
                Select screen to redirect after OTP verification
              </div>
              <Select
                items={updatedScreens}
                bind:value={value.screen_name}
                theme="normal"
                size="medium"
                disabled={readOnly}
                on:change={(e) => {
                value.url = `xplore-promote://smsIntegration/${value.service}?provider=${value.service}${value.function==="verifyOtp"?`&otp=@{otp_value}&screen_name=${value.screen_name}`:"&phone=@{phone}&country_code=@{country_code}"}`;
                value.log_url = value.url;
                }}
              />
            </label>
          </div>
          {/if}
          <label for="url">
            <div class="actions2-dialog__label">URL</div>
            <Text
              id="webUrl"
              value={`xplore-promote://whatsappOtpIntegration/${value.function}?provider=${value.service}${value.function==="verifyOtp"?`&otp=@{otp_value}&screen_name=${value.screen_name}`:"&phone=@{phone}&country_code=@{country_code}"}`}
              disabled={true}
              
            />
          </label>
        </div>
      {:else if actionArgs.length}
        {#each actionArgs as arg, index}
          <div>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>
              <!-- {arg.desc.text[$lang] || arg.desc.name} -->
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
      <!-- <div> -->
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <!-- <label>
          <div class="actions2-dialog__label">
            {$l10n("actions-log-id")}
          </div>
          <Text bind:value={value.log_id} disabled={readOnly} />
        </label>
      </div> -->

      <!-- <div> -->
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <!-- <label>
          <div class="actions2-dialog__label">
            {$l10n("actions-log-url")}
          </div>
          <Text bind:value={value.log_url} disabled={readOnly} />
        </label>
      </div> -->
    </div>
  </ContextDialog>
{/if}

<style>
  .actions2-dialog__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 16px;
    /* border: 1px solid; */
    height: 20rem;
  }

  .actions2-dialog__label {
    margin-bottom: 6px;
    margin-top: 6px;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-secondary);
  }
  .actions-field-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
