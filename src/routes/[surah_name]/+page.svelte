<script lang="ts">
  import { surahs, type MushafPage, type Surah } from "$lib/quran";
  let { data }: { data: { surah: Surah; pages: MushafPage[] } } = $props();
</script>

<svelte:head><title>{data.surah.nameSimple} · Baca Quran</title></svelte:head>

<main>
  <a class="back" href="/">← All surahs</a>
  <header>
    <p>{data.surah.id}</p>
    <h1 lang="ar" dir="rtl">{data.surah.nameArabic}</h1>
    <h2>{data.surah.nameSimple}</h2>
    <span>{data.surah.revelationPlace} · {data.surah.versesCount} ayahs</span>
  </header>
  <section
    class="reader"
    aria-label={`Mushaf text for ${data.surah.nameSimple}`}
  >
    {#each data.pages as page}
      <article
        class="mushaf-page"
        aria-label={`Mushaf page ${page.pageNumber}`}
      >
        <div class="page-number">Page {page.pageNumber}</div>
        {#each page.lines as line}
          {#if line.lineType === "header"}
            <p class="surah-header" lang="ar" dir="rtl">
              سُورَةُ {surahs.find((surah) => surah.id === line.surahNumber)
                ?.nameArabic}
            </p>
          {:else if line.lineType === "bismillah"}
            <p class="bismillah" lang="ar" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
          {:else}
            <p
              class:centred={line.isCentered}
              class="mushaf-line"
              lang="ar"
              dir="rtl"
            >
              {#each line.words as word, index}
                <span class:end={word.charType === "end"}>{word.text}</span
                >{#if index < line.words.length - 1}&nbsp;{/if}
              {/each}
            </p>
          {/if}
        {/each}
      </article>
    {/each}
  </section>
</main>

<style>
  main { margin: 0 auto; max-width: 900px; padding: 2rem 1rem 4rem; }
  .back { color: #0b7561; font-weight: 700; text-decoration: none; }
  header { border-bottom: 1px solid #dfe5df; margin: 2rem 0; padding-bottom: 1.5rem; text-align: center; }
  header p {
    color: #0b7561;
    font-weight: 700;
    margin: 0;
  }
  h1 { font-family: "Uthmanic Hafs", serif; font-size: 3rem; font-weight: 400; line-height: 1.2; margin: 0.4rem 0; }
  h2 { font-family: Georgia, serif; margin: 0 0 0.5rem; }
  header span { color: #68766f; text-transform: capitalize; }
  .reader { display: grid; gap: 1.5rem; }
  .mushaf-page {
    background: #fffdf7;
    border: 1px solid #e5dfd1;
    border-radius: 0.5rem;
    box-shadow: 0 3px 15px #19312c12;
    min-height: 43rem;
    padding: 2rem 2.5rem 2.25rem;
  }
  .page-number {
    color: #71807a;
    font-size: 0.78rem;
    margin-bottom: 1.2rem;
    text-align: center;
  }
  .mushaf-line,
  .bismillah,
  .surah-header {
    font-family: "Uthmanic Hafs", serif;
    font-size: clamp(1.62rem, 4vw, 2.35rem);
    font-weight: 400;
    line-height: 1.83;
    margin: 0;
    text-align: justify;
    text-align-last: justify;
  }
  .mushaf-line::after {
    content: "";
    display: inline-block;
    width: 100%;
  }
  .mushaf-line.centred,
  .bismillah,
  .surah-header {
    text-align: center;
    text-align-last: center;
  }
  .surah-header {
    color: #0b7561;
    font-size: 1.4rem;
    line-height: 1.65;
  }
  .bismillah {
    color: #19312c;
    font-size: 1.8rem;
    line-height: 1.8;
  }
  .end {
    color: #0b7561;
    font-size: 0.8em;
    white-space: nowrap;
  }
  @media (max-width: 600px) { .mushaf-page { min-height: 0; padding: 1.25rem 1rem 1.5rem; } .mushaf-line, .bismillah, .surah-header { line-height: 1.95; } }
</style>
