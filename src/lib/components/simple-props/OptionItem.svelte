<script lang="ts">
    import { afterUpdate, createEventDispatcher, getContext } from 'svelte';
    import type { Option } from '../../data/options';
    import { LANGUAGE_CTX, type LanguageContext } from '../../ctx/languageContext';
    import { APP_CTX, type AppContext } from '../../ctx/appContext';

    export let value: Option;

    const { l10nString } = getContext<LanguageContext>(LANGUAGE_CTX);
    const { state } = getContext<AppContext>(APP_CTX);
    const { readOnly } = state;

    const dispatch = createEventDispatcher();

    let textInputElem: HTMLInputElement;
    let valueInputElem: HTMLInputElement;
    let isSelfUpdate = false;

    function updateInputs(): void {
        if (isSelfUpdate || textInputElem === document.activeElement || valueInputElem === document.activeElement) {
            return;
        }
    }

    function rebuildVal(): void {
        if (!isSelfUpdate) {
            isSelfUpdate = true;
            dispatch('change');
        }
    }

    $: updateInputs(value);

    afterUpdate(() => {
        if (isSelfUpdate) {
            isSelfUpdate = false;
        }
    });
</script>

<div
    class="option-item"
    class:option-item_readonly={$readOnly}
>
    <input
        class="option-item__input"
        type="text"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        bind:this={textInputElem}
        bind:value={value.text}
        on:input={rebuildVal}
        disabled={$readOnly}
        placeholder={$l10nString('option.text_placeholder')}
        title={$l10nString('option.text_title')}
    >

    <div class="option-item__separator"></div>

    <input
        class="option-item__input"
        type="text"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        bind:this={valueInputElem}
        bind:value={value.value}
        on:input={rebuildVal}
        disabled={$readOnly}
        placeholder={$l10nString('option.value_placeholder')}
        title={$l10nString('option.value_title')}
    >
</div>

<style>
    .option-item {
        position: relative;
        display: flex;
        border: 1px solid var(--fill-transparent-3);
        border-radius: 8px;
        background-color: var(--background-primary);
        transition: border-color .15s ease-in-out;
    }

    .option-item_readonly {
        border: none;
        background: var(--fill-transparent-1);
    }

    .option-item:not(.option-item_readonly):hover {
        border-color: var(--fill-transparent-4);
    }

    .option-item:not(.option-item_readonly):focus-within {
        border-color: var(--accent-purple);
    }

    .option-item__input {
        flex: 1 1 auto;
        min-width: 0;
        margin: 0;
        padding: 0 15px;
        font: inherit;
        font-size: 14px;
        line-height: 38px;
        color: inherit;
        background: none;
        border: none;
        appearance: none;
    }

    .option-item__input:focus {
        outline: none;
    }

    .option-item__separator {
        width: 1px;
        margin: 9px 0;
        background: var(--fill-transparent-3);
    }
</style>