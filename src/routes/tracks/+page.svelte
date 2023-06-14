<script lang="ts">
    import type { ITrack } from '$lib/types';
    export let data;
    let tracks: ITrack[];
    $: tracks = data.jsons;
    $: page = data.page;
    $: trackCount = data.hits;
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
        <h2>{track.CatalogueEntry}</h2>
        <ul>
            <li>id : {track.ID} </li>
            <li> leasainm : {track.Nickname}</li>
            <li> dáta taifeadta : {track.RecordingDate}</li>
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