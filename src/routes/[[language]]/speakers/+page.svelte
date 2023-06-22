<script lang="ts">
    import type { ISpeaker } from '$lib/types';
    import { _ } from 'svelte-i18n';
    import SearchBox from '../SearchBox.svelte'
    import Pager from '../Pager.svelte'
    export let data;
    console.log(`Client side data: ${data.jsons}`);
    let speakers: ISpeaker[];
    $: speakers = data.jsons;
    $: page = data.page;
    $: speakerCount = data.hits;
</script>

<h1> {$_('speakers')} </h1>
<SearchBox/>

<span>{$_('numberOfSpeakers')}: {speakerCount}</span>

<!--TODO: Make a component out of these display boxes so I can handle optional fields more simply-->
{#each speakers as speaker}
    <div class="summary-box">
        <h2>{speaker.ID.toString() + " " + speaker.FullName + ` (${$_('gender')}: ` + (speaker.Gender ==='fem' ? $_('female') : $_('male')) + ')' }</h2>
        <ul>
            {#if speaker.FirstName}
                <li>{$_('firstSpeaker')}: {speaker.FirstName}</li>
            {/if}
            {#if speaker.LastName}
                <li>{$_('lastName')} : {speaker.LastName}</li>
            {/if}
            {#if speaker.Age}
                <li>{$_('age')} : {speaker.Age}</li>
            {/if}
            {#if speaker.BirthDate}
                <li>{$_('birthDate')}: {speaker.BirthDate}</li>
            {/if}
            {#if speaker.Occupation}
                <li>{$_('occupation')}: {speaker.Occupation}</li>
            {/if}
            {#if speaker.LanguageAbility}
                <li>{$_('languageAbility')}: {speaker.LanguageAbility}</li>
            {/if}
            {#if speaker.Remark}
                <li>{$_('remark')} : {speaker.Remark}</li>
            {/if}
        </ul>
        <a href="/tracks?speakerId={speaker.ID}">{$_('tracks')} ({speaker.TrackCount})</a>
    </div>
{/each}

<Pager page={page} count={speakerCount} />

<style>
.summary-box {
    border-bottom: 1px solid orangered;
}
</style>