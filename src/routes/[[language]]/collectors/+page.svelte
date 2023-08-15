<script lang="ts">
    import type { Collector } from '$lib/types';
    import SearchBox from '../../../lib/components/SearchBox.svelte';
    import { _ } from 'svelte-i18n';
    import Pager from '../../../lib/components/Pager.svelte'
  import SummaryBox from '../../../lib/components/SummaryBox.svelte'
    export let data;
    let collectors: Collector[];
    $: collectors = data.jsons;
    $: pageNumber = data.page;
    $: collectorsCount = data.hits;
</script>

<h1> {$_('collectors')} </h1>
<SearchBox/>

<span>{$_('numberOfCollectors')}: {collectorsCount}</span>

<Pager page={pageNumber} count={collectorsCount}/>

{#each collectors as collector}
<SummaryBox>
        <h2 slot=title>{collector.ID.toString() + " " + collector.FirstName + " " + collector.LastName}</h2>
        <div slot=body>
            <ul>
                <li>{$_('firstName')}: {collector.FirstName}</li>
                <li>{$_('lastName')}: {collector.LastName}</li>
            </ul>
            <a class='text-blue-800' href="reels?collectorId={collector.ID}">{$_('reels')} ({collector.ReelCount})</a>
        </div>
</SummaryBox>
{/each}

<Pager page={pageNumber} count={collectorsCount}/>

<style>
.summary-box {
    border-bottom: 1px solid orangered;
}
</style>