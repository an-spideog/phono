<script lang="ts">
    import { Track } from '$lib/types';
    export let data;
    console.log(`Client side data: ${data.tracksJson}`);
    let tracks: Track[];
    $: tracks = data.tracksJson.map(json => new Track(json));
    $: page = data.page;
    $: trackCount = data.trackCount;
    const MAX_PER_PAGE = 10;
</script>

<h1> Traiceanna </h1>
<form data-sveltekit-preload-data>
    ID: <input name="id" autocomplete="off"/>
    Téacs: <input name="text" autocomplete="off"/>
    <input type="submit" value="Submit"/> 
</form>

<span>Líon na dtraiceanna: {trackCount}</span>

<!--TODO: Make a component out of these display boxes so I can handle optional fields more simply-->
{#each tracks as track}
    <div class="summary-box">
        <h2>{track.catalogueEntry}</h2>
        <ul>
            <li>id : {track.id} </li>
            <li> leasainm : {track.nickname}</li>
            <li>áiteanna : {track.places}</li>
            <li>cainteoirí : {track.speakers}</li>
            <li> dáta taifeadta : {track.recordingDate}</li>
            <li>reels : {track.reels}</li>
        </ul>
        comhad fuaime ar fáil d'úsáideoirí cláraithe
    </div>
{/each}

{#if page > 1}
<a href='?page={page-1}' >prev</a>
{/if}

{#if page < Math.ceil(trackCount / MAX_PER_PAGE) }
<a href='?page={page+1}'>next</a>
{/if}

<style>
.summary-box {
    border-bottom: 1px solid orangered;
}
</style>