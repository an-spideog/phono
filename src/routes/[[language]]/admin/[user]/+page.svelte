<script lang="ts">
    import HStack from "$lib/components/HStack.svelte"
    import VStack from "$lib/components/VStack.svelte"
    import Button from "$lib/components/Button.svelte"
    import TrackListItem from "$lib/components/TrackListItem.svelte"
    import TrackSelectionDialogue from "$lib/components/TrackSelectionDialogue.svelte"

    let isModalOpen = false;
    export let data; 

</script>
<div class=page>
    <div class=info>
        <VStack --justify-content='start'>
        <h1>{data.user.Email}</h1>
        <h2 class=role>{data.user.isAdmin ? 'Riarthóir' : 'Úsáideoir'}</h2>
        </VStack>
    </div>
    <HStack>
        <h2>Traiceanna</h2>
        <Button type=primary on:click={() => { isModalOpen=true; console.log('hi')}}>Ceann eile</Button>
    </HStack>
    <div class=track-list>
        {#if !data.userTracks.length}
        <HStack --justify-content=center>
            Níl aon traiceanna ag an úsáideoir seo.
        </HStack>
        {/if}
        <ul>
        {#each data.userTracks as track}
                <TrackListItem {track} user={data.user}/>
        {/each}
        </ul>
    </div>

    <h2> Traiceanna Caite </h2>
    <div class=expired-track-list>
        <ul>
            {#each data.expiredTracks as track}
                <TrackListItem {track} user={data.user} isExpired={true}/>
            {/each}
        </ul>

    </div>
</div>
<TrackSelectionDialogue user={data.user} tracks={data.staticTracks} bind:isOpen={isModalOpen}/>

<style>
    div {
    }

    .left {
        margin: auto;
    }

    .right {
        margin-left: auto;
    }

    .track-list {
        display: block;
    }

    h1 {
        margin: 5px;
    }

    h2 {
        font-size: 1.5rem;
        margin: 2px;
    }
    ul {
        margin: none;
        padding: 0;
    }

    .role {
        color: var(--on-surface-variant)
    }

    .info {
        margin-bottom: 100px;
        border-bottom: 1px solid var(--on-surface-variant);
    }
</style>