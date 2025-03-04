<script lang="ts">
    import { getContext, onDestroy, onMount } from 'svelte';
    import { combineRanges } from '../data/highlightChannel';
    import type { createEditor } from '../data/editor';
    import { APP_CTX, type AppContext } from '../ctx/appContext';
    import { SetJsonCommand } from '../data/commands/setJson';
    import { writable } from 'svelte/store';
  import { updateLayout } from '../utils/svelteUtils';

    // A simple debounce function
    function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
        let timeout: ReturnType<typeof setTimeout>;
        return function(...args: Parameters<T>) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    let node: HTMLElement;
    let editor: ReturnType<typeof createEditor> | undefined;
    let isSelfClick = false;
    let prevVal = '';

    // Writable store for JSON content
    const jsonContent = writable('');

    const { editorFabric, shadowRoot, state } = getContext<AppContext>(APP_CTX);
        
    const {
        divjsonStore,
        selectedLeaf,
        highlightLeaf,
        highlightElem,
        highlightRanges,
        selectedRanges,
        highlightLoc,
        readOnly,
        themeStore
    } = state;

    // Define the API call function
    async function callApi(json: string) {
        console.log("Api call triggered");
        const layoutId = localStorage.getItem("layoutId")
        const screenName = window.location.pathname.split("/")[3]
        console.log("screen name", screenName);
        
        await updateLayout(layoutId, json, screenName)
        // try {
        //     const parsedJson = JSON.parse($jsonContent);
        //     console.log('Valid JSON:', parsedJson);
        //     // Call the debounced API function
        //     debouncedCallApi($jsonContent);
        // } catch (error) {
        //     console.error('Invalid JSON:', error);
        // }
    }

    // Create a debounced version of the API call (500ms delay)
    const debouncedCallApi = debounce(callApi, 500);

    $: if (prevVal !== $divjsonStore.fullString && !editor?.isFocused()) {
        editor?.setValue($divjsonStore.fullString);
        jsonContent.set($divjsonStore.fullString);
    }
    
    $: if ($jsonContent) {
        // This will trigger whenever jsonContent changes
        console.log('JSON content changed:', $jsonContent);
        
        // Add your custom validation/checking logic here
        try {
            const parsedJson = JSON.parse($jsonContent);
            console.log('Valid JSON:', parsedJson);
            // Call the debounced API function
            debouncedCallApi($jsonContent);
        } catch (error) {
            console.error('Invalid JSON:', error);
        }
    }

    $: editor?.setTheme($themeStore);
    $: editor?.setReadOnly($readOnly);
    $: editor?.decorateRanges(combineRanges($highlightRanges, $selectedRanges));
    $: if ($highlightLoc) {
        if (isSelfClick) {
            isSelfClick = false;
        } else {
            editor?.revealLoc($highlightLoc);
        }
    }

    onMount(() => {
        editor = editorFabric({
            node,
            value: $divjsonStore.fullString,
            theme: $themeStore,
            readOnly: $readOnly,
            shadowRoot,
            onChange(value) {
                if (value !== $divjsonStore.fullString) {
                    let json;
                    try {
                        json = JSON.parse(value);
                    } catch (err) {}
                    if (json) {
                        prevVal = value;
                        state.pushCommand(new SetJsonCommand(state, value));
                        // Update the jsonContent store
                        jsonContent.set(value);
                    }
                }
            },
            onOver(offset) {
                const leaf = offset === null ? null : state.findBestLeaf(offset);
                const range = leaf?.props.range;
                const node = leaf?.props.node;
                if (range && node) {
                    highlightLeaf.set([leaf]);
                    highlightElem.set([node]);
                    highlightRanges.set([range]);
                } else {
                    highlightLeaf.set(null);
                    highlightElem.set(null);
                    highlightRanges.set(null);
                }
            },
            onClick(offset) {
                const leaf = state.findBestLeaf(offset);
                isSelfClick = true;
                selectedLeaf.set(leaf || null);
            }
        });

        // Initialize the jsonContent store with the initial value
        jsonContent.set($divjsonStore.fullString);
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy();
            editor = undefined;
        }
    });

    // Optional: Function to get the current JSON content
    function getJsonContent() {
        return $jsonContent;
    }
</script>

<div class="text-editor" bind:this={node} />

<style>
    .text-editor {
        flex: 1 1 auto;
        white-space: pre;
        overflow: auto;
        min-height: 0;
        width: 0;
        min-width: 100%;
        margin-top: 12px;
        font-size: 80%;
    }

    :global(.cm-highlight) {
        background: var(--fill-transparent-1);
    }

    :global(.cm-select) {
        background: var(--fill-transparent-2);
    }
</style>
