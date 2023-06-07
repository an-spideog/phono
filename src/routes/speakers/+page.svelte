<script lang="ts">
    import { Speaker } from '$lib/types';
    export let data;
    console.log(`Client side data: ${data.speakersJson}`);
    let speakers: Speaker[];
    $: speakers = data.speakersJson.map(json => new Speaker(json));
    $: page = data.page;
    $: speakerCount = data.speakerCount;
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
        <h2>{speaker.id.toString() + " " + speaker.fullName + ' (inscne: ' + (speaker.gender==='fem' ? 'bean' : 'fear') + ')' }</h2>
        <ul>
            {#if speaker.firstName}
                <li>céad ainm : {speaker.firstName}</li>
            {/if}
            {#if speaker.lastName}
                <li>sloinne : {speaker.lastName}</li>
            {/if}
            {#if speaker.age}
                <li>aois : {speaker.age}</li>
            {/if}
            {#if speaker.birthDate}
                <li>dáta breithe : {speaker.birthDate}</li>
            {/if}
            {#if speaker.occupation}
                <li>slí bheatha : {speaker.occupation}</li>
            {/if}
            {#if speaker.languageAbility}
                <li>cumas teanga : {speaker.languageAbility}</li>
            {/if}
            {#if speaker.remark}
                <li>nóta : {speaker.remark}</li>
            {/if}
        </ul>
        <a href="/tracks?speakerId={speaker.id}">traiceanna</a>
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