<script lang="ts">
    import Lottie from 'lottie-web';
  
    // Define a Svelte action for Lottie animations
    export function lottieAction(node: HTMLElement, url: string) {
      Lottie.loadAnimation({
        container: node,
        renderer: 'svg', // or 'canvas' if needed
        loop: true,
        autoplay: true,
        path: url // Lottie JSON file URL
      });
      
      // Optionally, return a cleanup function if needed
      return {
        destroy() {
          // Cleanup if necessary
        }
      };
    }
  </script>