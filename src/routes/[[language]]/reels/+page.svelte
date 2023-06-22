<script lang="ts">
    import type { IReel, Speaker } from '$lib/types';
  import Pager from '../Pager.svelte'
    import SearchBox from '../SearchBox.svelte'
    import { _ } from 'svelte-i18n';
    export let data;
    let reels: IReel[];
    $: reels = data.jsons;
    $: page = data.page;
    $: reelCount = data.hits;
    const MAX_PER_PAGE = 10;
</script>

<h1> {$_('reels')} </h1>
<SearchBox additionalInputs={[
    {text: $_('collector'), name: 'collectorId'}
]}/>

<span>{$_('numberOfReels')}: {reelCount}</span>

<!--TODO: Make a component out of these display boxes so I can handle optional fields more simply-->
{#each reels as reel}
    <div class="summary-box">
        <h2>#{reel.ID} {reel.Title}</h2>
        <ul>
            <li>{$_('title')}: {reel.Title}</li>
            <li>{$_('referenceNumber')}: {reel.RefID}</li>
            <li>{$_('dateCreated')}: {reel.Date}</li> 
            {#if (reel.Note)}
                <li>{$_('note')}: {reel.Note}</li>
            {/if}
            <li>{$_('collectors')}: 
                <ul>
            {#each reel.CollectorIDs?.split(',') ?? [] as collectorId, i}
                <li>
                    <a href='/collectors?id={collectorId}'>{collectorId + ' ' + reel.CollectorNames?.split(',')[i]}</a>
                </li>
            {/each}
                </ul>
            </li>
        </ul>
        <a href="/tracks?reelId={reel.ID}">{$_('tracks')}</a>
    </div>
{/each}

<Pager page={page} count={reelCount}/>

<style>
.summary-box {
    border-bottom: 1px solid orangered;
}
</style>