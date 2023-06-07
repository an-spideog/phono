<script lang="ts">
    import { Reel } from '$lib/types';
    export let data;
    console.log(`Client side data: ${data.reelsJson}`);
    let reels: Reel[];
    $: reels = data.reelsJson.map(json => new Reel(json));
    $: page = data.page;
    $: reelCount = data.reelCount;
    const MAX_PER_PAGE = 10;
</script>

<h1> Cainteoirí </h1>
<form data-sveltekit-preload-data>
    ID: <input name="id" autocomplete="off"/>
    Téacs: <input name="text" autocomplete="off"/>
    <input type="submit" value="Submit"/> 
</form>

<span>Líon na spóileanna: {reelCount}</span>

<!--TODO: Make a component out of these display boxes so I can handle optional fields more simply-->
{#each reels as reel}
    <div class="summary-box">
        <h2>{reel.title}</h2>
        <ul>
            <li>teideal: {reel.title}</li>
            <li>uimhir tagartha: {reel.refId}</li>
            <li>dáta cruthaithe: {reel.date}</li>
            <li>bailitheoir: TODO</li>
            <li>nóta: {reel.note}</li>
        </ul>
        <a href="/tracks?reel={reel.id}">traiceanna</a>
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