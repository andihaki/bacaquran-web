<script lang="ts">
  import { surahs } from "$lib/quran";

  let query = "";
  $: visibleSurahs = surahs.filter((surah) =>
    `${surah.number} ${surah.transliteration} ${surah.name}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
</script>

<svelte:head><title>Baca Quran</title></svelte:head>

<main>
  <header>
    <p class="eyebrow">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
    <h1>Baca Quran</h1>
    <p class="intro">
      A calm, offline-first place to read, reflect, and continue where you left
      off.
    </p>
  </header>

  <section class="continue" aria-label="Continue reading">
    <div>
      <span>Continue reading</span><strong>Al-Baqarah</strong><small
        >Ayah 255 of 286</small
      >
    </div>
    <a href="/surah/2">Resume <span aria-hidden="true">→</span></a>
  </section>

  <label class="search">
    <span class="sr-only">Search surahs</span>
    <input bind:value={query} placeholder="Search a surah" />
  </label>

  <section aria-labelledby="surah-list-heading">
    <div class="section-heading">
      <h2 id="surah-list-heading">Surahs</h2>
      <span>{surahs.length} saved</span>
    </div>
    <div class="surah-list">
      {#each visibleSurahs as surah}
        <a class="surah" href={`/surah/${surah.number}`}>
          <span class="number">{surah.number}</span>
          <span class="names"
            ><strong>{surah.transliteration}</strong><small
              >{surah.revelation} · {surah.verses} ayahs</small
            ></span
          >
          <span class="arabic">{surah.name}</span>
        </a>
      {:else}
        <p class="empty">No saved surah matches “{query}”.</p>
      {/each}
    </div>
  </section>
</main>

<style>
  main {
    margin: 0 auto;
    max-width: 720px;
    padding: 3.5rem 1.25rem 4rem;
  }
  header {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  .eyebrow {
    color: #0b7561;
    font-size: 1.1rem;
    margin: 0 0 0.7rem;
  }
  h1 {
    font-family: Georgia, serif;
    font-size: clamp(2.25rem, 7vw, 3.5rem);
    margin: 0;
  }
  .intro {
    color: #64716d;
    line-height: 1.6;
    margin: 0.7rem auto 0;
    max-width: 31rem;
  }
  .continue {
    align-items: center;
    background: #0b4f43;
    border-radius: 1rem;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 1.2rem 1.3rem;
  }
  .continue div {
    display: grid;
    gap: 0.2rem;
  }
  .continue span,
  .continue small {
    color: #bde4d8;
    font-size: 0.8rem;
  }
  .continue strong {
    font-size: 1.1rem;
  }
  .continue a {
    color: white;
    font-weight: 700;
    text-decoration: none;
  }
  .search {
    display: block;
    margin: 1.75rem 0;
  }
  .search input {
    background: white;
    border: 1px solid #d9dfda;
    border-radius: 0.75rem;
    font: inherit;
    padding: 0.95rem 1rem;
    width: 100%;
  }
  .search input:focus {
    border-color: #0b7561;
    outline: 3px solid #c8eee3;
  }
  .section-heading {
    align-items: baseline;
    display: flex;
    justify-content: space-between;
  }
  .section-heading h2 {
    font-family: Georgia, serif;
    margin: 0 0 1rem;
  }
  .section-heading span {
    color: #71807a;
    font-size: 0.85rem;
  }
  .surah-list {
    background: white;
    border: 1px solid #e3e6e1;
    border-radius: 1rem;
    overflow: hidden;
  }
  .surah {
    align-items: center;
    color: inherit;
    display: flex;
    gap: 0.9rem;
    padding: 1rem;
    text-decoration: none;
  }
  .surah + .surah {
    border-top: 1px solid #edf0ec;
  }
  .surah:hover {
    background: #f4faf7;
  }
  .number {
    align-items: center;
    background: #e5f4ed;
    border-radius: 50%;
    color: #0b7561;
    display: flex;
    font-size: 0.8rem;
    font-weight: 700;
    height: 2rem;
    justify-content: center;
    width: 2rem;
  }
  .names {
    display: grid;
    gap: 0.2rem;
  }
  .names small {
    color: #71807a;
    font-size: 0.78rem;
  }
  .arabic {
    font-family: serif;
    font-size: 1.25rem;
    margin-left: auto;
  }
  .empty {
    color: #64716d;
    padding: 1rem;
  }
  .sr-only {
    height: 1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
  }
</style>
