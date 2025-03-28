<script lang="ts" context="module">
    const ITEM_SCROLL_OFFSET = 32;
</script>

<script lang="ts">
    import { createEventDispatcher, getContext, setContext, tick } from 'svelte';
    import { writable } from 'svelte/store';
    import TreeLeafView from './TreeLeaf.svelte';
    import type { TreeContext, TreeDragTarget, TreeGetText, TreeLeaf } from '../ctx/tree';
    import { TREE_CTX } from '../ctx/tree';
    import { findLeaf, treeLeafContains } from '../utils/tree';
    import { treeUp, deleteComponent, treeDown, treeLeft, treeRight, copy, paste } from '../utils/keybinder/shortcuts';
    import { AddLeafCommand } from '../data/commands/addLeaf';
    import { MoveLeafCommand } from '../data/commands/moveLeaf';
    import { APP_CTX, type AppContext } from '../ctx/appContext';
  import type { Variable } from '../data/customVariables';
  import { ChangeCustomVariablesCommand } from '../data/commands/changeCustomVariables';

    export let showRoot = true;
    export let getText: TreeGetText;
    export let highlightLeafs: TreeLeaf[] | null = null;

    export function focus(): void {
        if (rootNode) {
            rootNode.focus();
        }
    }

    
    const { state, rendererApi } = getContext<AppContext>(APP_CTX);
    const { tree, copiedLeaf, selectedLeaf, readOnly, customVariables } = state;

    let rootNode: HTMLElement;

    let prevSelectedLeaf: TreeLeaf | null = null;
    const collapsedStore = writable<Record<string, boolean>>({});
    const highlightStore = writable<TreeLeaf[] | null>(null);
    const dragTarget = writable<TreeDragTarget | null>(null);
    const childMap = new Map();

    const dispatch = createEventDispatcher();

    $: {
        $highlightStore = highlightLeafs;
    }

    $: linearList = linearize($tree, $collapsedStore);

    function linearize(tree: TreeLeaf | null, collapsed: Record<string, boolean>): TreeLeaf[] {
        const res: TreeLeaf[] = [];

        function proc(leaf: TreeLeaf | null): void {
           
            if (!leaf) {
                return;
            }

            if (leaf !== tree || showRoot) {
                res.push(leaf);
            }

            if (!collapsed[leaf.id]) {
                leaf.childs.forEach(proc);
            }
        }

        proc(tree);

        return res;
    }

    function getCurrentSelection(): number {
        const selected = $selectedLeaf;
        return selected ? linearList.findIndex(it => it === selected) : -1;
    }

    function setKeyboardSelection(index: number): void {
        const leaf = linearList[index];
        if (leaf !== $selectedLeaf) {
            selectedLeaf.set(leaf);

            dispatch('keyboardhover', leaf);
        }
    }

    function moveSelection(change: number): void {
        let current = getCurrentSelection();

        if (current === -1) {
            current = change === -1 ? 0 : linearList.length - 1;
        } else {
            current += change;
            if (current >= linearList.length) {
                current = linearList.length - 1;
            } else if (current < 0) {
                current = 0;
            }
        }

        setKeyboardSelection(current);
    }

    function moveSelectionToNearby(index: number): void {
        if (index >= linearList.length) {
            index = linearList.length - 1;
        } else if (index < 0) {
            index = 0;
        }

        setKeyboardSelection(index);
    }

    function collapseOrMoveToParent(): void {
        const current = $selectedLeaf;

        if (!current) {
            return;
        }

        const collapsed = $collapsedStore;
        if (collapsed[current.id] || !current.childs.length) {
            if (current.parent) {
                selectedLeaf.set(current.parent);
            }
        } else {
            collapsedStore.set({
                ...collapsed,
                [current.id]: true
            });
        }
    }

    function expandOrMoveToChild(): void {
        const current = $selectedLeaf;

        if (!current) {
            return;
        }

        const collapsed = $collapsedStore;
        if (collapsed[current.id]) {
            collapsedStore.set({
                ...collapsed,
                [current.id]: false
            });
        } else if (current.childs.length) {
            selectedLeaf.set(current.childs[0]);
        }
    }

    function onKeydown(event: KeyboardEvent): void {
        if (treeUp.isPressed(event) || treeDown.isPressed(event)) {
            moveSelection(treeUp.isPressed(event) ? -1 : 1);
        } else if (treeLeft.isPressed(event)) {
            collapseOrMoveToParent();
        } else if (treeRight.isPressed(event)) {
            expandOrMoveToChild();
        } else if (deleteComponent.isPressed(event) && !$readOnly) {
            const leaf = $selectedLeaf;
            if (leaf?.parent) {
                const current = getCurrentSelection();
                state.deleteLeaf(leaf);
                tick().then(() => {
                    moveSelectionToNearby(current);
                });
            }
        } else if (copy.isPressed(event) && $selectedLeaf) {
            // Set in memory
            copiedLeaf.set($selectedLeaf);
            
            // Use system clipboard for component sharing
            try {
                // Create a simplified, serializable version of the component
                const serializableComponent = {
                    id: $selectedLeaf.id,
                    type: $selectedLeaf.props.json.type,
                    props: JSON.parse(JSON.stringify($selectedLeaf.props.json)), // Deep clone to remove circular references
                };
                
                // Ensure the component has a type property for proper reconstruction
                if (!serializableComponent.props.type) {
                    serializableComponent.props.type = serializableComponent.type;
                }
                
                // Write to system clipboard using stringified JSON
                navigator.clipboard.writeText(JSON.stringify(serializableComponent, null, 2))
                    .then(() => {
                        console.log('Component copied to clipboard successfully');
                    })
                    .catch(err => {
                        console.error('Failed to copy to clipboard:', err);
                    });
            } catch (error) {
                console.error('Failed to serialize component for clipboard:', error);
            }
        } else if (paste.isPressed(event) && $selectedLeaf && !$readOnly) {
            // Check if we have a component in memory first
            const targetLeaf = $selectedLeaf;
            if (!targetLeaf) return;
            
            if ($copiedLeaf) {
                state.pasteLeaf($copiedLeaf, targetLeaf);
            } 
            // If not, try to get from clipboard
            else {
                navigator.clipboard.readText()
                    .then(text => {
                        try {
                            console.log('Clipboard content:', text);
                            const parsedComponent = JSON.parse(text);
                            
                            // Detect and validate component data format
                            let clipboardLeaf: TreeLeaf;
                            
                            // Case 1: Full leaf structure (from copying JSON)
                            if (parsedComponent.props && parsedComponent.props.json) {
                                clipboardLeaf = {
                                    id: parsedComponent.id || state.genId(),
                                    childs: [],
                                    props: parsedComponent.props,
                                    parent: undefined
                                };
                            } 
                            // Case 2: Simple component with props object
                            else if (parsedComponent.props || parsedComponent.type) {
                                clipboardLeaf = {
                                    id: parsedComponent.id || state.genId(),
                                    childs: [],
                                    props: {
                                        json: parsedComponent.props || {}
                                    },
                                    parent: undefined
                                };
                                
                                // Ensure we have a type property
                                if (!clipboardLeaf.props.json.type && parsedComponent.type) {
                                    clipboardLeaf.props.json.type = parsedComponent.type;
                                }
                                
                                // If the component itself is the props
                                if (!parsedComponent.props && parsedComponent.type) {
                                    clipboardLeaf.props.json = parsedComponent;
                                }
                            }
                            // Case 3: Direct JSON object with type 
                            else if (typeof parsedComponent === 'object') {
                                clipboardLeaf = {
                                    id: state.genId(),
                                    childs: [],
                                    props: {
                                        json: parsedComponent
                                    },
                                    parent: undefined
                                };
                            }
                            else {
                                console.error('Invalid component data in clipboard:', parsedComponent);
                                return;
                            }
                            
                            // Validate that we have a type
                            if (!clipboardLeaf.props.json.type) {
                                console.error('Cannot paste: Component missing type property', clipboardLeaf);
                                return;
                            }
                            
                            console.log('Pasting component from clipboard:', clipboardLeaf);
                            
                            // Set in memory first so it's available for future pastes
                            copiedLeaf.set(clipboardLeaf);
                            
                            // Paste the component
                            state.pasteLeaf(clipboardLeaf, targetLeaf);
                        } catch (error) {
                            console.error('Failed to parse clipboard content:', error, text);
                        }
                    })
                    .catch(err => {
                        console.error('Failed to read from clipboard:', err);
                    });
            }
        } else {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
    }

    function onClick(event: MouseEvent): void {
        if (event.target === rootNode) {
            $selectedLeaf = null;
        }
    }

    function onMouseLeave(): void {
        dispatch('hover', null);
    }

    function onDragOver(event: DragEvent): void {
        const pageY = event.pageY - window.scrollY;

        const childs = Array.from(rootNode.querySelectorAll<HTMLElement>('.tree-leaf_container-child'))
            .map(node => {
                const bbox = node.getBoundingClientRect();

                return {
                    node,
                    bbox,
                    level: Number(node.dataset.level)
                };
            });

        const containers = Array.from(rootNode.querySelectorAll<HTMLElement>('.tree-leaf_can-have-childs'))
            .map(node => {
                const bbox = node.getBoundingClientRect();

                return {
                    node,
                    bbox,
                    level: Number(node.dataset.level)
                };
            });

        let best: {
            type: 'before' | 'after' | 'inside';
            dist: number;
            node: HTMLElement;
        } | undefined;
        childs.forEach(({ node, bbox }) => {
            const leaf = childMap.get(node)?.();
            if (!leaf || !leaf.parent) {
                return;
            }

            const topBefore = bbox.top;
            const bottomBefore = bbox.top + bbox.height / 2;
            const distBefore = pageY >= topBefore && pageY <= bottomBefore ?
                0 :
                Math.min(
                    Math.abs(pageY - topBefore),
                    Math.abs(pageY - bottomBefore)
                );

            if (!best || distBefore < best.dist) {
                best = {
                    type: 'before',
                    dist: distBefore,
                    node
                };
            }

            const topAfter = bbox.bottom - bbox.height / 2;
            const bottomAfter = bbox.bottom;
            const distAfter = pageY >= topAfter && pageY <= bottomAfter ?
                0 :
                Math.min(
                    Math.abs(pageY - topAfter),
                    Math.abs(pageY - bottomAfter)
                );

            if (!best || distAfter < best.dist) {
                best = {
                    type: 'after',
                    dist: distAfter,
                    node
                };
            }
        });

        containers.forEach(({ node, bbox }) => {
            const topInside = bbox.bottom - bbox.height * 2 / 3;
            const bottomInside = bbox.bottom - bbox.height / 3;

            if (pageY >= topInside && pageY <= bottomInside) {
                best = {
                    type: 'inside',
                    dist: 0,
                    node
                };
            }
        });

        dragTarget.set(best || null);
    }

    function onDragLeave(event: DragEvent): void {
        if (event.relatedTarget && event.relatedTarget instanceof Node && rootNode.contains(event.relatedTarget)) {
            return;
        }
        dragTarget.set(null);
    }

    function onDrop(event: DragEvent): void {
        const best = $dragTarget;

        if (!best) {
            return;
        }

        dragTarget.set(null);

        const leafTarget = childMap.get(best.node)?.();
        if (!leafTarget) {
            return;
        }
        if ((best.type === 'before' || best.type === 'after') && !leafTarget.parent) {
            return;
        }

        const newParent = best.type === 'inside' ? leafTarget : leafTarget.parent;

        const movedChildId = event.dataTransfer?.getData('application/divnode');
        if (!movedChildId) {
            return;
        }

        const movedChild = state.getChild(movedChildId);
        if (!movedChild) {
            return;
        }

        if (treeLeafContains(movedChild, newParent)) {
            return;
        }

        const deleteIndex = movedChild.parent ? movedChild.parent.childs.indexOf(movedChild) : -1;
        let insertIndex;
        if (best.type === 'inside') {
            insertIndex = 0;
        } else {
            insertIndex = leafTarget.parent.childs.indexOf(leafTarget) +
                (best.type === 'before' ? 0 : 1);
        }

        if (best.type !== 'inside' && movedChild.parent === leafTarget.parent && insertIndex > deleteIndex) {
            --insertIndex;
        }

        if (movedChild.parent) {
            state.pushCommand(new MoveLeafCommand(state, {
                newParentId: newParent.id,
                insertIndex,
                leafId: movedChild.id
            }));
        } else {
            state.pushCommand(new AddLeafCommand({
                parentId: newParent.id,
                insertIndex,
                leaf: movedChild
            }));
        }

        $selectedLeaf = findLeaf($tree, movedChild.id) || null;
    }

    function onChildSelect(event: CustomEvent<{
        node: HTMLElement;
    }>): void {
        const node = event.detail.node;
        const bbox = node.getBoundingClientRect();
        const scroller = rootNode.parentElement;
        if (!scroller) {
            return;
        }
        const rootBbox = scroller.getBoundingClientRect();

        if (bbox.top - ITEM_SCROLL_OFFSET < rootBbox.top) {
            scroller.scrollTop += bbox.top - ITEM_SCROLL_OFFSET - rootBbox.top;
        } else if (bbox.bottom + ITEM_SCROLL_OFFSET > rootBbox.bottom) {
            scroller.scrollTop += bbox.bottom + ITEM_SCROLL_OFFSET - rootBbox.bottom;
        }
    }

    function onChildHover(event: CustomEvent<{
        leaf: TreeLeaf;
    }>): void {
        dispatch('hover', event.detail.leaf);
    }

    function onChildAction(event: CustomEvent<{
        leaf: TreeLeaf;
        action: string;
    }>): void {
        if (event.detail.action === 'delete') {
            onChildDelete(event);
        } else if (event.detail.action === 'duplicate') {
            onChildDuplicate(event);
        } else if (event.detail.action === 'copy') {
            const leaf = event.detail.leaf;
            if (leaf) {
                copiedLeaf.set(leaf);
            }
        } else if (event.detail.action === 'paste') {
            // Check if we have a component in memory first
            const targetLeaf = event.detail.leaf;
            if (!targetLeaf) return;
            
            if ($copiedLeaf) {
                state.pasteLeaf($copiedLeaf, targetLeaf);
            } 
            // If not, try to get from clipboard
            else {
                navigator.clipboard.readText()
                    .then(text => {
                        try {
                            console.log('Clipboard content:', text);
                            const parsedComponent = JSON.parse(text);
                            
                            // Detect and validate component data format
                            let clipboardLeaf: TreeLeaf;
                            
                            // Case 1: Full leaf structure (from copying JSON)
                            if (parsedComponent.props && parsedComponent.props.json) {
                                clipboardLeaf = {
                                    id: parsedComponent.id || state.genId(),
                                    childs: [],
                                    props: parsedComponent.props,
                                    parent: undefined
                                };
                            } 
                            // Case 2: Simple component with props object
                            else if (parsedComponent.props || parsedComponent.type) {
                                clipboardLeaf = {
                                    id: parsedComponent.id || state.genId(),
                                    childs: [],
                                    props: {
                                        json: parsedComponent.props || {}
                                    },
                                    parent: undefined
                                };
                                
                                // Ensure we have a type property
                                if (!clipboardLeaf.props.json.type && parsedComponent.type) {
                                    clipboardLeaf.props.json.type = parsedComponent.type;
                                }
                                
                                // If the component itself is the props
                                if (!parsedComponent.props && parsedComponent.type) {
                                    clipboardLeaf.props.json = parsedComponent;
                                }
                            }
                            // Case 3: Direct JSON object with type 
                            else if (typeof parsedComponent === 'object') {
                                clipboardLeaf = {
                                    id: state.genId(),
                                    childs: [],
                                    props: {
                                        json: parsedComponent
                                    },
                                    parent: undefined
                                };
                            }
                            else {
                                console.error('Invalid component data in clipboard:', parsedComponent);
                                return;
                            }
                            
                            // Validate that we have a type
                            if (!clipboardLeaf.props.json.type) {
                                console.error('Cannot paste: Component missing type property', clipboardLeaf);
                                return;
                            }
                            
                            console.log('Pasting component from clipboard:', clipboardLeaf);
                            
                            // Set in memory first so it's available for future pastes
                            copiedLeaf.set(clipboardLeaf);
                            
                            // Paste the component
                            state.pasteLeaf(clipboardLeaf, targetLeaf);
                        } catch (error) {
                            console.error('Failed to parse clipboard content:', error, text);
                        }
                    })
                    .catch(err => {
                        console.error('Failed to read from clipboard:', err);
                    });
            }
        }
    }

    function onChildDelete(event: CustomEvent<{
        leaf: TreeLeaf;
    }>): void {
        const leaf = event.detail.leaf;
        console.log("Delete 389");
        deleteVariable(leaf.id);
        state.deleteLeaf(leaf);
    }

    function deleteVariable(id: string): void {
        const newList = $customVariables.slice();
        const variableName = `${id}_value`;
        console.log("newList", newList);
        const index =    newList.findIndex((ele)=>ele.name===variableName);
      console.log("index", index)
        newList.splice(index, 1);

        updateList(newList);
    }
    function updateList(list: Variable[]): void {
        state.pushCommand(new ChangeCustomVariablesCommand(state, list));
        $customVariables = list;
        $tree = $tree;
    }


    function onChildDuplicate(event: CustomEvent<{
        leaf: TreeLeaf;
    }>): void {
        const leaf = event.detail.leaf;
        if (leaf.parent) {
            state.pasteLeaf(leaf, leaf.parent, leaf.parent.childs.indexOf(leaf) + 1);
        }
    }

    function onChildAdd(event: CustomEvent<{
        leaf: TreeLeaf;
        type: string;
    }>): void {
        const leaf = event.detail.leaf;

        const newChild = state.genNewLeaf(event.detail.type, true);

        state.pushCommand(new AddLeafCommand({
            parentId: leaf.id,
            insertIndex: leaf.childs.length,
            leaf: newChild
        }));

        $selectedLeaf = findLeaf($tree, newChild.id) || null;

        rendererApi().focus();
    }

    $: if ($selectedLeaf?.id !== prevSelectedLeaf?.id) {
        prevSelectedLeaf = $selectedLeaf;
        dispatch('selectionchange', $selectedLeaf);
    }

    function bindChild(opts: {
        type: 'mount';
        node: HTMLElement;
        leaf: unknown;
    } | {
        type: 'destroy';
        node: HTMLElement;
    }): void {
        if (opts.type === 'mount') {
            childMap.set(opts.node, opts.leaf);
        } else {
            childMap.delete(opts.node);
        }
    }

    setContext<TreeContext>(TREE_CTX, {
        collapsedStore,
        selectedStore: selectedLeaf,
        highlightStore,
        dragTarget,
        bindChild,
        getText
    });
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="tree"
    tabindex="0"
    on:keydown={onKeydown}
    on:click={onClick}
    on:mouseleave={onMouseLeave}
    on:dragover|preventDefault={onDragOver}
    on:dragleave|preventDefault={onDragLeave}
    on:drop|preventDefault={onDrop}
    bind:this={rootNode}
>
    {#if showRoot}
        <TreeLeafView
            leaf={$tree}
            on:selected={onChildSelect}
            on:hovered={onChildHover}
            on:action={onChildAction}
            on:add={onChildAdd}
        />
    {:else}
        {#each $tree.childs as leaf (leaf.id)}
            <TreeLeafView
                {leaf} 
                on:selected={onChildSelect}
                on:hovered={onChildHover}
                on:action={onChildAction}
                on:add={onChildAdd}
            />
        {/each}
    {/if}
</div>

<style>
    .tree {
        position: relative;
        flex: 1 1 auto;
        min-width: max-content;
        padding-bottom: 24px;
        outline: none;
    }
</style>
