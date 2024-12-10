<script lang="ts">
    import { getContext } from 'svelte';
    import Select from './Select.svelte';
    import Renderer from './Renderer.svelte';
    import { LANGUAGE_CTX, type LanguageContext } from '../ctx/languageContext';
    import { APP_CTX, type AppContext } from '../ctx/appContext';

    const { l10n, l10nString } = getContext<LanguageContext>(LANGUAGE_CTX);
    const { state } = getContext<AppContext>(APP_CTX);
    const { previewThemeStore } = state;

    const VIEWPORT_LIST = [
        "375x750",
        '320x568',  // iPhone SE
        '360x640',  // Common Android
        '375x667',  // iPhone 6/7/8
        '393x851',  // Pixel 5
        '414x896',  // iPhone XR/11
        '768x1024'  // iPad
    ];

    const DEFAULT_VIEWPORT = '375x750';

    $: viewportList = [
        ...VIEWPORT_LIST,
        'custom'
    ].map(it => ({
        value: it,
        text: it === 'custom' ? $l10n('previewCustomSize') : it
    }));

    let viewport = DEFAULT_VIEWPORT;
    let selectViewport = viewport;
    let viewportWidth = 100;
    let viewportHeight = 100;

    $: if (VIEWPORT_LIST.includes(viewport)) {
        selectViewport = viewport;
    } else {
        selectViewport = 'custom';
    }

    $: {
        [viewportWidth, viewportHeight] = viewport.split('x').map(Number);
    }

    function onViewportSelectChange() {
        if (selectViewport !== 'custom') {
            viewport = selectViewport;
        }
    }

    function onViewportWidthChange(event: CustomEvent<{
        value: string;
    }>): void {
        viewport = `${event.detail.value}x${viewportHeight}`;
    }

    function onViewportHeightChange(event: CustomEvent<{
        value: string;
    }>): void {
        viewport = `${viewportWidth}x${event.detail.value}`;
    }
</script>

<div class="preview-canvas">
    <div class="preview-canvas__topbar">
        <!-- <Select
            bind:value={selectViewport}
            items={viewportList}
            theme="canvas"
            title={$l10nString('previewSize')}
            on:change={onViewportSelectChange}
        /> -->

        {#if selectViewport === 'custom'}
            <div class="preview-canvas__dimensions">
                <input
                    type="number"
                    class="preview-canvas__input"
                    value={viewportWidth}
                    min="100"
                    title={$l10nString('width')}
                    on:input={(e) => onViewportWidthChange(new CustomEvent('change', { 
                        detail: { value: e.currentTarget.value }
                    }))}
                />
                <span class="preview-canvas__dimension-separator">×</span>
                <input
                    type="number"
                    class="preview-canvas__input"
                    value={viewportHeight}
                    min="100"
                    title={$l10nString('height')}
                    on:input={(e) => onViewportHeightChange(new CustomEvent('change', {
                        detail: { value: e.currentTarget.value }
                    }))}
                />
            </div>
        {/if}
    </div>

    <div class="preview-canvas__renderer-wrapper">
        <!-- <Renderer bind:viewport={viewport} theme={$previewThemeStore} /> -->
    </div>
</div>

<style>
    .preview-canvas {
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: 100%;
        padding-bottom: 24px;
        overflow: auto;
        background: var(--background-overflow);
    }

    .preview-canvas__topbar {
        position: sticky;
        z-index: 1;
        top: 0;
        display: flex;
        gap: 12px;
        height: 32px;
        padding: 20px 20px 10px;
        background: var(--background-overflow-transparent);
        align-items: center;
    }

    .preview-canvas__renderer-wrapper {
        display: flex;
        justify-content: center;
        align-items: start;
        flex: 1 1 auto;
        margin-top: 10px;
    }

    .preview-canvas__dimensions {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .preview-canvas__input {
        width: 70px;
        height: 32px;
        padding: 0 8px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background: var(--background-primary);
        color: var(--text-primary);
    }

    .preview-canvas__dimension-separator {
        color: var(--text-secondary);
    }
</style>