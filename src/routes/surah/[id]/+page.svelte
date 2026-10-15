<script lang="ts">
  import type { Surah } from "$lib/quran";
  let { data }: { data: { surah: Surah } } = $props();
</script>

<svelte:head
  ><title>{data.surah.transliteration} · Baca Quran</title></svelte:head
>

<main>
  <a class="back" href="/">← All surahs</a>
  <header>
    <p>{data.surah.number}</p>
    <h1>{data.surah.name}</h1>
    <h2>{data.surah.transliteration}</h2>
    <span>{data.surah.revelation} · {data.surah.verses} ayahs</span>
  </header>
  <article>
    <p class="basmalah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
    <p class="arabic">Your downloaded verse content will appear here.</p>
    <p class="translation">
      Connect this route to your bundled Quran JSON data or a versioned local
      database. Keep the reading data in the app cache so it remains available
      offline.
    </p>
  </article>
</main>

<style>
  main {
    margin: 0 auto;
    max-width: 720px;
    padding: 2rem 1.25rem 4rem;
  }
  .back {
    color: #0b7561;
    font-weight: 700;
    text-decoration: none;
  }
  header {
    border-bottom: 1px solid #dfe5df;
    margin: 2.5rem 0;
    padding-bottom: 2rem;
    text-align: center;
  }
  header p {
    color: #0b7561;
    font-weight: 700;
    margin: 0;
  }
  h1 {
    font-family: serif;
    font-size: 3rem;
    margin: 0.5rem 0;
  }
  h2 {
    font-family: Georgia, serif;
    margin: 0 0 0.5rem;
  }
  header span {
    color: #68766f;
  }
  article {
    text-align: center;
  }
  .basmalah {
    color: #0b7561;
    font-family: serif;
    font-size: 1.45rem;
  }
  .arabic {
    direction: rtl;
    font-family: serif;
    font-size: 1.7rem;
    line-height: 2;
    margin: 3rem auto 1rem;
  }
  .translation {
    color: #5d6b65;
    line-height: 1.7;
    margin: auto;
    max-width: 35rem;
  }
</style>
