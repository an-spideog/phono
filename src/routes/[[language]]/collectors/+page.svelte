<script lang="ts">
    import type { ICollector } from '$lib/types';
    import SearchBox from '../SearchBox.svelte';
    import { translations } from '$lib/translations';
    import { _ } from 'svelte-i18n';
    import { page } from '$app/stores';
  import Pager from '../Pager.svelte'
    export let data;
    console.log(data.jsons[0]);
    let language = data.language ?? 'ga';
    let collectors: ICollector[];
    $: collectors = data.jsons;
    $: pageNumber = data.page;
    $: collectorsCount = data.hits;
    const MAX_PER_PAGE = 10;
</script>

<h1> {$_('collectors')} </h1>
<SearchBox/>

<span>{$_('numberOfCollectors')}: {collectorsCount}</span>

{#each collectors as collector}
    <div class="summary-box">
        <h2>{collector.ID.toString() + " " + collector.FirstName + " " + collector.LastName}</h2>
        <ul>
            <li>{$_('firstName')}: {collector.FirstName}</li>
            <li>{$_('lastName')}: {collector.LastName}</li>
        </ul>
        <!-- so do I just have to pass around the current language property everywhere? that seems silly -->
        <a href="/{language}/reels?collectorId={collector.ID}">{$_('reels')} ({collector.ReelCount})</a>
    </div>
{/each}

<Pager page={pageNumber} count={collectorsCount}/>

<style>
.summary-box {
    border-bottom: 1px solid orangered;
}
</style>