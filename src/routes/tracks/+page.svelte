<script lang="ts">
    import type { ITrack } from '$lib/types';
    export let data;
    let tracks: ITrack[];
    let maxNumberOfPages: number;
    $: maxNumberOfPages = data.maxNumberOfPages;
    $: tracks = data.jsons;
    $: page = data.page;
    $: trackCount = data.hits;
</script>

<h1> Traiceanna </h1>
<form data-sveltekit-preload-data>
    ID: <input name="id" autocomplete="off"/>
    Téacs: <input name="text" autocomplete="off"/>
    Cainteoir: <input name='speakerId' autocomplete='off'/>
    Áit: <input name='placeId' autocomplete='off'/>
    Leasainm: <input name='nickname' autocomplete='off'/>
    Spóil: <input name='reelId' autocomplete='off'/>
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
            <li>bailitheoirí: 
                <ul>
            {#each track.CollectorIDs?.split(',') ?? [] as collectorId, i}
                <li>
                    <a href='/collectors?id={collectorId}'>{collectorId + ' ' + track.CollectorNames?.split(',')[i]}</a>
                </li>
            {/each}
                </ul>
            </li>
            <li>áiteanna: {track.PlaceIDs}</li>
            <li>spóil: <a href='/reels?id={track.ReelID}'>{track.ReelID} {track.ReelTitle} </a></li>
        </ul>
        comhad fuaime ar fáil d'úsáideoirí cláraithe
    </div>
{/each}

{#if page > 1}
<a href='?page={page-1}' >prev</a>
{/if}

{#if page < maxNumberOfPages }
<a href='?page={page+1}'>next</a>
{/if}

<style>
.summary-box {
    border-bottom: 1px solid orangered;
}
</style>