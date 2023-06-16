<script lang="ts">
    import type { IReel } from '$lib/types';
    export let data;
    let reels: IReel[];
    $: reels = data.jsons;
    $: page = data.page;
    $: reelCount = data.hits;
    const MAX_PER_PAGE = 10;
</script>

<h1> Spóileanna </h1>
<form data-sveltekit-preload-data>
    ID: <input name="id" autocomplete="off"/>
    Téacs: <input name="text" autocomplete="off"/>
    Bailitheoir <input name='collectorId' autocomplete='off'/>
    <input type="submit" value="Submit"/> 
</form>

<span>Líon na spóileanna: {reelCount}</span>

<!--TODO: Make a component out of these display boxes so I can handle optional fields more simply-->
{#each reels as reel}
    <div class="summary-box">
        <h2>#{reel.ID} {reel.Title}</h2>
        <ul>
            <li>teideal: {reel.Title}</li>
            <li>uimhir tagartha: {reel.RefID}</li>
            <li>dáta cruthaithe: {reel.Date}</li>
            <li>nóta: {reel.Note}</li>
            <li>bailitheoirí: {reel.CollectorIDs}</li>
        </ul>
        <a href="/tracks?reel={reel.ID}">traiceanna</a>
    </div>
{/each}

{#if page > 1}
<a href='?page={page-1}' >prev</a>
{/if}

{#if page < Math.ceil(reelCount / MAX_PER_PAGE) }
<a href='?page={page+1}'>next</a>
{/if}

<style>
.summary-box {
    border-bottom: 1px solid orangered;
}
</style>