<script lang="ts">
    import { createEventDispatcher, getContext } from 'svelte';
    import { LANGUAGE_CTX, type LanguageContext } from '../../ctx/languageContext';
    import type { ComponentProperty } from '../../data/componentProps';
    import MoveList2 from '../controls/MoveList2.svelte';
    import OptionItem from './OptionItem.svelte';
    import type { Option } from '../../data/options';
    import AddButton from '../controls/AddButton.svelte';
    import { APP_CTX, type AppContext } from '../../ctx/appContext';
    import { createOption } from '../../data/options';

    export let value: Option[];
    export let item: ComponentProperty;

    const { l10nString } = getContext<LanguageContext>(LANGUAGE_CTX);
    const { state } = getContext<AppContext>(APP_CTX);
    const { readOnly } = state;

    const dispatch = createEventDispatcher();

    function onChange(): void {
        if (!$readOnly) {
            dispatch('change', {
                item,
                value
            });
        }
    }

    function onAdd(): void {
        if (!$readOnly) {
            dispatch('change', {
                item,
                value: [...(value || []), createOption()]
            });
        }
    }
</script>

<div class="option-prop">
    <div class="option-prop__list">
        <MoveList2
            bind:values={value}
            itemView={OptionItem}
            readOnly={$readOnly}
            on:change={onChange}
            on:reorder={onChange}
        />
    </div>

    {#if !$readOnly}
        <AddButton
            cls="option-prop__add"
            title={$l10nString('add_option')}
            disabled={$readOnly}
            slim
            on:click={onAdd}
        >
        </AddButton>
    {/if}
</div>

<style>
    .option-prop__list {
        margin-left: -20px;
    }
</style>