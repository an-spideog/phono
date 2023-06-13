<script lang="ts">
    import type { ISpeaker } from '$lib/types';
    export let data;
    console.log(`Client side data: ${data.jsons}`);
    let speakers: ISpeaker[];
    $: speakers = data.jsons;
    $: page = data.page;
    $: speakerCount = data.hits;
    const MAX_PER_PAGE = 10;
</script>

<h1> Cainteoirí </h1>
<form data-sveltekit-preload-data>
    ID: <input name="id" autocomplete="off"/>
    Téacs: <input name="text" autocomplete="off"/>
    <input type="submit" value="Submit"/> 
</form>

<span>Líon na gcainteoirí: {speakerCount}</span>

<!--TODO: Make a component out of these display boxes so I can handle optional fields more simply-->
{#each speakers as speaker}
    <div class="summary-box">
        <h2>{speaker.ID.toString() + " " + speaker.FullName + ' (inscne: ' + (speaker.Gender ==='fem' ? 'bean' : 'fear') + ')' }</h2>
        <ul>
            {#if speaker.FirstName}
                <li>céad ainm : {speaker.FirstName}</li>
            {/if}
            {#if speaker.LastName}
                <li>sloinne : {speaker.LastName}</li>
            {/if}
            {#if speaker.Age}
                <li>aois : {speaker.Age}</li>
            {/if}
            {#if speaker.BirthDate}
                <li>dáta breithe : {speaker.BirthDate}</li>
            {/if}
            {#if speaker.Occupation}
                <li>slí bheatha : {speaker.Occupation}</li>
            {/if}
            {#if speaker.LanguageAbility}
                <li>cumas teanga : {speaker.LanguageAbility}</li>
            {/if}
            {#if speaker.Remark}
                <li>nóta : {speaker.Remark}</li>
            {/if}
        </ul>
        <a href="/tracks?speakerId={speaker.ID}">traiceanna</a>
    </div>
{/each}

{#if page > 1}
<a href='?page={page-1}' >prev</a>
{/if}

{#if page < Math.ceil(speakerCount / MAX_PER_PAGE) }
<a href='?page={page+1}'>next</a>
{/if}

<style>
.summary-box {
    border-bottom: 1px solid orangered;
}
</style>