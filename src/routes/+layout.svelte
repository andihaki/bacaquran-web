<script lang="ts">
  import { onMount } from "svelte";

  let online = true;

  onMount(() => {
    online = navigator.onLine;
    const updateStatus = () => (online = navigator.onLine);
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    if ("serviceWorker" in navigator)
      navigator.serviceWorker.register("/sw.js");

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  });
</script>

{#if !online}
  <div class="offline-notice" role="status">
    You’re reading offline — saved Quran content is available.
  </div>
{/if}

<slot />

<style>
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
