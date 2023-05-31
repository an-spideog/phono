<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { Collector } from '$lib/types';
    export let data;
    console.log(`Client side data: ${data.collectorsJson}`);
    let collectors: Collector[];
    $: collectors = data.collectorsJson.map(json => new Collector(json));
    $: page = data.page;
</script>

<h1> Bailitheoirí </h1>
<!--Search Bar Here -->
<form>
    ID: <input name="id" autocomplete="off"/>
    Téacs: <input name="text" autocomplete="off"/>
    <input type="submit" value="Submit"/> 
</form>

<span>Líon na mbailitheoirí: {collectors.length}</span>

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

<a href='?page={page-1}'>prev</a>
<a href='?page={page+1}'>next</a>
