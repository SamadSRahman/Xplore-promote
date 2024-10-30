<script lang="ts">
    import { onMount } from 'svelte';
    import { renderReactHeader, unmountReactHeader } from './ReactWrapperHelper';
  
    let container: HTMLDivElement;
  
    onMount(() => {
      renderReactHeader(container);
  
      return () => {
        unmountReactHeader(container);
      };
    });
  </script>
  
  <div bind:this={container}></div>
  