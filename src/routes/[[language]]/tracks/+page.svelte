<script lang="ts">
    import type { Track } from '$lib/types';
    import { _ } from 'svelte-i18n';
    import Pager from '../../../lib/components/Pager.svelte'
    import SearchBox from '../../../lib/components/SearchBox.svelte'
    import SummaryBox from '../../../lib/components/SummaryBox.svelte'
    export let data;
    let tracks: Track[];
    $: tracks = data.jsons;
    $: page = data.page;
    $: trackCount = data.hits;
    $: email = data.email;

    console.log('ALlowed tracks')
    console.log(data.allowedTrackIds)

    // This function finds the string of numbers before the letter
    // given in a track's nickname
    // This was used in the original project to organise the sound files seemingly
    // This should be removed in the new version
    function findInitialID(nickname: string) {
        let id = '';
        for (let c of nickname.split('')) {
            if (c < '0' || c > '9') {
                return id;
            } else {
                id += c;
            }
        }
    }
</script>

<h1> {$_('tracks')} </h1>
<SearchBox additionalInputs={[
    {text: $_('place'), name: 'placeId'},
    {text: $_('nickname'), name: 'nickname'},
    {text: $_('reel'), name: 'reelId', options: data.staticReels},
    {text: $_('speaker'), name: 'speakerId', options: data.staticSpeakers},
    {text: $_('collector'), name: 'collectorId', options: data.staticCollectors},

]}/>

<span>{$_('numberOfTracks')}: {trackCount}</span>

<Pager page={page} count={trackCount} />

<!--TODO: Make a component out of these display boxes so I can handle optional fields more simply-->
{#each tracks as track}
    <SummaryBox>
        <h2 slot=title>#{track.ID} {track.CatalogueEntry}</h2>
        <div slot=body>
        <ul>
            {#if track.Nickname}
            <li> {$_('nickname')} : {track.Nickname}</li>
            {/if}
            {#if track.RecordingDate}
            <li> {$_('recordingDate')} : {track.RecordingDate}</li>
            {/if}
            {#if track.CollectorIDs}
            <li>{$_('collector')}: 
                <ul class='list-inside list-disc'>
                    {#each track.CollectorIDs?.split(',') ?? [] as collectorId, i}
                        <li>
                            <a href='collectors?id={collectorId}'>{collectorId + ' ' + track.CollectorNames?.split(',')[i]}</a>
                        </li>
                    {/each}
                </ul>
            </li>
            {/if}
            {#if track.PlaceIDs}
            <li>{$_('places')}:
                <ul class='list-inside list-disc'>
                {#each track.PlaceIDs?.split(',') ?? [] as placeId, i}
                    <li>
                        <a href='//logainm.ie/{placeId}.aspx'>{placeId} {track.PlaceNames?.split(',')[i]}</a>
                    </li>
                {/each}
                </ul>
            </li>
            {/if}
            <li>{$_('reel')}: <a href='reels?id={track.ReelID}'>{track.ReelID} {track.ReelTitle} </a></li>
        </ul>
        {#if  data.isAdmin || data.allowedTrackIds.includes(track.ID)}
            <audio controls src="https://www.logainm.ie/phono/PHONO/{findInitialID(track.Nickname)}mp3s/{track.Nickname}.mp3"></audio>
        {:else}
            {$_('soundFileAvailableTo')}
        {/if}
        </div>
    </SummaryBox>
{/each}

<Pager page={page} count={trackCount} />