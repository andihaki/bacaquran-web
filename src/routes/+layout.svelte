<script lang="ts">
  import { onMount } from "svelte";

  let online = true;

  onMount(() => {
    online = navigator.onLine;
    const updateStatus = () => (online = navigator.onLine);
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  });

  export const prerender = true;
</script>

{#if !online}
  <div class="offline-notice" role="status">
    You’re reading offline — saved Quran content is available.
  </div>
{/if}

<slot />

<style>
  @font-face {
    font-family: "Uthmanic Hafs";
    src: url("/UthmanicHafs1Ver18.woff2") format("woff2");
    font-display: block;
  }

  :global(*) {
    box-sizing: border-box;
  }
  :global(body) {
    margin: 0;
    background: #f8f6ef;
    color: #19312c;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  }
  .offline-notice {
    background: #153f36;
    color: #fff;
    font-size: 0.85rem;
    padding: 0.6rem 1rem;
    text-align: center;
  }
</style>
