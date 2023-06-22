<script lang="ts">
    import type { ITrack } from '$lib/types';
    import { _ } from 'svelte-i18n';
    import Pager from '../Pager.svelte'
    import SearchBox from '../SearchBox.svelte'
    export let data;
    let tracks: ITrack[];
    $: tracks = data.jsons;
    $: page = data.page;
    $: trackCount = data.hits;
</script>

<h1> {$_('tracks')} </h1>
<SearchBox additionalInputs={[
    {text: $_('speaker'), name: 'speakerId'},
    {text: $_('place'), name: 'placeId'},
    {text: $_('nickname'), name: 'nickname'},
    {text: $_('reel'), name: 'reelId'}
]}/>

<span>{$_('numberOfTracks')}: {trackCount}</span>

<!--TODO: Make a component out of these display boxes so I can handle optional fields more simply-->
{#each tracks as track}
    <div class="summary-box">
        <h2>{track.CatalogueEntry}</h2>
        <ul>
            <li>{$_('id')} : {track.ID} </li>
            <li> {$_('nickname')} : {track.Nickname}</li>
            <li> {$_('recordingDate')} : {track.RecordingDate}</li>
            <li>{$_('collector')}: 
                <ul>
            {#each track.CollectorIDs?.split(',') ?? [] as collectorId, i}
                <li>
                    <a href='/collectors?id={collectorId}'>{collectorId + ' ' + track.CollectorNames?.split(',')[i]}</a>
                </li>
            {/each}
                </ul>
            </li>
            <li>{$_('places')}: {track.PlaceIDs}</li>
            <li>{$_('reels')}: <a href='/reels?id={track.ReelID}'>{track.ReelID} {track.ReelTitle} </a></li>
        </ul>
        {$_('soundFileAvailable')}
    </div>
{/each}

<Pager page={page} count={trackCount} />

<style>
.summary-box {
    border-bottom: 1px solid orangered;
}
</style>