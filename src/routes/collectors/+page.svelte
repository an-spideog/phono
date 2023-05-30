<script lang="ts">
    import { Collector } from '$lib/types';
    export let data;
    let collectors: Collector[] = data.collectorsJson.map(json => new Collector(json));
</script>

<h1> Bailitheoirí </h1>
<!--Search Bar Here -->
<form class="search">
    <div class="formline">
        <label for="srchText"><span class="cga">Téacs</span></label>
        <input class="textbox" id="srchText" name="Text" value="" />
    </div>
    <div class="formline">
        <label for="srchID">ID</label>
        <input class="textbox" id="srchID" name="ID" value="" />
    </div>
    <div class="submitline">
        <input class="submit" type="submit" value="»" />
    </div>
</form>

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
