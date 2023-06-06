<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { Collector } from '$lib/types';
    export let data;
    console.log(`Client side data: ${data.collectorsJson}`);
    let collectors: Collector[];
    $: collectors = data.collectorsJson.map(json => new Collector(json));
    $: page = data.page;
    $: collectorsCount = data.collectorsCount;
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
        <h2>{collector.id.toString() + " " + collector.firstName + " " + collector.lastName}</h2>
        <ul>
            <li>céad ainm : {collector.firstName}</li>
            <li>sloinne : {collector.lastName}</li>
        </ul>
    </div>
    <a href="/reels">reels</a>
{/each}

{#if page > 1}
<a href='?page={page-1}' >prev</a>
{/if}

{#if page < Math.ceil(collectorsCount / MAX_PER_PAGE) }
<a href='?page={page+1}'>next</a>
{/if}