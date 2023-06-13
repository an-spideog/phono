<script lang="ts">
    import type { ICollector } from '$lib/types';
    export let data;
    console.log(data.jsons[0]);
    let collectors: ICollector[]//Collector[];
    $: collectors = data.jsons//.map((json: any) => new Collector(json));
    $: page = data.page;
    $: collectorsCount = data.hits;
    const MAX_PER_PAGE = 10;
</script>

<h1> Bailitheoirí </h1>
<form data-sveltekit-preload-data>
    ID: <input name="id" autocomplete="off"/>
    Téacs: <input name="text" autocomplete="off"/>
    <input type="submit" value="Submit"/> 
</form>

<span>Líon na mbailitheoirí: {collectorsCount}</span>

{#each collectors as collector}
    <div class="summary-box">
        <h2>{collector.ID.toString() + " " + collector.FirstName + " " + collector.LastName}</h2>
        <ul>
            <li>céad ainm : {collector.FirstName}</li>
            <li>sloinne : {collector.LastName}</li>
        </ul>
        <a href="/reels?collector={collector.ID}">spóil</a>
    </div>
{/each}

{#if page > 1}
<a href='?page={page-1}' >prev</a>
{/if}

{#if page < Math.ceil(collectorsCount / MAX_PER_PAGE) }
<a href='?page={page+1}'>next</a>
{/if}

<style>
.summary-box {
    border-bottom: 1px solid orangered;
}
</style>